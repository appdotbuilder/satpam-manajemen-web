<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shift>
 */
class ShiftFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startHour = fake()->numberBetween(6, 22);
        $endHour = $startHour + fake()->numberBetween(6, 8);
        if ($endHour > 24) {
            $endHour = $endHour - 24;
        }

        return [
            'name' => fake()->randomElement([
                'Shift Pagi',
                'Shift Siang', 
                'Shift Sore',
                'Shift Malam',
                'Shift Weekend',
                'Shift Holiday'
            ]),
            'start_time' => sprintf('%02d:00', $startHour),
            'end_time' => sprintf('%02d:00', $endHour),
            'description' => fake()->sentence(),
            'is_active' => fake()->boolean(80),
        ];
    }
}