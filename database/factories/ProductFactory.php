<?php

namespace Database\Factories;

use App\Models\Category;
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
        return [
            'category_id' => Category::factory(),
            'name' => fake()->words(3, true),
            'slug' => fake()->slug(),
            'description' => fake()->paragraph(),
            'price' => fake()->numberBetween(1000, 10000),
            'stock_quantity' => fake()->numberBetween(0, 100),
            // 'sku' => 'SKU-' . fake()->unique()->randomNumber(6),
            'image' => '/storage/products/Wonder.jpg',
            'unit' => fake()->randomElement(['kg', 'liter', 'bag', 'package']),
            'is_featured' => fake()->boolean(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
