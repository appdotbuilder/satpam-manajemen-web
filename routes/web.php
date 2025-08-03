<?php

use App\Http\Controllers\AreaReportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard - role-based
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // User Management - Superadmin only
    Route::resource('users', UserController::class);

    // Shift Management - Admin and Superadmin
    Route::resource('shifts', ShiftController::class);

    // Area Reports - All authenticated users (with different permissions)
    Route::resource('area-reports', AreaReportController::class)->except(['edit']);
    
    // Update area report status - Admin and Superadmin only
    Route::patch('/area-reports/{areaReport}/status', [AreaReportController::class, 'update'])
        ->name('area-reports.update-status');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';