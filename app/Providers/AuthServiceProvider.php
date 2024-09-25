<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Customer;
use App\Policies\CustomerPolicy;
use App\Models\Staff;
use App\Policies\StaffPolicy;
use App\Models\Document;
use App\Policies\DocumentPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Customer::class => CustomerPolicy::class,
        Staff::class => StaffPolicy::class,
        Document::class => DocumentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('SuperAdmin', function ($user) {
            return $user->role_id === 1; 
        });
        Gate::define('Admin', function ($user) {
            return $user->role_id === 2; 
        });
        Gate::define('AllAdmin', function ($user) {
            return ($user->role_id === 2 || $user->role_id === 1); 
        });
    }
}
