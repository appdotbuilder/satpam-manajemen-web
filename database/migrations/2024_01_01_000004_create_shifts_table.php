<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nama shift');
            $table->time('start_time')->comment('Waktu mulai shift');
            $table->time('end_time')->comment('Waktu selesai shift');
            $table->text('description')->nullable()->comment('Deskripsi shift');
            $table->boolean('is_active')->default(true)->comment('Status shift');
            $table->timestamps();
            
            // Add indexes
            $table->index('is_active');
            $table->index('start_time');
            $table->index('end_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};