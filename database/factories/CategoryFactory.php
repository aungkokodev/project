<?php

namespace Database\Factories;

use Carbon\Carbon;
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
            'image' => '/storage/categories/' . fake()->randomElement(['1', '2', '3']) . '.jpg',
            'parent_id' => null,
            'created_at' => Carbon::now()
                ->subDays(rand(0, 90))
                ->setHour(rand(0, 23))
                ->setMinute(rand(0, 59))
        ];
    }
}
