import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface User {
    id: number;
    name: string;
    nik: string;
    nip: string;
    email: string;
    phone?: string;
    role: string;
    is_active: boolean;
    created_at: string;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: User[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    users: Pagination;
    filters: {
        search?: string;
        role?: string;
    };
    [key: string]: unknown;
}

export default function UsersIndex({ users, filters }: Props) {
    const [searchForm, setSearchForm] = useState({
        search: filters.search || '',
        role: filters.role || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/users', searchForm, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearchForm({ search: '', role: '' });
        router.get('/users', {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (user: User) => {
        if (confirm(`Apakah Anda yakin ingin menghapus pengguna ${user.name}?`)) {
            router.delete(`/users/${user.id}`);
        }
    };

    const getRoleBadge = (role: string) => {
        const badges = {
            superadmin: { class: 'bg-red-100 text-red-800', icon: '👑', text: 'Superadmin' },
            admin: { class: 'bg-blue-100 text-blue-800', icon: '🔧', text: 'Admin' },
            user: { class: 'bg-green-100 text-green-800', icon: '👮', text: 'Satpam' },
        };
        return badges[role as keyof typeof badges] || { class: 'bg-gray-100 text-gray-800', icon: '❓', text: role };
    };

    return (
        <AppShell>
            <Head title="Manajemen Pengguna" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Heading title="👥 Manajemen Pengguna" />
                        <p className="text-gray-600 mt-1">
                            Kelola semua pengguna sistem
                        </p>
                    </div>
                    
                    <Link href="/users/create">
                        <Button className="flex items-center space-x-2">
                            <span>➕</span>
                            <span>Tambah Pengguna</span>
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
                                placeholder="🔍 Cari nama, email, NIK, atau NIP..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div>
                            <select
                                value={searchForm.role}
                                onChange={(e) => setSearchForm({ ...searchForm, role: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Semua Role</option>
                                <option value="superadmin">Superadmin</option>
                                <option value="admin">Admin</option>
                                <option value="user">Satpam</option>
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

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {users.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Pengguna
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            NIK / NIP
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kontak
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.map((user) => {
                                        const roleBadge = getRoleBadge(user.role);
                                        return (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        NIK: {user.nik}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        NIP: {user.nip}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {user.phone || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge.class}`}>
                                                        {roleBadge.icon} {roleBadge.text}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        user.is_active 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {user.is_active ? '✅ Aktif' : '❌ Nonaktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Link href={`/users/${user.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            👁️ Detail
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/users/${user.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            ✏️ Edit
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleDelete(user)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        🗑️ Hapus
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Tidak ada pengguna ditemukan
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Mulai dengan menambahkan pengguna pertama.
                            </p>
                            <Link href="/users/create">
                                <Button>
                                    ➕ Tambah Pengguna
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Menampilkan {((users.current_page - 1) * users.per_page) + 1} sampai {Math.min(users.current_page * users.per_page, users.total)} dari {users.total} pengguna
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            {users.links.map((link, index) => (
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