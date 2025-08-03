import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface Stats {
    total_users?: number;
    total_admins?: number;
    total_guards?: number;
    total_shifts?: number;
    active_shifts?: number;
    total_reports?: number;
    pending_reports?: number;
    completed_reports?: number;
    my_reports?: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface AreaReport {
    id: number;
    area_name: string;
    description: string;
    status: string;
    reported_at: string;
    user?: User;
}

interface Props {
    user_role: 'superadmin' | 'admin' | 'user';
    stats: Stats;
    recent_reports?: AreaReport[];
    recent_users?: User[];
    [key: string]: unknown;
}

export default function Dashboard({ user_role, stats, recent_reports = [], recent_users = [] }: Props) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat Pagi';
        if (hour < 15) return 'Selamat Siang';
        if (hour < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    const getRoleTitle = () => {
        switch (user_role) {
            case 'superadmin': return '👑 Superadmin Dashboard';
            case 'admin': return '🔧 Admin Dashboard';
            case 'user': return '👮 Dashboard Satpam';
            default: return 'Dashboard';
        }
    };

    const getStatusBadge = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            reviewed: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">
                                {getGreeting()}! 👋
                            </h1>
                            <p className="text-blue-100">
                                {getRoleTitle()}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-blue-200">
                                {new Date().toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {user_role === 'superadmin' && (
                        <>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_users}</p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Admin</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_admins}</p>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <span className="text-2xl">🔧</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Satpam</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_guards}</p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <span className="text-2xl">👮</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {(user_role === 'superadmin' || user_role === 'admin') && (
                        <>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Shift</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_shifts}</p>
                                    </div>
                                    <div className="bg-yellow-100 p-3 rounded-full">
                                        <span className="text-2xl">⏰</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Shift Aktif</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.active_shifts}</p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    {user_role === 'user' ? 'Laporan Saya' : 'Total Laporan'}
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {user_role === 'user' ? stats.my_reports : stats.total_reports}
                                </p>
                            </div>
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <span className="text-2xl">📋</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Laporan Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pending_reports}</p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <span className="text-2xl">⏳</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Laporan Selesai</p>
                                <p className="text-2xl font-bold text-green-600">{stats.completed_reports}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <Heading title="🚀 Aksi Cepat" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {user_role === 'superadmin' && (
                            <>
                                <Link href="/users">
                                    <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                                        <span className="text-2xl">👥</span>
                                        <span>Kelola Pengguna</span>
                                    </Button>
                                </Link>
                                <Link href="/shifts">
                                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                                        <span className="text-2xl">⏰</span>
                                        <span>Kelola Shift</span>
                                    </Button>
                                </Link>
                            </>
                        )}

                        {(user_role === 'admin') && (
                            <Link href="/shifts">
                                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                                    <span className="text-2xl">⏰</span>
                                    <span>Kelola Shift</span>
                                </Button>
                            </Link>
                        )}

                        {user_role === 'user' && (
                            <Link href="/area-reports/create">
                                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                                    <span className="text-2xl">📝</span>
                                    <span>Buat Laporan</span>
                                </Button>
                            </Link>
                        )}

                        <Link href="/area-reports">
                            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                                <span className="text-2xl">📋</span>
                                <span>
                                    {user_role === 'user' ? 'Laporan Saya' : 'Daftar Laporan'}
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Reports */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Heading title="📋 Laporan Terbaru" />
                            <Link href="/area-reports">
                                <Button variant="outline" size="sm">
                                    Lihat Semua
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="space-y-3">
                            {recent_reports.length > 0 ? (
                                recent_reports.map((report) => (
                                    <div key={report.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-900">{report.area_name}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                                                {report.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                            {report.user && (
                                                <span>oleh {report.user.name}</span>
                                            )}
                                            <span>{new Date(report.reported_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">Belum ada laporan terbaru</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Users - Only for Superadmin */}
                    {user_role === 'superadmin' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Heading title="👥 Pengguna Terbaru" />
                                <Link href="/users">
                                    <Button variant="outline" size="sm">
                                        Kelola Pengguna
                                    </Button>
                                </Link>
                            </div>
                            
                            <div className="space-y-3">
                                {recent_users.length > 0 ? (
                                    recent_users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium text-gray-900">{user.name}</h4>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    user.role === 'superadmin' ? 'bg-red-100 text-red-800' :
                                                    user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {user.role}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(user.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Belum ada pengguna terbaru</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tips for Users */}
                    {user_role === 'user' && (
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                            <Heading title="💡 Tips untuk Satpam" />
                            
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <span className="text-lg">📍</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Lokasi Real-time</h4>
                                        <p className="text-sm text-gray-600">
                                            Pastikan GPS aktif saat membuat laporan untuk akurasi lokasi
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <span className="text-lg">📸</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Dokumentasi</h4>
                                        <p className="text-sm text-gray-600">
                                            Lampirkan foto atau video sebagai bukti (maksimal 2 file, 10MB)
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <span className="text-lg">📝</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Detail Lengkap</h4>
                                        <p className="text-sm text-gray-600">
                                            Berikan deskripsi yang jelas dan detail pada setiap laporan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}