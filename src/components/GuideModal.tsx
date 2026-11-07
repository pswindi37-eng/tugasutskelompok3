import React from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  Database, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Sliders,
  Award
} from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'beranda' | 'kelompok' | 'materi' | 'kuis' | 'crud') => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, onNavigateTab }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Panduan Media Pembelajaran
            </h3>
            <p className="text-xs text-blue-600 font-semibold">
              Ekonomi Kita • Kelompok 3 (Ekonomi Muda) SMA
            </p>
          </div>
        </div>

        {/* Guide Steps */}
        <div className="space-y-4">
          
          {/* Step 1: Eksplorasi Materi */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <h4 className="text-sm font-extrabold text-blue-950 flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs flex items-center justify-center">1</span>
              Pelajari 3 Topik Pokok Ekonomi
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Buka menu <strong>Materi Ekonomi</strong> untuk membaca konsep mendasar:
            </p>
            <ul className="mt-2 text-xs text-slate-700 space-y-1 pl-4 list-disc">
              <li><strong>Kelangkaan (Scarcity) & Kebutuhan:</strong> Kebutuhan tanpa batas vs alat pemuas terbatas.</li>
              <li><strong>Tiga Masalah Pokok Modern:</strong> What, How, dan For Whom.</li>
              <li><strong>Sistem Ekonomi Dunia:</strong> Tradisional, Komando, Pasar Bebas, dan Campuran (Pancasila).</li>
            </ul>
          </div>

          {/* Step 2: Simulasi Interaktif */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <h4 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center">2</span>
              Praktikum & Simulasi Interaktif
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Uji pemahamanmu pada simulator yang terintegrasi:
            </p>
            <ul className="mt-2 text-xs text-slate-700 space-y-1 pl-4 list-disc">
              <li><strong>Laboratorium Skala Prioritas:</strong> Alokasikan anggaran Rp 1.000.000 untuk kebutuhan Primer, Sekunder, dan Tersier.</li>
              <li><strong>Matriks Keputusan Produsen:</strong> Analisis strategi UMKM Sepatu, Bakery Sehat, dan Solar Panel.</li>
            </ul>
          </div>

          {/* Step 3: Kuis 10 Soal & Sertifikat */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <h4 className="text-sm font-extrabold text-amber-950 flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-white text-xs flex items-center justify-center">3</span>
              Pengerjaan Kuis & Unduh Sertifikat
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jawab 10 soal pilihan ganda resmi. Sistem akan menghitung skor otomatis (0 - 100), memberikan pembahasan tiap nomor, dan kamu dapat mencetak Sertifikat Kelulusan atas namamu!
            </p>
          </div>

          {/* Step 4: Fitur CRUD (Create, Rename, Delete, Update) */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
            <h4 className="text-sm font-extrabold text-indigo-950 flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center">4</span>
              Fitur Lengkap CRUD (Kelola Data)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Website ini dilengkapi fungsi <strong>Create, Rename, Delete, dan Update</strong>:
            </p>
            <ul className="mt-2 text-xs text-slate-700 space-y-1 pl-4 list-disc">
              <li><strong>Data Anggota:</strong> Tambah anggota baru, ubah/rename nama & NIM, update peran, hapus anggota, atau reset ke 6 anggota asli Kelompok 3.</li>
              <li><strong>Catatan Studi Kasus:</strong> Tambah catatan materi baru, edit judul/konten, dan hapus.</li>
              <li><strong>Bank Soal Kuis:</strong> Tambah pertanyaan baru, rename soal, ubah opsi/kunci jawaban, dan hapus soal.</li>
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-500">
            Dibuat dengan bangga oleh Kelompok 3
          </span>
          <button
            onClick={() => {
              onClose();
              onNavigateTab('materi');
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20"
          >
            Mulai Belajar Sekarang →
          </button>
        </div>

      </div>
    </div>
  );
};
