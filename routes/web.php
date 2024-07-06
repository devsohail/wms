<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});


Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/register', [LoginController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [LoginController::class, 'register']);

Route::get('/forgot-password', [LoginController::class, 'showForgotPasswordForm'])->name('password.request');
Route::post('/forgot-password', [LoginController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/reset-password/{token}', [LoginController::class, 'showResetPasswordForm'])->name('password.reset');
Route::post('/reset-password', [LoginController::class, 'resetPassword'])->name('password.update');
Route::get('/change-password', [LoginController::class, 'showChangePasswordForm'])->name('password.change');
Route::post('/change-password', [LoginController::class, 'changePassword'])->name('password.update');
