<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'product_id' => Product::inRandomOrder()->first(),
            'quantity' => fake()->numberBetween(1, 5),
            'unit_price' => fake()->numberBetween(1000, 5000),
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subMinutes(rand(0, 60 * 24))
        ];
    }
}
