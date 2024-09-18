<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('staff', function (Blueprint $table) {
            $table->string('code', 4)->after('id')->nullable();
            $table->foreignId('bank_id')->nullable()->after('role_id')->constrained('banks');
            $table->string('iban', 23)->nullable()->after('bank_id');
            $table->string('account_number', 12)->nullable()->after('iban');
            $table->softDeletes();
        });

        // Generate codes for existing staff
        $staff = DB::table('staff')->get();
        $code = 1201;
        foreach ($staff as $member) {
            DB::table('staff')
                ->where('id', $member->id)
                ->update(['code' => str_pad($code, 4, '0', STR_PAD_LEFT)]);
            $code++;
        }

        // Now add the unique constraint
        Schema::table('staff', function (Blueprint $table) {
            $table->unique('code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff', function (Blueprint $table) {
            $table->dropForeign(['bank_id']);
            $table->dropColumn(['code', 'bank_id', 'iban', 'account_number']);
            $table->dropSoftDeletes();
        });
    }
};
