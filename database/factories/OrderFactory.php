<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'shipping_address_id' => Address::factory(),
            'billing_address_id' => Address::factory(),
            'order_number' => 'ORD-' . $this->faker->unique()->randomNumber(6),
            'total_amount' => $this->faker->numberBetween(1000, 50000),
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed', 'cancelled']),
            'payment_method' => $this->faker->randomElement(['cod', 'credit_card', 'bank_transfer']),
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed']),
            'created_at' => Carbon::now()->subMinutes(rand(0, 60 * 24 * 360))
        ];
    }
}
