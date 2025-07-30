// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MahasiswaList from './components/MahasiswaList';
import MahasiswaForm from './components/MahasiswaForm';
import MahasiswaDetail from './components/MahasiswaDetail';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0 text-white font-bold text-xl">
                Sistem Manajemen Mahasiswa
              </div>
            </div>
          </div>
        </nav>
        <main>
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<MahasiswaList />} />
              <Route path="/add" element={<MahasiswaForm />} />
              <Route path="/edit/:nim" element={<MahasiswaForm />} />
              <Route path="/detail/:nim" element={<MahasiswaDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;