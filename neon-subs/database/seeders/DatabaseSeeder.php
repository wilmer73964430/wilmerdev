<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Plan;
use App\Models\Coupon;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);

        $admin = User::firstOrCreate([
            'email' => 'admin@neon-subs.test',
        ], [
            'name' => 'Administrador',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        $admin->syncRoles(['admin']);

        $plans = [
            [
                'name' => 'Básico',
                'slug' => 'basico',
                'description' => 'Ideal para proyectos en lanzamiento.',
                'price' => 29,
                'currency' => 'USD',
                'interval' => 'monthly',
                'features' => ['100 clientes', '1 pasarela'],
                'trial_days' => 7,
            ],
            [
                'name' => 'Pro',
                'slug' => 'pro',
                'description' => 'Para startups en crecimiento.',
                'price' => 79,
                'currency' => 'USD',
                'interval' => 'monthly',
                'features' => ['1,000 clientes', 'Soporte prioritario'],
                'trial_days' => 14,
            ],
        ];

        foreach ($plans as $plan) {
            Plan::updateOrCreate(['slug' => $plan['slug']], $plan);
        }

        Coupon::firstOrCreate([
            'code' => 'NEON50',
        ], [
            'type' => 'percent',
            'value' => 50,
            'valid_from' => now()->subDay(),
            'valid_to' => now()->addMonth(),
            'is_active' => true,
        ]);
    }
}
