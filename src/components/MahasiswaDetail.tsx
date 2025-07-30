// src/components/MahasiswaDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Mahasiswa } from '../types';
import supabase from '../utils/supabase';

function MahasiswaDetail() {
    const { nim } = useParams<{ nim: string }>();
    const navigate = useNavigate();
    const [mahasiswa, setMahasiswa] = useState<Mahasiswa | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!nim) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('Mahasiswa')
                .select('*')
                .eq('NIM', nim)
                .single();

            if (error || !data) {
                console.error('Error or no data found:', error);
                alert('Data mahasiswa tidak ditemukan.');
                navigate('/');
            } else {
                setMahasiswa(data);
            }
            setLoading(false);
        };
        fetchDetail();
    }, [nim, navigate]);

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (!mahasiswa) return null;

    return (
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Detail Mahasiswa</h1>
            <div className="space-y-4">
                <p><strong>NIM:</strong> {mahasiswa.NIM}</p>
                <p><strong>Nama:</strong> {mahasiswa.Name}</p>
                <p><strong>Jenis Kelamin:</strong> {mahasiswa.Gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                <p><strong>Tanggal Lahir:</strong> {new Date(mahasiswa.BirthDate).toLocaleDateString('id-ID')}</p>
                <p><strong>Alamat:</strong> {mahasiswa.Address}</p>
                <p><strong>Kontak:</strong> {mahasiswa.Contact}</p>
                <p><strong>Status:</strong> {mahasiswa.Status ? 'Aktif' : 'Tidak Aktif'}</p>
            </div>
            <div className="mt-8">
                <Link to="/" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                    &larr; Kembali ke Daftar
                </Link>
            </div>
        </div>
    );
}

export default MahasiswaDetail;