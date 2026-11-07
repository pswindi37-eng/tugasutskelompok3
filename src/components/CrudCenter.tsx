import React, { useState } from 'react';
import { 
  Database, 
  Users, 
  BookOpen, 
  HelpCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { GroupMember, QuizQuestion, StudyCaseNote } from '../types';
import { INITIAL_GROUP_MEMBERS, INITIAL_QUIZ_QUESTIONS, INITIAL_STUDY_CASES } from '../data/initialData';

interface CrudCenterProps {
  members: GroupMember[];
  setMembers: React.Dispatch<React.SetStateAction<GroupMember[]>>;
  studyCases: StudyCaseNote[];
  setStudyCases: React.Dispatch<React.SetStateAction<StudyCaseNote[]>>;
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  onGoToTab: (tab: 'beranda' | 'kelompok' | 'materi' | 'kuis') => void;
}

export const CrudCenter: React.FC<CrudCenterProps> = ({
  members,
  setMembers,
  studyCases,
  setStudyCases,
  questions,
  setQuestions,
  onGoToTab,
}) => {
  const [activeCrudEntity, setActiveCrudEntity] = useState<'members' | 'cases' | 'quiz'>('members');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-blue-950 text-xs font-black mb-3">
              <Database className="w-4 h-4" />
              <span>Pusat Manajemen Data Sistem (CRUD)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Kelola Seluruh Data Aplikasi
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed">
              Modul terpadu untuk melakukan <strong>Create (Tambah)</strong>, <strong>Rename (Ubah Nama / Judul)</strong>, <strong>Update (Perbarui)</strong>, dan <strong>Delete (Hapus)</strong> pada data Anggota Kelompok 3, Bank Catatan Pembelajaran, maupun Soal Kuis Interaktif.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold border border-white/15">
                <span className="text-amber-300 font-mono text-base font-black mr-1.5">{members.length}</span>
                <span>Anggota Kelompok</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold border border-white/15">
                <span className="text-emerald-300 font-mono text-base font-black mr-1.5">{studyCases.length}</span>
                <span>Catatan Kasus</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold border border-white/15">
                <span className="text-sky-300 font-mono text-base font-black mr-1.5">{questions.length}</span>
                <span>Soal Kuis Terpasang</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success toast notification */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Entity Selector Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveCrudEntity('members')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeCrudEntity === 'members'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Anggota Kelompok 3 ({members.length})</span>
          </button>

          <button
            onClick={() => setActiveCrudEntity('cases')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeCrudEntity === 'cases'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Catatan Studi Kasus ({studyCases.length})</span>
          </button>

          <button
            onClick={() => setActiveCrudEntity('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeCrudEntity === 'quiz'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Soal Kuis ({questions.length})</span>
          </button>
        </div>

        {/* TAB 1: MEMBERS CRUD */}
        {activeCrudEntity === 'members' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Daftar Anggota Kelompok 3 (Ekonomi Muda)
                </h3>
                <p className="text-xs text-slate-500">
                  Kamu bisa langsung menambah anggota baru atau membuka menu profil kelompok.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onGoToTab('kelompok')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  <span>Buka Tampilan Kartu Profil</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setMembers(INITIAL_GROUP_MEMBERS);
                    triggerSuccess('Berhasil mereset anggota ke 6 data asli Kelompok 3!');
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Reset Default
                </button>
              </div>
            </div>

            {/* Table of Members */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Nama Anggota</th>
                    <th className="py-3 px-4">NIM</th>
                    <th className="py-3 px-4">Peran / Jabatan</th>
                    <th className="py-3 px-4">Catatan Kontribusi</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map((m, idx) => (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-4 font-extrabold text-slate-900">{m.name}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600">{m.nim}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold">
                          {m.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{m.bio || '-'}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onGoToTab('kelompok')}
                          className="text-xs text-blue-600 font-bold hover:underline"
                        >
                          Ubah / Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CASES CRUD */}
        {activeCrudEntity === 'cases' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Daftar Studi Kasus & Ringkasan Materi
                </h3>
                <p className="text-xs text-slate-500">
                  Data dapat diedit, direname, dan ditambah langsung.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onGoToTab('materi')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20"
                >
                  <span>Buka Tab Catatan Materi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setStudyCases(INITIAL_STUDY_CASES);
                    triggerSuccess('Berhasil mereset daftar catatan studi kasus bawaan!');
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Reset Default
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {studyCases.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                        {c.category}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">{c.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{c.content}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Penulis: {c.author}</span>
                  </div>
                  <button
                    onClick={() => onGoToTab('materi')}
                    className="text-xs font-bold text-indigo-600 hover:underline shrink-0"
                  >
                    Kelola
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUIZ CRUD */}
        {activeCrudEntity === 'quiz' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Bank Soal Kuis Pilihan Ganda ({questions.length} Soal)
                </h3>
                <p className="text-xs text-slate-500">
                  Soal kuis interaktif yang disinkronkan langsung dengan materi.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onGoToTab('kuis')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20"
                >
                  <span>Buka Kuis Interaktif</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setQuestions(INITIAL_QUIZ_QUESTIONS);
                    triggerSuccess('Berhasil mengembalikan 10 Soal Kuis resmi Kelompok 3!');
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Reset 10 Soal Bawaan
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-amber-700 mr-2">Soal {idx + 1}:</span>
                    <span className="text-xs font-bold text-slate-900">{q.question}</span>
                    <p className="text-[11px] text-emerald-700 mt-1 font-semibold">
                      Kunci Jawaban: Pilihan {String.fromCharCode(65 + q.correctAnswer)} ({q.options[q.correctAnswer]})
                    </p>
                  </div>
                  <button
                    onClick={() => onGoToTab('kuis')}
                    className="text-xs font-bold text-amber-600 hover:underline shrink-0"
                  >
                    Edit Soal
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
