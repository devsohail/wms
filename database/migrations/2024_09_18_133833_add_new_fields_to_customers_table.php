<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddNewFieldsToCustomersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, add the new columns without constraints
        Schema::table('customers', function (Blueprint $table) {
            $table->string('code', 4)->nullable()->after('id');
            $table->unsignedBigInteger('sales_agent_id')->nullable()->after('code');            
            // Ship to party details
            $table->string('ship_to_name')->nullable();
            $table->string('ship_to_email')->nullable();
            $table->string('ship_to_phone')->nullable();
            $table->text('ship_to_address')->nullable();
            
            $table->softDeletes();
        });

        // Handle existing data
        $this->handleExistingData();

        // Now add constraints
        Schema::table('customers', function (Blueprint $table) {
            $table->string('code', 4)->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropForeign(['sales_agent_id']);
            $table->dropColumn([
                'code', 'sales_agent_id', 
                'ship_to_name', 'ship_to_email', 'ship_to_phone', 'ship_to_address'
            ]);
            $table->dropSoftDeletes();
        });
    }

    private function handleExistingData()
    {
        $customers = DB::table('customers')->get();
        $defaultStaffId = DB::table('staff')->value('id');

        foreach ($customers as $customer) {
            $code = $this->generateUniqueCode();
            DB::table('customers')
                ->where('id', $customer->id)
                ->update([
                    'code' => $code,
                    'sales_agent_id' => $defaultStaffId,
                    'ship_to_name' => $customer->name ?? 'Unknown',
                    'ship_to_email' => $customer->email ?? 'unknown@example.com',
                    'ship_to_phone' => $customer->phone ?? 'Unknown',
                    'ship_to_address' => $customer->address ?? 'Unknown',
                ]);
        }
    }

    private function generateUniqueCode()
    {
        $code = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        while (DB::table('customers')->where('code', $code)->exists()) {
            $code = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        }
        return $code;
    }
}
