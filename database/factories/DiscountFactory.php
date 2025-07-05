<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discount>
 */
class DiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => 'CODE' . fake()->unique()->randomNumber(4),
            'type' => fake()->randomElement(['percentage', 'fixed']),
            'value' => fake()->numberBetween(5, 50),
            'max_uses' => fake()->numberBetween(10, 100),
            'used_count' => 0,
            'valid_from' => now(),
            'valid_until' => now()->addMonth(),
        ];
    }
}
