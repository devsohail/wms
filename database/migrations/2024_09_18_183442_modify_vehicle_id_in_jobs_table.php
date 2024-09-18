<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyVehicleIdInJobsTable extends Migration
{
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->unsignedBigInteger('vehicle_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->unsignedBigInteger('vehicle_id')->nullable(false)->change();
        });
    }
}