<?php

namespace Database\Factories;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $category = Category::inRandomOrder()->first();

        return [
            'category_id' => $category->id,
            'name' => fake()->words(3, true),
            'slug' => fake()->slug(),
            'description' => fake()->paragraph(),
            'price' => fake()->numberBetween(1000, 10000),
            'stock_quantity' => fake()->numberBetween(0, 100),
            'unit' => fake()->randomElement(['kg', 'liter', 'bag', 'package']),
            'is_featured' => fake()->boolean(),
            'is_active' => fake()->boolean(100),
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subMinutes(rand(0, 60 * 24))
        ];
    }
}
