import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface Shift {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    description?: string;
    is_active: boolean;
    created_at: string;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Shift[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    shifts: Pagination;
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function ShiftsIndex({ shifts, filters }: Props) {
    const [searchForm, setSearchForm] = useState({
        search: filters.search || '',
        status: filters.status || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/shifts', searchForm, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearchForm({ search: '', status: '' });
        router.get('/shifts', {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (shift: Shift) => {
        if (confirm(`Apakah Anda yakin ingin menghapus shift ${shift.name}?`)) {
            router.delete(`/shifts/${shift.id}`);
        }
    };

    const formatTime = (time: string) => {
        return new Date(`2000-01-01 ${time}`).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const calculateDuration = (startTime: string, endTime: string) => {
        const start = new Date(`2000-01-01 ${startTime}`);
        let end = new Date(`2000-01-01 ${endTime}`);
        
        // Handle overnight shifts
        if (end <= start) {
            end = new Date(`2000-01-02 ${endTime}`);
        }
        
        const diffMs = end.getTime() - start.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffMinutes === 0) {
            return `${diffHours} jam`;
        }
        return `${diffHours} jam ${diffMinutes} menit`;
    };

    return (
        <AppShell>
            <Head title="Manajemen Shift" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Heading title="⏰ Manajemen Shift" />
                        <p className="text-gray-600 mt-1">
                            Kelola jadwal shift kerja satpam
                        </p>
                    </div>
                    
                    <Link href="/shifts/create">
                        <Button className="flex items-center space-x-2">
                            <span>➕</span>
                            <span>Tambah Shift</span>
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchForm.search}
                                onChange={(e) => setSearchForm({ ...searchForm, search: e.target.value })}
                                placeholder="🔍 Cari nama shift..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div>
                            <select
                                value={searchForm.status}
                                onChange={(e) => setSearchForm({ ...searchForm, status: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                            </select>
                        </div>
                        
                        <div className="flex space-x-2">
                            <Button type="submit" variant="outline">
                                🔍 Filter
                            </Button>
                            <Button type="button" variant="outline" onClick={clearFilters}>
                                🗑️ Reset
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Shifts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shifts.data.length > 0 ? (
                        shifts.data.map((shift) => (
                            <div key={shift.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {shift.name}
                                        </h3>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <span>🕐</span>
                                                <span>
                                                    {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span>⏱️</span>
                                                <span>{calculateDuration(shift.start_time, shift.end_time)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        shift.is_active 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {shift.is_active ? '✅ Aktif' : '❌ Nonaktif'}
                                    </span>
                                </div>
                                
                                {shift.description && (
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {shift.description}
                                    </p>
                                )}
                                
                                <div className="flex space-x-2">
                                    <Link href={`/shifts/${shift.id}`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            👁️ Detail
                                        </Button>
                                    </Link>
                                    <Link href={`/shifts/${shift.id}/edit`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            ✏️ Edit
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleDelete(shift)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        🗑️
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-6xl mb-4">⏰</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Tidak ada shift ditemukan
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Mulai dengan menambahkan shift pertama.
                            </p>
                            <Link href="/shifts/create">
                                <Button>
                                    ➕ Tambah Shift
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {shifts.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Menampilkan {((shifts.current_page - 1) * shifts.per_page) + 1} sampai {Math.min(shifts.current_page * shifts.per_page, shifts.total)} dari {shifts.total} shift
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            {shifts.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    className={`px-3 py-2 text-sm rounded-md ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Shift Statistics */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{shifts.total}</div>
                            <div className="text-sm text-gray-600">Total Shift</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {shifts.data.filter(s => s.is_active).length}
                            </div>
                            <div className="text-sm text-gray-600">Shift Aktif</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-600">
                                {shifts.data.filter(s => !s.is_active).length}
                            </div>
                            <div className="text-sm text-gray-600">Shift Nonaktif</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">24</div>
                            <div className="text-sm text-gray-600">Jam/Hari</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}