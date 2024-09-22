<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodesTable extends Migration
{
    public function up()
    {
        Schema::create('codes', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('entity_type');
            $table->unsignedBigInteger('entity_id');
            $table->timestamps();

            $table->unique(['entity_type', 'entity_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('codes');
    }
}