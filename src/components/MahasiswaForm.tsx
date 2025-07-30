// src/components/MahasiswaForm.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Mahasiswa } from '../types';
import supabase from '../utils/supabase';

type FormMode = 'add' | 'edit';

function MahasiswaForm() {
  const { nim } = useParams<{ nim?: string }>();
  const navigate = useNavigate();
  const mode: FormMode = nim ? 'edit' : 'add';

  const [formData, setFormData] = useState<Omit<Mahasiswa, 'NIM'> & { NIM?: string }>({
    NIM: '',
    Name: '',
    Gender: 'L',
    BirthDate: '',
    Address: '',
    Contact: '',
    Status: true,
  });

  useEffect(() => {
    if (mode === 'edit' && nim) {
      const fetchMahasiswaDetail = async () => {
        const { data, error } = await supabase
          .from('Mahasiswa')
          .select('*')
          .eq('NIM', nim)
          .single();

        if (error) {
          console.error('Error fetching detail:', error);
          navigate('/');
        } else if (data) {
          setFormData(data);
        }
      };
      fetchMahasiswaDetail();
    }
  }, [mode, nim, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'add') {
      const { error } = await supabase.from('Mahasiswa').insert([
        { ...formData, NIM: formData.NIM! }
      ]);
      if (error) {
        alert('Gagal menambah data: ' + error.message);
      } else {
        alert('Data berhasil ditambahkan!');
        navigate('/');
      }
    } else { // Edit mode
      const { error } = await supabase
        .from('Mahasiswa')
        .update({ ...formData, NIM: undefined }) // Jangan update NIM
        .eq('NIM', nim!);
      if (error) {
        alert('Gagal mengubah data: ' + error.message);
      } else {
        alert('Data berhasil diubah!');
        navigate('/');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{mode === 'add' ? 'Tambah Mahasiswa Baru' : 'Edit Data Mahasiswa'}</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label htmlFor="NIM" className="block mb-2 text-sm font-medium">NIM</label>
          <input type="text" name="NIM" value={formData.NIM} onChange={handleChange} disabled={mode === 'edit'}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-600" required />
        </div>
        <div>
          <label htmlFor="Name" className="block mb-2 text-sm font-medium">Nama Lengkap</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="Gender" className="block mb-2 text-sm font-medium">Jenis Kelamin</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500">
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div>
          <label htmlFor="BirthDate" className="block mb-2 text-sm font-medium">Tanggal Lahir</label>
          <input type="date" name="BirthDate" value={formData.BirthDate} onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="Address" className="block mb-2 text-sm font-medium">Alamat</label>
          <textarea name="Address" value={formData.Address} onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="Contact" className="block mb-2 text-sm font-medium">Kontak</label>
          <input type="text" name="Contact" value={formData.Contact} onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="Status" name="Status" checked={formData.Status} onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"/>
          <label htmlFor="Status" className="ml-2 text-sm font-medium">Status Aktif</label>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate('/')} className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg">Batal</button>
          <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">Simpan</button>
        </div>
      </form>
    </div>
  );
}

export default MahasiswaForm;