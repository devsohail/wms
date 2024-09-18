<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStorageAndUpdateVehicleFieldsToJobs extends Migration
{
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            // Add storage type field
            $table->enum('storage_type', ['in', 'out'])->nullable()->after('vehicle_id');
            
            // Update vehicle in/out to time fields
            if (Schema::hasColumn('jobs', 'vehicle_in')) {
                $table->time('vehicle_in')->change();
            } else {
                $table->time('vehicle_in')->nullable()->after('storage_type');
            }

            if (Schema::hasColumn('jobs', 'vehicle_out')) {
                $table->time('vehicle_out')->change();
            } else {
                $table->time('vehicle_out')->nullable()->after('vehicle_in');
            }
        });
    }

    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            // Remove storage type field
            $table->dropColumn('storage_type');

            // Revert vehicle in/out to dateTime if they existed before
            if (Schema::hasColumn('jobs', 'vehicle_in')) {
                $table->dateTime('vehicle_in')->change();
            }
            if (Schema::hasColumn('jobs', 'vehicle_out')) {
                $table->dateTime('vehicle_out')->change();
            }
        });
    }
}