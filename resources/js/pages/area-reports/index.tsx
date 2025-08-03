import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AreaReport {
    id: number;
    area_name: string;
    description: string;
    details: string;
    status: string;
    reported_at: string;
    location_address?: string;
    user: User;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: AreaReport[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    reports: Pagination;
    users: User[];
    filters: {
        search?: string;
        user_id?: string;
        start_date?: string;
        end_date?: string;
        status?: string;
    };
    can_create: boolean;
    [key: string]: unknown;
}

export default function AreaReportsIndex({ reports, users, filters, can_create }: Props) {
    const [searchForm, setSearchForm] = useState({
        search: filters.search || '',
        user_id: filters.user_id || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        status: filters.status || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/area-reports', searchForm, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearchForm({
            search: '',
            user_id: '',
            start_date: '',
            end_date: '',
            status: '',
        });
        router.get('/area-reports', {}, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: { class: 'bg-yellow-100 text-yellow-800', icon: '⏳', text: 'Pending' },
            reviewed: { class: 'bg-blue-100 text-blue-800', icon: '👀', text: 'Reviewed' },
            completed: { class: 'bg-green-100 text-green-800', icon: '✅', text: 'Completed' },
        };
        return badges[status as keyof typeof badges] || { class: 'bg-gray-100 text-gray-800', icon: '❓', text: status };
    };

    return (
        <AppShell>
            <Head title="Daftar Laporan Area" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Heading title="📋 Daftar Laporan Area" />
                        <p className="text-gray-600 mt-1">
                            {can_create ? 'Kelola laporan area Anda' : 'Monitor semua laporan area'}
                        </p>
                    </div>
                    
                    {can_create && (
                        <Link href="/area-reports/create">
                            <Button className="flex items-center space-x-2">
                                <span>📝</span>
                                <span>Buat Laporan</span>
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    🔍 Cari Area
                                </label>
                                <input
                                    type="text"
                                    value={searchForm.search}
                                    onChange={(e) => setSearchForm({ ...searchForm, search: e.target.value })}
                                    placeholder="Nama area..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {users.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        👤 Pengguna
                                    </label>
                                    <select
                                        value={searchForm.user_id}
                                        onChange={(e) => setSearchForm({ ...searchForm, user_id: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Semua Pengguna</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    📅 Dari Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={searchForm.start_date}
                                    onChange={(e) => setSearchForm({ ...searchForm, start_date: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    📅 Sampai Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={searchForm.end_date}
                                    onChange={(e) => setSearchForm({ ...searchForm, end_date: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    📊 Status
                                </label>
                                <select
                                    value={searchForm.status}
                                    onChange={(e) => setSearchForm({ ...searchForm, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <Button type="submit" variant="outline">
                                🔍 Filter
                            </Button>
                            <Button type="button" variant="outline" onClick={clearFilters}>
                                🗑️ Reset
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Reports List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {reports.data.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {reports.data.map((report) => {
                                const statusBadge = getStatusBadge(report.status);
                                return (
                                    <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {report.area_name}
                                                    </h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.class}`}>
                                                        {statusBadge.icon} {statusBadge.text}
                                                    </span>
                                                </div>
                                                
                                                <p className="text-gray-600 mb-2">
                                                    {report.description}
                                                </p>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center space-x-1">
                                                        <span>👤</span>
                                                        <span>{report.user.name}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <span>📅</span>
                                                        <span>
                                                            {new Date(report.reported_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                    {report.location_address && (
                                                        <div className="flex items-center space-x-1">
                                                            <span>📍</span>
                                                            <span className="truncate">{report.location_address}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="ml-4">
                                                <Link href={`/area-reports/${report.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        👁️ Detail
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Tidak ada laporan ditemukan
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {can_create ? 'Mulai dengan membuat laporan pertama Anda.' : 'Tidak ada laporan yang sesuai dengan filter.'}
                            </p>
                            {can_create && (
                                <Link href="/area-reports/create">
                                    <Button>
                                        📝 Buat Laporan Pertama
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {reports.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Menampilkan {((reports.current_page - 1) * reports.per_page) + 1} sampai {Math.min(reports.current_page * reports.per_page, reports.total)} dari {reports.total} laporan
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            {reports.links.map((link, index) => (
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
            </div>
        </AppShell>
    );
}