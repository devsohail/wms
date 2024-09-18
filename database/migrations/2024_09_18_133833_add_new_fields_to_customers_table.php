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
        Schema::table('customers', function (Blueprint $table) {
            if (!Schema::hasColumn('customers', 'code')) {
                $table->string('code', 4)->nullable()->after('id');
            }
            if (!Schema::hasColumn('customers', 'sales_agent_id')) {
                $table->unsignedBigInteger('sales_agent_id')->nullable()->after('code');
            }
            if (!Schema::hasColumn('customers', 'ship_to_name')) {
                $table->string('ship_to_name')->nullable();
            }
            if (!Schema::hasColumn('customers', 'ship_to_email')) {
                $table->string('ship_to_email')->nullable();
            }
            if (!Schema::hasColumn('customers', 'ship_to_phone')) {
                $table->string('ship_to_phone')->nullable();
            }
            if (!Schema::hasColumn('customers', 'ship_to_address')) {
                $table->text('ship_to_address')->nullable();
            }
            
            if (!Schema::hasColumn('customers', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        // Handle existing data only if the 'code' column was just added
        if (Schema::hasColumn('customers', 'code') && DB::table('customers')->whereNull('code')->exists()) {
            $this->handleExistingData();
        }

        // Add unique constraint to 'code' if it doesn't already exist
        if (!$this->hasUniqueConstraint('customers', 'code')) {
            Schema::table('customers', function (Blueprint $table) {
                $table->unique('code');
            });
        }
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
        $customers = DB::table('customers')->whereNull('code')->get();
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

    private function hasUniqueConstraint($table, $column)
    {
        return collect(DB::select("SHOW INDEXES FROM {$table}"))
            ->where('Column_name', $column)
            ->where('Non_unique', 0)
            ->isNotEmpty();
    }
}