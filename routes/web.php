<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\StaffController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\DocumentController;

// Public routes
Route::get('/', function () {
    return Inertia::render('Auth/Login');
});
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::get('/forgot-password', [LoginController::class, 'showForgotPasswordForm'])->name('password.request');
Route::post('/forgot-password', [LoginController::class, 'sendResetLinkEmail'])->name('password.email');

// Authenticated routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/register', [LoginController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [LoginController::class, 'register']);
    Route::get('/reset-password/{token}', [LoginController::class, 'showResetPasswordForm'])->name('password.reset');
    Route::post('/reset-password', [LoginController::class, 'resetPassword'])->name('password.update');
    Route::get('/change-password', [LoginController::class, 'showChangePasswordForm'])->name('password.change');
    Route::post('/change-password', [LoginController::class, 'changePassword'])->name('password.change.update');
    Route::resource('users', UserController::class)->only(['index', 'update', 'destroy', 'show', 'store', 'create', 'edit']);
    Route::resource('customers', CustomerController::class);
    Route::resource('vehicles', VehicleController::class);
    Route::resource('jobs', JobController::class);
    Route::post('jobs/{job}/finalize', [JobController::class, 'finalize'])->name('jobs.finalize');
    Route::resource('staff', StaffController::class)->middleware(['auth', 'verified']);
    Route::resource('roles', RoleController::class)->middleware(['auth', 'verified']);
    Route::resource('banks', BankController::class)->middleware(['auth', 'verified']);
    Route::resource('documents', DocumentController::class)->middleware(['auth', 'verified']);
    Route::get('/documents/{document}/download', [DocumentController::class, 'download'])
    ->name('documents.download')
    ->middleware(['auth', 'verified']);
    Route::delete('staff/{id}/force-delete', [StaffController::class, 'forceDelete'])->name('staff.forceDelete');
    Route::post('staff/{id}/restore', [StaffController::class, 'restore'])->name('staff.restore');
});

