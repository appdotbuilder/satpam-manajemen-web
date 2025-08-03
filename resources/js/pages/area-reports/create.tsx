import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';



export default function CreateAreaReport() {
    const [formData, setFormData] = useState({
        area_name: '',
        description: '',
        details: '',
        latitude: null as number | null,
        longitude: null as number | null,
        location_address: '',
        attachments: [] as File[],
    });

    const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Get current location
        if (navigator.geolocation) {
            setLocationStatus('loading');
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData(prev => ({ ...prev, latitude, longitude }));
                    
                    // Try to get address from coordinates (reverse geocoding)
                    try {
                        const response = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
                        );
                        const data = await response.json();
                        if (data.display_name) {
                            setFormData(prev => ({ ...prev, location_address: data.display_name }));
                        }
                    } catch (error) {
                        console.error('Error getting address:', error);
                    }
                    
                    setLocationStatus('success');
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLocationStatus('error');
                }
            );
        } else {
            setLocationStatus('error');
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        // Validate file count
        if (files.length > 2) {
            setErrors(prev => ({ ...prev, attachments: 'Maksimal 2 file yang dapat diupload.' }));
            return;
        }
        
        // Validate file size (10MB each)
        const maxSize = 10 * 1024 * 1024; // 10MB
        const invalidFiles = files.filter(file => file.size > maxSize);
        if (invalidFiles.length > 0) {
            setErrors(prev => ({ ...prev, attachments: 'Ukuran file maksimal 10MB per file.' }));
            return;
        }
        
        // Validate file types
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi'];
        const invalidTypes = files.filter(file => !allowedTypes.includes(file.type));
        if (invalidTypes.length > 0) {
            setErrors(prev => ({ ...prev, attachments: 'Format file tidak didukung. Gunakan JPG, PNG, GIF, MP4, MOV, atau AVI.' }));
            return;
        }
        
        setFormData(prev => ({ ...prev, attachments: files }));
        setErrors(prev => ({ ...prev, attachments: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const data = new FormData();
        data.append('area_name', formData.area_name);
        data.append('description', formData.description);
        data.append('details', formData.details);
        
        if (formData.latitude) data.append('latitude', formData.latitude.toString());
        if (formData.longitude) data.append('longitude', formData.longitude.toString());
        if (formData.location_address) data.append('location_address', formData.location_address);
        
        formData.attachments.forEach((file, index) => {
            data.append(`attachments[${index}]`, file);
        });

        router.post('/area-reports', data, {
            forceFormData: true,
            onSuccess: () => {
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
        });
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <AppShell>
            <Head title="Buat Laporan Area" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <Heading title="📝 Buat Laporan Area" />
                    <p className="text-gray-600 mt-2">
                        Laporkan kondisi atau kejadian di area patroli Anda
                    </p>
                </div>

                {/* Location Status */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📍 Lokasi Saat Ini</h3>
                    
                    {locationStatus === 'loading' && (
                        <div className="flex items-center space-x-3 text-blue-600">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            <span>Mendapatkan lokasi...</span>
                        </div>
                    )}
                    
                    {locationStatus === 'success' && (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-green-600">
                                <span>✅</span>
                                <span>Lokasi berhasil diperoleh</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                <p>Koordinat: {formData.latitude?.toFixed(6)}, {formData.longitude?.toFixed(6)}</p>
                                {formData.location_address && (
                                    <p>Alamat: {formData.location_address}</p>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {locationStatus === 'error' && (
                        <div className="flex items-center space-x-2 text-red-600">
                            <span>❌</span>
                            <span>Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan.</span>
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                    {/* Area Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            🏢 Nama Area <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="area_name"
                            value={formData.area_name}
                            onChange={handleInputChange}
                            placeholder="Contoh: Lobby Utama, Parkiran Basement, dll."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.area_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.area_name}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📄 Keterangan <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Ringkasan singkat tentang apa yang dilaporkan..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📋 Detail Laporan <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleInputChange}
                            placeholder="Jelaskan secara detail kondisi, kejadian, atau temuan yang ingin dilaporkan..."
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.details && (
                            <p className="text-red-500 text-sm mt-1">{errors.details}</p>
                        )}
                    </div>

                    {/* Attachments */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📎 Lampiran (Gambar/Video)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center">
                                <span className="text-4xl mb-4 block">📁</span>
                                <div className="text-sm text-gray-600 mb-4">
                                    <p>Pilih gambar atau video sebagai bukti</p>
                                    <p>Maksimal 2 file, ukuran maksimal 10MB per file</p>
                                    <p>Format: JPG, PNG, GIF, MP4, MOV, AVI</p>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                        
                        {formData.attachments.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <p className="text-sm font-medium text-gray-700">File yang dipilih:</p>
                                {formData.attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                        <div className="flex items-center space-x-2">
                                            <span>{file.type.startsWith('image/') ? '🖼️' : '🎥'}</span>
                                            <span className="text-sm">{file.name}</span>
                                            <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {errors.attachments && (
                            <p className="text-red-500 text-sm mt-1">{errors.attachments}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex space-x-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting || locationStatus === 'loading'}
                            className="flex-1"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Mengirim...
                                </>
                            ) : (
                                <>
                                    <span className="mr-2">📤</span>
                                    Kirim Laporan
                                </>
                            )}
                        </Button>
                        
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get('/area-reports')}
                            disabled={isSubmitting}
                        >
                            ❌ Batal
                        </Button>
                    </div>
                </form>

                {/* Instructions */}
                <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips Membuat Laporan</h3>
                    <ul className="space-y-2 text-blue-800 text-sm">
                        <li className="flex items-start space-x-2">
                            <span>✓</span>
                            <span>Pastikan deskripsi jelas dan mudah dipahami</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span>✓</span>
                            <span>Sertakan foto atau video sebagai bukti jika memungkinkan</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span>✓</span>
                            <span>Lokasi akan dicatat secara otomatis saat laporan dibuat</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span>✓</span>
                            <span>Laporan akan langsung masuk ke sistem untuk ditindaklanjuti</span>
                        </li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}