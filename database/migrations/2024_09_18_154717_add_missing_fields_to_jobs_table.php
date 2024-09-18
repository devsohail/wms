<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingFieldsToJobsTable extends Migration
{
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            if (!Schema::hasColumn('jobs', 'commodity')) {
                $table->string('commodity')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'cntr_seal_no')) {
                $table->string('cntr_seal_no')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'weight_slip_no')) {
                $table->string('weight_slip_no')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'storage_in')) {
                $table->dateTime('storage_in')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'storage_out')) {
                $table->dateTime('storage_out')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'supervisor_sign')) {
                $table->string('supervisor_sign')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'g4g_team')) {
                $table->string('g4g_team')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'vehicle_in')) {
                $table->dateTime('vehicle_in')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'vehicle_out')) {
                $table->dateTime('vehicle_out')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'bags_cartons')) {
                $table->integer('bags_cartons')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'pallets')) {
                $table->integer('pallets')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'labors_count')) {
                $table->integer('labors_count')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'labor_start_time')) {
                $table->time('labor_start_time')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'labor_end_time')) {
                $table->time('labor_end_time')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'lifter_start_time')) {
                $table->time('lifter_start_time')->nullable();
            }
            if (!Schema::hasColumn('jobs', 'lifter_end_time')) {
                $table->time('lifter_end_time')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $columns = [
                'commodity', 'cntr_seal_no', 'weight_slip_no',
                'storage_in', 'storage_out', 'supervisor_sign', 'g4g_team',
                'vehicle_in', 'vehicle_out', 'bags_cartons', 'pallets',
                'labors_count', 'labor_start_time', 'labor_end_time',
                'lifter_start_time', 'lifter_end_time'
            ];

            foreach ($columns as $column) {
                if (Schema::hasColumn('jobs', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
}