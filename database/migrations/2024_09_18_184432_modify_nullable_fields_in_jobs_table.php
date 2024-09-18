<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyNullableFieldsInJobsTable extends Migration
{
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->time('vehicle_in')->nullable()->change();
            $table->time('vehicle_out')->nullable()->change();
            $table->string('job_nature')->nullable()->change();
            $table->decimal('storage_price', 10, 2)->nullable()->change();
            $table->decimal('storage_rate', 10, 2)->nullable()->change();
            $table->decimal('handling_in_price', 10, 2)->nullable()->change();
            $table->boolean('repacking')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->time('vehicle_in')->nullable(false)->change();
            $table->time('vehicle_out')->nullable(false)->change();
            $table->string('job_nature')->nullable(false)->change();
            $table->decimal('storage_price', 10, 2)->nullable(false)->change();
            $table->decimal('storage_rate', 10, 2)->nullable(false)->change();
            $table->decimal('handling_in_price', 10, 2)->nullable(false)->change();
            $table->boolean('repacking')->nullable(false)->change();
        });
    }
}