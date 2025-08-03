import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';

interface Props {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Sistem Manajemen Satpam" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Navigation */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8">
                                    <AppLogo />
                                </div>
                                <span className="text-xl font-bold text-gray-900">
                                    GuardManage
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link href="/dashboard">
                                        <Button>
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="outline">
                                                Masuk
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button>
                                                Daftar
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-blue-100 p-4 rounded-full">
                                <span className="text-6xl">🛡️</span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            🛡️ Sistem Manajemen Satpam
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Platform komprehensif untuk mengelola operasional keamanan dengan 
                            sistem laporan real-time, manajemen shift, dan kontrol pengguna yang lengkap.
                        </p>

                        {!auth.user && (
                            <div className="flex justify-center space-x-4 mb-12">
                                <Link href="/login">
                                    <Button size="lg" className="px-8 py-3">
                                        🚀 Mulai Sekarang
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="outline" size="lg" className="px-8 py-3">
                                        📝 Daftar Akun
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        {/* Superadmin Features */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500">
                            <div className="text-center mb-4">
                                <span className="text-4xl mb-3 block">👑</span>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Superadmin
                                </h3>
                            </div>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center">
                                    <span className="mr-2">📊</span>
                                    Dashboard lengkap dengan statistik
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">👥</span>
                                    Manajemen pengguna (CRUD)
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">⏰</span>
                                    Manajemen shift kerja
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">📋</span>
                                    Akses semua laporan area
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">🔍</span>
                                    Pencarian berdasarkan tanggal & user
                                </li>
                            </ul>
                        </div>

                        {/* Admin Features */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
                            <div className="text-center mb-4">
                                <span className="text-4xl mb-3 block">🔧</span>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Admin
                                </h3>
                            </div>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center">
                                    <span className="mr-2">📊</span>
                                    Dashboard operasional
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">⏰</span>
                                    Manajemen shift kerja
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">📋</span>
                                    Monitoring laporan area
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">✅</span>
                                    Update status laporan
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">🔍</span>
                                    Filter & pencarian laporan
                                </li>
                            </ul>
                        </div>

                        {/* User Features */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
                            <div className="text-center mb-4">
                                <span className="text-4xl mb-3 block">👮</span>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Satpam (User)
                                </h3>
                            </div>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center">
                                    <span className="mr-2">📊</span>
                                    Dashboard personal
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">📝</span>
                                    Input laporan area real-time
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">📍</span>
                                    Koordinat lokasi otomatis
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">📸</span>
                                    Upload gambar/video (max 2 file)
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">📋</span>
                                    Riwayat laporan pribadi
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="mt-16 bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                            🎯 Fitur Unggulan
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="bg-blue-100 p-3 rounded-full inline-block mb-3">
                                    <span className="text-2xl">🔐</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Keamanan Terjamin
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Sistem otentikasi dan otorisasi multi-level yang aman
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-green-100 p-3 rounded-full inline-block mb-3">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Real-time
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Laporan dengan lokasi dan waktu real-time
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-purple-100 p-3 rounded-full inline-block mb-3">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Responsif
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Interface yang optimal untuk semua perangkat
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-yellow-100 p-3 rounded-full inline-block mb-3">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Analytics
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Dashboard analitik dan laporan lengkap
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth.user && (
                        <div className="mt-16 text-center">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
                                <h2 className="text-2xl font-bold mb-4">
                                    Siap Mengoptimalkan Keamanan Anda? 🚀
                                </h2>
                                <p className="text-lg mb-6 opacity-90">
                                    Bergabunglah dengan sistem manajemen satpam terdepan
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <Link href="/register">
                                        <Button size="lg" variant="secondary" className="px-8 py-3">
                                            🎯 Mulai Gratis
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                                            🔑 Masuk Sekarang
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8 mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="h-6 w-6 text-white">
                                    <AppLogo />
                                </div>
                                <span className="text-lg font-semibold">GuardManage</span>
                            </div>
                            <p className="text-gray-400">
                                © 2024 Sistem Manajemen Satpam. Solusi keamanan terpercaya.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}