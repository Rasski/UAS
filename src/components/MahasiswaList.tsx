// src/components/MahasiswaList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Mahasiswa } from '../types';
import supabase from '../utils/supabase';

function MahasiswaList() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  async function fetchMahasiswa() {
    setLoading(true);
    const { data, error } = await supabase
      .from('Mahasiswa')
      .select('*')
      .order('NIM', { ascending: true });

    if (error) {
      console.error('Error fetching mahasiswa:', error);
    } else if (data) {
      setMahasiswa(data);
    }
    setLoading(false);
  }

  async function handleDelete(nim: string) {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const { error } = await supabase
        .from('Mahasiswa')
        .delete()
        .eq('NIM', nim);

      if (error) {
        alert('Gagal menghapus data: ' + error.message);
      } else {
        alert('Data berhasil dihapus.');
        fetchMahasiswa(); // Refresh list
      }
    }
  }

  if (loading) return <p className="text-center text-lg">Loading data...</p>;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Data Mahasiswa</h1>
        <Link to="/add" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          + Tambah Mahasiswa
        </Link>
      </div>
      <table className="min-w-full bg-gray-800 rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left">NIM</th>
            <th className="py-3 px-4 text-left">Nama</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((m) => (
            <tr key={m.NIM} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="py-3 px-4">{m.NIM}</td>
              <td className="py-3 px-4">{m.Name}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${m.Status ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-200'}`}>
                  {m.Status ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </td>
              <td className="py-3 px-4 text-center space-x-2">
                <Link to={`/detail/${m.NIM}`} className="text-blue-400 hover:text-blue-300">Detail</Link>
                <Link to={`/edit/${m.NIM}`} className="text-yellow-400 hover:text-yellow-300">Edit</Link>
                <button onClick={() => handleDelete(m.NIM)} className="text-red-500 hover:text-red-400">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MahasiswaList;