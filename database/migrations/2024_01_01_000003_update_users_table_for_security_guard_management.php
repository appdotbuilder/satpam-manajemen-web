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
        Schema::table('users', function (Blueprint $table) {
            $table->string('nik')->unique()->after('name')->comment('Nomor Induk Kependudukan');
            $table->string('nip')->unique()->after('nik')->comment('Nomor Induk Pegawai');
            $table->string('phone')->nullable()->after('email')->comment('Nomor Telepon');
            $table->enum('role', ['superadmin', 'admin', 'user'])->default('user')->after('phone')->comment('User role');
            $table->boolean('is_active')->default(true)->after('role')->comment('User status');
            
            // Add indexes
            $table->index('role');
            $table->index('is_active');
            $table->index(['role', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role', 'is_active']);
            $table->dropIndex(['is_active']);
            $table->dropIndex(['role']);
            $table->dropColumn(['nik', 'nip', 'phone', 'role', 'is_active']);
        });
    }
};