<?php

namespace Database\Seeders;

use App\Models\AreaReport;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Superadmin
        User::create([
            'name' => 'Super Administrator',
            'nik' => '1234567890123456',
            'nip' => 'SA001',
            'email' => 'superadmin@example.com',
            'phone' => '081234567890',
            'role' => 'superadmin',
            'is_active' => true,
            'password' => Hash::make('password'),
        ]);

        // Create Admin
        User::create([
            'name' => 'Administrator',
            'nik' => '1234567890123457',
            'nip' => 'AD001',
            'email' => 'admin@example.com',
            'phone' => '081234567891',
            'role' => 'admin',
            'is_active' => true,
            'password' => Hash::make('password'),
        ]);

        // Create sample users (security guards)
        $users = [
            [
                'name' => 'Budi Santoso',
                'nik' => '3201010101010001',
                'nip' => 'SP001',
                'email' => 'budi@example.com',
                'phone' => '081234567892',
                'role' => 'user',
                'is_active' => true,
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Siti Rahma',
                'nik' => '3201010101010002',
                'nip' => 'SP002',
                'email' => 'siti@example.com',
                'phone' => '081234567893',
                'role' => 'user',
                'is_active' => true,
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Ahmad Wijaya',
                'nik' => '3201010101010003',
                'nip' => 'SP003',
                'email' => 'ahmad@example.com',
                'phone' => '081234567894',
                'role' => 'user',
                'is_active' => true,
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }

        // Create additional random users
        User::factory(7)->create(['role' => 'user']);

        // Create sample shifts
        $shifts = [
            [
                'name' => 'Shift Pagi',
                'start_time' => '06:00',
                'end_time' => '14:00',
                'description' => 'Shift pagi hari dari jam 6 pagi sampai 2 siang',
                'is_active' => true,
            ],
            [
                'name' => 'Shift Siang',
                'start_time' => '14:00',
                'end_time' => '22:00',
                'description' => 'Shift siang hari dari jam 2 siang sampai 10 malam',
                'is_active' => true,
            ],
            [
                'name' => 'Shift Malam',
                'start_time' => '22:00',
                'end_time' => '06:00',
                'description' => 'Shift malam hari dari jam 10 malam sampai 6 pagi',
                'is_active' => true,
            ],
        ];

        foreach ($shifts as $shiftData) {
            Shift::create($shiftData);
        }

        // Create additional random shifts
        Shift::factory(5)->create();

        // Create sample area reports
        AreaReport::factory(25)->create();
    }
}