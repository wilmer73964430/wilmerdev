<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PlanFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->word().' Plan',
            'slug' => $this->faker->unique()->slug(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 10, 200),
            'currency' => 'USD',
            'interval' => $this->faker->randomElement(['monthly', 'yearly']),
            'features' => ['Clientes ilimitados', 'Soporte 24/7'],
            'is_active' => true,
            'trial_days' => 7,
        ];
    }
}
