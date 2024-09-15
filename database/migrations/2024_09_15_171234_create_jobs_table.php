<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsTable extends Migration
{
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('job_number')->unique();
            $table->date('job_date');
            $table->string('job_nature');
            $table->string('client_name');
            $table->foreignId('vehicle_id')->constrained();
            $table->string('ctrn_number')->nullable();
            $table->string('seal_number')->nullable();
            $table->decimal('storage_price', 10, 2);
            $table->decimal('storage_rate', 10, 2);
            $table->decimal('handling_in_price', 10, 2);
            $table->foreignId('labour_contractor_id')->nullable()->constrained('users');
            $table->foreignId('lifter_contractor_id')->nullable()->constrained('users');
            $table->boolean('repacking')->default(false);
            $table->text('comment')->nullable();
            $table->text('remarks')->nullable();
            $table->string('image')->nullable();
            $table->string('commodity')->nullable();
            $table->decimal('handling_out_charges', 10, 2)->nullable();
            $table->string('authorized_gate_pass_name')->nullable();
            $table->decimal('paid_amount', 10, 2)->nullable();
            $table->foreignId('labour_id')->nullable()->constrained('users');
            $table->string('material_used')->nullable();
            $table->string('payment')->nullable();
            $table->string('storage_in_job_number')->nullable();
            $table->boolean('is_draft')->default(true);
            $table->boolean('is_finalized')->default(false);
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}