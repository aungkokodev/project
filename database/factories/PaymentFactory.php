<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
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
            'transaction_id' => 'TXN-' . fake()->unique()->randomNumber(8),
            'amount' => fake()->numberBetween(1000, 50000),
            'gateway' => fake()->randomElement(['cod', 'online']),
            'status' => fake()->randomElement(['succeeded', 'failed']),
            'metadata' => json_encode(['card_last_four' => fake()->randomNumber(4)]),
        ];
    }
}
