<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(2, true),
            'slug' => fake()->slug(),
            'description' => fake()->sentence(),
            'image' => '/storage/categories/' . fake()->randomElement(['1', '2', '3']) . '.jpg',
            'parent_id' => null
        ];
    }
}
