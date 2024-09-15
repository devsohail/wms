<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

       Role::factory()->create([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);
        $user= User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@go4green.ae',
            'password' => bcrypt('admin123'),
            'role_id' => 1,
        ]);
        $user->assignRole('admin');

    }
}
