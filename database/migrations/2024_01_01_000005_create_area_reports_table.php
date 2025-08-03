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
        Schema::create('area_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('area_name');
            $table->text('description');
            $table->text('details');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('location_address')->nullable();
            $table->json('attachments')->nullable();
            $table->enum('status', ['pending', 'reviewed', 'completed'])->default('pending');
            $table->timestamp('reported_at')->useCurrent();
            $table->timestamps();
            
            // Add indexes
            $table->index('user_id');
            $table->index('status');
            $table->index('reported_at');
            $table->index(['user_id', 'reported_at']);
            $table->index(['status', 'reported_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('area_reports');
    }
};