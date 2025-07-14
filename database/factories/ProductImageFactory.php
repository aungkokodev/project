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
            'created_at' => Carbon::now()
                ->subDays(rand(0, 90))
                ->setHour(rand(0, 23))
                ->setMinute(rand(0, 59))
        ];
    }
}
