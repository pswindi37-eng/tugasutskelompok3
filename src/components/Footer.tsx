import React from 'react';
import { TrendingUp, GraduationCap, Users, Heart } from 'lucide-react';
import { GroupMember } from '../types';

interface FooterProps {
  members: GroupMember[];
  onNavigateTab: (tab: 'beranda' | 'kelompok' | 'materi' | 'kuis' | 'crud') => void;
}

export const Footer: React.FC<FooterProps> = ({ members, onNavigateTab }) => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">Ekonomi Kita</h3>
                <p className="text-xs text-blue-400 font-semibold">Media Pembelajaran Ekonomi SMA</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Platform interaktif materi Masalah Pokok Ekonomi & Sistem Ekonomi dengan simulasi skala prioritas, matriks keputusan produsen, evaluasi kuis 10 soal, serta manajemen data CRUD lengkap.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-amber-300 font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>Belajar Ekonomi, Raih Masa Depan</span>
            </div>
          </div>

          {/* Col 2: Kelompok 3 Credits */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Anggota Kelompok 3 ({members.length} Orang)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              {members.map((m) => (
                <div key={m.id} className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-white block text-[11px] truncate">{m.name}</span>
                  <span className="text-[10px] text-blue-400 font-mono">NIM {m.nim}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Menu Pembelajaran
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('beranda')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('kelompok')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Profil & Kelompok (CRUD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('materi')}
                  className="hover:text-blue-400 transition-colors"
                >
                  3 Materi Pokok & Studi Kasus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('kuis')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Kuis Interaktif 10 Soal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('crud')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Pusat Manajemen Data (CRUD)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 - 2025 Ekonomi Kita • SMA Kelas X / XI (Fase E/F) • Kelompok 3.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Dibuat dengan dedikasi untuk pendidikan Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
