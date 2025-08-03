<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AreaReport;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isSuperadmin()) {
            $stats = [
                'total_users' => User::count(),
                'total_admins' => User::byRole('admin')->count(),
                'total_guards' => User::byRole('user')->count(),
                'total_shifts' => Shift::count(),
                'active_shifts' => Shift::active()->count(),
                'total_reports' => AreaReport::count(),
                'pending_reports' => AreaReport::byStatus('pending')->count(),
                'completed_reports' => AreaReport::byStatus('completed')->count(),
            ];

            $recent_reports = AreaReport::with('user')
                ->latest('reported_at')
                ->take(5)
                ->get();

            $recent_users = User::latest()
                ->take(5)
                ->get();

            return Inertia::render('dashboard', [
                'user_role' => 'superadmin',
                'stats' => $stats,
                'recent_reports' => $recent_reports,
                'recent_users' => $recent_users,
            ]);
        } elseif ($user->isAdmin()) {
            $stats = [
                'total_guards' => User::byRole('user')->count(),
                'total_shifts' => Shift::count(),
                'active_shifts' => Shift::active()->count(),
                'total_reports' => AreaReport::count(),
                'pending_reports' => AreaReport::byStatus('pending')->count(),
                'completed_reports' => AreaReport::byStatus('completed')->count(),
            ];

            $recent_reports = AreaReport::with('user')
                ->latest('reported_at')
                ->take(5)
                ->get();

            return Inertia::render('dashboard', [
                'user_role' => 'admin',
                'stats' => $stats,
                'recent_reports' => $recent_reports,
            ]);
        } else {
            $stats = [
                'my_reports' => $user->areaReports()->count(),
                'pending_reports' => $user->areaReports()->where('status', 'pending')->count(),
                'completed_reports' => $user->areaReports()->where('status', 'completed')->count(),
            ];

            $recent_reports = $user->areaReports()
                ->latest('reported_at')
                ->take(5)
                ->get();

            return Inertia::render('dashboard', [
                'user_role' => 'user',
                'stats' => $stats,
                'recent_reports' => $recent_reports,
            ]);
        }
    }
}