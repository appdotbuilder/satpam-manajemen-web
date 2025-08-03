<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAreaReportRequest;
use App\Models\AreaReport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AreaReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = AreaReport::with('user');

        // Filter by user (for admins and superadmins)
        if ($request->filled('user_id') && $request->user()->hasAdminPrivileges()) {
            $query->byUser($request->user_id);
        } elseif ($request->user()->isUser()) {
            // Users can only see their own reports
            $query->byUser($request->user()->id);
        }

        // Filter by date range
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->byDateRange($request->start_date, $request->end_date);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        // Search by area name
        if ($request->filled('search')) {
            $query->where('area_name', 'like', "%{$request->search}%");
        }

        $reports = $query->latest('reported_at')->paginate(10)->withQueryString();

        // Get users for filter dropdown (only for admins)
        $users = [];
        if ($request->user()->hasAdminPrivileges()) {
            $users = User::byRole('user')->select('id', 'name')->get();
        }

        return Inertia::render('area-reports/index', [
            'reports' => $reports,
            'users' => $users,
            'filters' => $request->only(['search', 'user_id', 'start_date', 'end_date', 'status']),
            'can_create' => $request->user()->isUser(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('area-reports/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAreaReportRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $data['reported_at'] = now();

        // Handle file uploads
        if ($request->hasFile('attachments')) {
            $attachments = [];
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('area-reports', 'public');
                $attachments[] = [
                    'filename' => $file->getClientOriginalName(),
                    'path' => $path,
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                ];
            }
            $data['attachments'] = $attachments;
        }

        AreaReport::create($data);

        return redirect()->route('area-reports.index')
            ->with('success', 'Laporan area berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(AreaReport $areaReport)
    {
        $areaReport->load('user');

        // Check if user can view this report
        if (!auth()->user()->hasAdminPrivileges() && $areaReport->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('area-reports/show', [
            'report' => $areaReport,
        ]);
    }

    /**
     * Update the status of the area report (admin only).
     */
    public function update(Request $request, AreaReport $areaReport)
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed,completed',
        ]);

        $areaReport->update([
            'status' => $request->status,
        ]);

        return back()->with('success', 'Status laporan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AreaReport $areaReport)
    {
        // Delete associated files
        if ($areaReport->attachments) {
            foreach ($areaReport->attachments as $attachment) {
                Storage::disk('public')->delete($attachment['path']);
            }
        }

        $areaReport->delete();

        return redirect()->route('area-reports.index')
            ->with('success', 'Laporan area berhasil dihapus.');
    }
}