<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'    => User::factory(),
            'type'       => $this->faker->randomElement(['shipping', 'billing']),
            'fullname'   => $this->faker->name(),
            'phone'      => $this->faker->phoneNumber(),
            'label'      => $this->faker->randomElement(['Home', 'Work']),
            'street'     => $this->faker->streetAddress(),
            'city'       => $this->faker->city(),
            'state'      => $this->faker->state(),
            'zip_code'   => $this->faker->postcode(),
            'country'    => $this->faker->country(),
            'is_default' => false,
            'created_at' => Carbon::now()->subDays(rand(0, 365))->subMinutes(rand(0, 1440)),
        ];
    }
}
