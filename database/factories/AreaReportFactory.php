<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AreaReport>
 */
class AreaReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::byRole('user')->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'user'])->id,
            'area_name' => fake()->randomElement([
                'Lobby Utama',
                'Parkiran Basement',
                'Ruang Server',
                'Area Loading Dock',
                'Kantin Karyawan',
                'Ruang Meeting',
                'Toilet Lantai 2',
                'Emergency Exit',
                'Security Post',
                'Rooftop Area'
            ]),
            'description' => fake()->sentence(),
            'details' => fake()->paragraph(3),
            'latitude' => fake()->latitude(-6.4, -6.1), // Jakarta area
            'longitude' => fake()->longitude(106.7, 107.0), // Jakarta area
            'location_address' => fake()->address(),
            'attachments' => null,
            'status' => fake()->randomElement(['pending', 'reviewed', 'completed']),
            'reported_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}