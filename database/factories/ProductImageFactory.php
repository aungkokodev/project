<?php

namespace Database\Factories;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductImage>
 */
class ProductImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'path' => '/storage/product_images/' . fake()->randomElement(['1', '2', '3']) . '.jpg',
            'is_default' => fake()->boolean(),
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subMinutes(rand(0, 60 * 24))
        ];
    }
}
