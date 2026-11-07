import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Globe2, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  Factory, 
  ShoppingBag, 
  Coins, 
  ArrowRight, 
  Compass, 
  Plus, 
  Edit3, 
  Trash2, 
  FileText, 
  Check, 
  X,
  Lightbulb
} from 'lucide-react';
import { StudyCaseNote, PriorityItem } from '../types';
import { INITIAL_PRIORITY_ITEMS } from '../data/initialData';

interface MateriSectionProps {
  studyCases: StudyCaseNote[];
  setStudyCases: React.Dispatch<React.SetStateAction<StudyCaseNote[]>>;
  onGoToQuiz: () => void;
}

export const MateriSection: React.FC<MateriSectionProps> = ({
  studyCases,
  setStudyCases,
  onGoToQuiz,
}) => {
  const [activeMateriTab, setActiveMateriTab] = useState<'materi1' | 'materi2' | 'materi3' | 'catatan'>('materi1');

  // Interactive Simulator 1: Skala Prioritas
  const [priorityItems, setPriorityItems] = useState<PriorityItem[]>(INITIAL_PRIORITY_ITEMS);
  const maxBudget = 1000000; // Rp 1.000.000

  // Interactive Simulator 2: 3 Masalah Modern Matrix
  const [selectedCaseProducer, setSelectedCaseProducer] = useState<'roti' | 'sepatu' | 'solar'>('sepatu');

  // Interactive Simulator 3: Filter Sistem Ekonomi
  const [selectedSystem, setSelectedSystem] = useState<'semua' | 'tradisional' | 'komando' | 'pasar' | 'campuran'>('semua');

  // CRUD State for Catatan Studi Kasus
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<StudyCaseNote | null>(null);
  const [noteFormData, setNoteFormData] = useState({
    title: '',
    category: 'Kelangkaan' as 'Kelangkaan' | 'Masalah Modern' | 'Sistem Ekonomi' | 'Umum',
    author: 'Siswa / Kelompok 3',
    content: '',
    tagString: 'Ekonomi, Kasus',
  });

  // Calculate Budget Simulation
  const totalSpent = priorityItems.filter((i) => i.selected).reduce((acc, curr) => acc + curr.cost, 0);
  const budgetRemaining = maxBudget - totalSpent;
  const primerCount = priorityItems.filter((i) => i.category === 'Primer' && i.selected).length;
  const primerTotal = priorityItems.filter((i) => i.category === 'Primer').length;

  const togglePriorityItem = (id: string) => {
    setPriorityItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  // CRUD Actions for Study Case Notes
  const handleOpenAddNote = () => {
    setNoteFormData({
      title: '',
      category: 'Kelangkaan',
      author: 'Siswa SMA',
      content: '',
      tagString: 'Prioritas, Contoh Kasus',
    });
    setIsAddNoteModalOpen(true);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteFormData.title.trim() || !noteFormData.content.trim()) return;

    const newNote: StudyCaseNote = {
      id: `case-${Date.now()}`,
      title: noteFormData.title.trim(),
      category: noteFormData.category,
      author: noteFormData.author.trim() || 'Siswa',
      content: noteFormData.content.trim(),
      tags: noteFormData.tagString.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toLocaleString('id-ID'),
      updatedAt: new Date().toLocaleString('id-ID'),
    };

    setStudyCases((prev) => [newNote, ...prev]);
    setIsAddNoteModalOpen(false);
  };

  const handleOpenEditNote = (note: StudyCaseNote) => {
    setEditingNote(note);
    setNoteFormData({
      title: note.title,
      category: note.category,
      author: note.author,
      content: note.content,
      tagString: note.tags.join(', '),
    });
  };

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote || !noteFormData.title.trim() || !noteFormData.content.trim()) return;

    setStudyCases((prev) =>
      prev.map((n) =>
        n.id === editingNote.id
          ? {
              ...n,
              title: noteFormData.title.trim(),
              category: noteFormData.category,
              author: noteFormData.author.trim(),
              content: noteFormData.content.trim(),
              tags: noteFormData.tagString.split(',').map((t) => t.trim()).filter(Boolean),
              updatedAt: new Date().toLocaleString('id-ID'),
            }
          : n
      )
    );
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Hapus catatan studi kasus ini?')) {
      setStudyCases((prev) => prev.filter((n) => n.id !== id));
    }
  };

  // Modern Producer Scenarios
  const producerScenarios = {
    sepatu: {
      name: 'UMKM Sepatu Sneaker Lokal',
      sector: 'Manufaktur Ritel Kreatif',
      what: 'Memproduksi sepatu sneaker kanvas kasual berbahan kain daur ulang ramah lingkungan, bukan sepatu pesta kulit berbiaya tinggi.',
      how: 'Kombinasi mesin potong laser komputer untuk presisi pola dan penjahitan manual oleh pengrajin lokal untuk menjaga mutu dan efisiensi ongkos.',
      forWhom: 'Pelajar SMA, mahasiswa, dan generasi muda berdaya beli menengah dengan preferensi gaya kasual dan peduli kelestarian lingkungan.',
      insight: 'Keputusan ini menyeimbangkan efisiensi biaya (How) dengan target pasar yang memiliki volume permintaan tinggi (What & For Whom).',
    },
    roti: {
      name: 'Usaha Bakery Roti Sehat Rumahan',
      sector: 'Kuliner & Pangan Sehat',
      what: 'Memproduksi roti gandum bebas gula dan gluten-free yang kaya serat, bukan roti manis tinggi pengawet.',
      how: 'Memanfaatkan oven listrik hemat energi dan bahan baku tepung lokal berkualitas tinggi secara batch harian agar selalu segar tanpa sisa.',
      forWhom: 'Masyarakat perkotaan yang peduli pola hidup sehat, penderita diabetes, dan keluarga modern.',
      insight: 'Fokus pada nilai tambah dan diferensiasi gizi menjawab pertanyaan What dan For Whom secara spesifik.',
    },
    solar: {
      name: 'Startup Solusi Panel Surya Pedesaan',
      sector: 'Energi Bersih & Teknologi',
      what: 'Menyediakan perangkat mini panel surya portabel mandiri untuk penerangan dan pengisian daya ponsel.',
      how: 'Merakit komponen inverter efisien dengan sistem modular sederhana sehingga mudah dirawat oleh warga desa setempat.',
      forWhom: 'Masyarakat di daerah terpencil atau nelayan pesisir yang belum terjangkau jaringan listrik PLN secara stabil.',
      insight: 'Menggabungkan teknologi tepat guna dengan kebutuhan riil masyarakat yang belum terlayani.',
    },
  };

  // Economic Systems Data
  const economicSystems = [
    {
      id: 'tradisional',
      title: 'A. Sistem Ekonomi Tradisional',
      badge: 'Adat & Leluhur',
      bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      ciri: 'Kegiatan ekonomi dilakukan secara turun-temurun, mengandalkan adat istiadat, teknik produksi masih sangat sederhana, belum mengenal pembagian kerja yang rumit, dan umumnya berbasis agraris/maritim murni.',
      kelebihan: 'Tidak ada eksploitasi berlebihan terhadap alam; hubungan kekeluargaan sangat erat; tidak ada persaingan tidak sehat.',
      kelemahan: 'Produktivitas sangat rendah; sulit berkembang karena menolak inovasi teknologi baru; taraf hidup masyarakat lambat meningkat.',
      contoh: 'Masyarakat suku pedalaman Baduy Luar/Dalam (Banten), masyarakat tradisional Inuit, suku Yanomami di Amazon.',
    },
    {
      id: 'komando',
      title: 'B. Sistem Ekonomi Komando / Terpusat (Sosialis)',
      badge: 'Kendali Pemerintah Penuh',
      bgColor: 'bg-rose-50 border-rose-200 text-rose-900',
      ciri: 'Seluruh sumber daya dan alat produksi dikuasai dan dikendalikan penuh oleh pemerintah. Kebebasan individu atau swasta dalam berusaha tidak ada atau sangat dibatasi.',
      kelebihan: 'Pemerintah mudah mengontrol inflasi dan distribusi; kesenjangan pendapatan relatif rendah; jarang terjadi krisis pengangguran massal.',
      kelemahan: 'Mematikan kreativitas dan inisiatif individu; hak milik pribadi tidak diakui; rawan timbul inefisiensi birokrasi dan pasar gelap.',
      contoh: 'Korea Utara, bekas Uni Soviet, Kuba masa lalu.',
    },
    {
      id: 'pasar',
      title: 'C. Sistem Ekonomi Pasar Bebas / Liberal (Kapitalis)',
      badge: 'Mekanisme Pasar & Modal',
      bgColor: 'bg-amber-50 border-amber-200 text-amber-900',
      ciri: 'Seluruh kegiatan ekonomi diserahkan sepenuhnya kepada mekanisme pasar (interaksi antara permintaan dan penawaran). Kepemilikan modal dan alat produksi berada di tangan swasta/masyarakat. Pemerintah tidak ikut campur dalam penentuan harga.',
      kelebihan: 'Inovasi dan teknologi berkembang sangat cepat; persaingan mendorong efisiensi tinggi; kebebasan berusaha maksimal.',
      kelemahan: 'Muncul praktik monopoli dan oligopoli; kesenjangan sosial/ekonomi sangat tajam; eksploitasi pekerja dan sumber daya alam.',
      contoh: 'Amerika Serikat, Britania Raya, Hong Kong, Singapura (dengan berbagai regulasi modern).',
    },
    {
      id: 'campuran',
      title: 'D. Sistem Ekonomi Campuran (Termasuk Sistem Ekonomi Pancasila)',
      badge: 'Sinergi Pemerintah & Swasta',
      bgColor: 'bg-blue-50 border-blue-200 text-blue-900',
      ciri: 'Merupakan gabungan antara sistem komando dan sistem pasar. Pemerintah bersama pihak swasta sama-sama berperan aktif dalam menggerakkan roda perekonomian. (Contoh nyata: Indonesia dengan Sistem Ekonomi Pancasila).',
      kelebihan: 'Mencegah monopoli liar lewat regulasi; sektor penting bagi hajat hidup orang banyak dijamin negara; kebebasan individu tetap diakui.',
      kelemahan: 'Beban pemerintah cukup berat jika BUMN tidak dikelola profesional; koordinasi kebijakan fiskal dan moneter membutuhkan kehati-hatian.',
      contoh: 'Indonesia (Pasal 33 UUD 1945), Malaysia, Prancis, Jerman (Sosial Pasar).',
    },
  ];

  const filteredSystems = selectedSystem === 'semua'
    ? economicSystems
    : economicSystems.filter((s) => s.id === selectedSystem);

  return (
    <section id="materi-ekonomi" className="py-8 sm:py-12 bg-slate-50/60 border-t border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Kurikulum Merdeka • Ekonomi Fase E/F</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Masalah Pokok Ekonomi & Sistem Ekonomi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Pelajari 3 modul utama dilengkapi simulasi interaktif, studi kasus aplikatif, dan bank catatan belajar.
          </p>

          {/* Materi Tabs Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveMateriTab('materi1')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMateriTab === 'materi1'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              1. Kelangkaan & Prioritas
            </button>
            <button
              onClick={() => setActiveMateriTab('materi2')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMateriTab === 'materi2'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              2. Tiga Masalah Pokok Modern
            </button>
            <button
              onClick={() => setActiveMateriTab('materi3')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMateriTab === 'materi3'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              3. Macam Sistem Ekonomi
            </button>
            <button
              onClick={() => setActiveMateriTab('catatan')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeMateriTab === 'catatan'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Catatan Studi Kasus (CRUD)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Kelangkaan & Kebutuhan Manusia */}
        {activeMateriTab === 'materi1' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Core Text Content verbatim from user prompt */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                  01
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Kelangkaan (Scarcity) dan Kebutuhan Manusia
                  </h3>
                  <p className="text-xs text-slate-500">Fondasi utama ilmu ekonomi dalam kehidupan nyata</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Point 1 */}
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/80 hover:bg-blue-50 transition-colors">
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950 flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    Kebutuhan Manusia yang Tak Terbatas
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Manusia memiliki kebutuhan (sandang, pangan, papan, pendidikan, hiburan, dll) yang sifatnya tidak pernah habis. Setelah satu kebutuhan terpenuhi, kebutuhan lain akan muncul.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100/80 hover:bg-amber-50 transition-colors">
                  <h4 className="font-extrabold text-sm sm:text-base text-amber-950 flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Alat Pemuas Kebutuhan yang Terbatas
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sumber daya alam, tenaga kerja, modal, dan keterampilan yang tersedia di bumi memiliki keterbatasan dalam jumlah maupun kapasitas pemenuhannya.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100/80 hover:bg-rose-50 transition-colors">
                  <h4 className="font-extrabold text-sm sm:text-base text-rose-950 flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    Inti Masalah Ekonomi
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ketidakseimbangan antara kebutuhan manusia yang tidak terbatas dengan alat pemuas kebutuhan yang terbatas disebut <strong>kelangkaan (scarcity)</strong>.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 hover:bg-emerald-50 transition-colors">
                  <h4 className="font-extrabold text-sm sm:text-base text-emerald-950 flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Skala Prioritas
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Karena sumber daya terbatas, manusia harus menyusun daftar kebutuhan berdasarkan tingkat kepentingannya (mendesak hingga kurang mendesak) agar sumber daya yang ada tidak sia-sia.
                  </p>
                </div>

              </div>
            </div>

            {/* Interactive Sandbox: Simulasi Skala Prioritas Uang Saku */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-blue-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Simulasi Interaktif Praktikum</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Laboratorium Skala Prioritas & Anggaran Terbatas
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kamu memiliki anggaran saku bulanan terbatas <strong>Rp 1.000.000</strong>. Pilih alokasi kebutuhan di bawah ini!
                  </p>
                </div>

                {/* Live Budget Counter */}
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Sisa Anggaran</span>
                    <p className={`text-base font-black font-mono ${budgetRemaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      Rp {budgetRemaining.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Kebutuhan Primer</span>
                    <p className="text-xs font-bold text-slate-800">
                      {primerCount} / {primerTotal} Terpenuhi
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              {budgetRemaining < 0 ? (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>
                    <strong>Terjadi Defisit Anggaran!</strong> Pengeluaran melebihi alat pemuas yang tersedia (Rp {Math.abs(budgetRemaining).toLocaleString('id-ID')}). Kurangi barang tersier/sekunder untuk mengembalikan rasionalitas ekonomi.
                  </span>
                </div>
              ) : primerCount < primerTotal ? (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>
                    <strong>Peringatan Skala Prioritas:</strong> Masih ada kebutuhan Primer yang belum kamu penuhi. Sesuai prinsip ekonomi, dahulukan kebutuhan pokok sebelum sekunder & tersier!
                  </span>
                </div>
              ) : (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Keputusan Rasional Optimal!</strong> Seluruh kebutuhan primer terpenuhi dan anggaran tetap seimbang (surplus Rp {budgetRemaining.toLocaleString('id-ID')}).
                  </span>
                </div>
              )}

              {/* Priority Items Checklist */}
              <div className="space-y-3">
                {priorityItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePriorityItem(item.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      item.selected
                        ? 'bg-blue-50/70 border-blue-400 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${
                          item.selected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {item.selected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              item.category === 'Primer'
                                ? 'bg-red-100 text-red-700'
                                : item.category === 'Sekunder'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 font-mono">
                        Rp {item.cost.toLocaleString('id-ID')}
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        {item.urgency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Klik item untuk memilih atau membatalkan pilihan.</span>
                <button
                  onClick={() => setPriorityItems(INITIAL_PRIORITY_ITEMS)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Reset Simulasi
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Tiga Masalah Pokok Ekonomi Modern */}
        {activeMateriTab === 'materi2' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Core Text Content verbatim from user prompt */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                  02
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Tiga Masalah Pokok Ekonomi Modern
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tiga pertanyaan mendasar yang harus dijawab oleh setiap produsen atau negara
                  </p>
                </div>
              </div>

              {/* 3 Modern Pillars: What, How, For Whom */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. What */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/80 to-white border border-blue-200/80 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg mb-4 shadow-md shadow-blue-500/20">
                      1
                    </div>
                    <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                      Jenis & Jumlah Barang
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1 mb-2">
                      Barang Apa yang Akan Diproduksi (What)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Menentukan jenis barang atau jasa apa saja yang paling dibutuhkan oleh masyarakat untuk diproduksi terlebih dahulu, serta berapa banyak jumlah kuantitas yang harus dibuat.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-100 text-[11px] font-semibold text-blue-800">
                    Contoh: Seragam sekolah vs Baju pesta mewah saat tahun ajaran baru.
                  </div>
                </div>

                {/* 2. How */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-50/80 to-white border border-amber-200/80 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg mb-4 shadow-md shadow-amber-500/20">
                      2
                    </div>
                    <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
                      Metode & Efisiensi
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1 mb-2">
                      Bagaimana Cara Memproduksi (How)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Menentukan metode, teknik, dan kombinasi sumber daya serta teknologi yang paling efisien agar biaya produksi serendah mungkin namun kualitas tetap terjaga (padat karya vs padat modal).
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-100 text-[11px] font-semibold text-amber-800">
                    Contoh: Penggunaan robot otomasi vs pengrajin tangan terampil.
                  </div>
                </div>

                {/* 3. For Whom */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-50/80 to-white border border-indigo-200/80 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg mb-4 shadow-md shadow-indigo-500/20">
                      3
                    </div>
                    <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
                      Distribusi & Target Pasar
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1 mb-2">
                      Untuk Siapa Barang Diproduksi (For Whom)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Menentukan siapa target konsumen atau kelompok masyarakat yang akan menikmati dan memanfaatkan hasil produksi tersebut, serta bagaimana saluran distribusinya agar tepat sasaran.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-100 text-[11px] font-semibold text-indigo-800">
                    Contoh: Masyarakat berdaya beli tinggi, menengah, atau berpenghasilan rendah.
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Decision Matrix */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-blue-100">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1">
                  <Factory className="w-3.5 h-3.5" />
                  <span>Matriks Pengambilan Keputusan Nyata</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Simulasi Keputusan Produsen Modern
                </h3>
                <p className="text-xs text-slate-500">
                  Pilih salah satu studi kasus produsen untuk melihat bagaimana mereka memecahkan What, How, dan For Whom:
                </p>
              </div>

              {/* Selector buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedCaseProducer('sepatu')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCaseProducer === 'sepatu'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  👟 UMKM Sepatu Sneaker Lokal
                </button>
                <button
                  onClick={() => setSelectedCaseProducer('roti')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCaseProducer === 'roti'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🍞 Bakery Roti Sehat Bebas Gluten
                </button>
                <button
                  onClick={() => setSelectedCaseProducer('solar')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCaseProducer === 'solar'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  ☀️ Solar Panel Modular Pedesaan
                </button>
              </div>

              {/* Active Matrix View */}
              {(() => {
                const item = producerScenarios[selectedCaseProducer];
                return (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900">{item.name}</h4>
                        <span className="text-xs font-semibold text-blue-600">{item.sector}</span>
                      </div>
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-700 border border-slate-200 shadow-sm">
                        Studi Kasus Nyata
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <span className="text-[11px] font-bold text-blue-600 uppercase block mb-1">
                          1. WHAT (Barang Apa)
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">{item.what}</p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                        <span className="text-[11px] font-bold text-amber-600 uppercase block mb-1">
                          2. HOW (Bagaimana Memproduksi)
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">{item.how}</p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                        <span className="text-[11px] font-bold text-indigo-600 uppercase block mb-1">
                          3. FOR WHOM (Untuk Siapa)
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">{item.forWhom}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-100/50 rounded-xl text-xs text-blue-900 font-medium">
                      💡 <strong>Kesimpulan Analisis:</strong> {item.insight}
                    </div>
                  </div>
                );
              })()}

            </div>

          </div>
        )}

        {/* TAB 3: Macam-Macam Sistem Ekonomi di Dunia */}
        {activeMateriTab === 'materi3' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Core Text Content verbatim from user prompt */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                  03
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Macam-Macam Sistem Ekonomi di Dunia
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cara dan aturan yang digunakan suatu negara untuk mengatur seluruh kegiatan perekonomiannya
                  </p>
                </div>
              </div>

              {/* Filter Tabs for 4 Systems */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedSystem('semua')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSystem === 'semua' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua Sistem (4)
                </button>
                <button
                  onClick={() => setSelectedSystem('tradisional')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSystem === 'tradisional' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  A. Tradisional
                </button>
                <button
                  onClick={() => setSelectedSystem('komando')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSystem === 'komando' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  B. Komando (Sosialis)
                </button>
                <button
                  onClick={() => setSelectedSystem('pasar')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSystem === 'pasar' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  C. Pasar Bebas (Liberal)
                </button>
                <button
                  onClick={() => setSelectedSystem('campuran')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSystem === 'campuran' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  D. Campuran (Pancasila)
                </button>
              </div>

              {/* Cards for each system */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSystems.map((sys) => (
                  <div
                    key={sys.id}
                    className={`p-6 rounded-3xl border transition-all ${sys.bgColor} flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 bg-white/80 rounded-lg shadow-sm">
                          {sys.badge}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-black text-slate-900 mb-2">
                        {sys.title}
                      </h4>

                      {/* Ciri-ciri verbatim */}
                      <div className="mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-slate-800">
                          Ciri-ciri Utama:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-black/5">
                          {sys.ciri}
                        </p>
                      </div>

                      {/* Kelebihan & Kelemahan */}
                      <div className="space-y-2 text-xs">
                        <p className="text-slate-800">
                          <strong className="text-emerald-700">Kelebihan:</strong> {sys.kelebihan}
                        </p>
                        <p className="text-slate-800">
                          <strong className="text-rose-700">Kelemahan:</strong> {sys.kelemahan}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/5 text-[11px] text-slate-600">
                      <strong>Contoh Penerapan:</strong> {sys.contoh}
                    </div>
                  </div>
                ))}
              </div>

              {/* Spotlight: Sistem Ekonomi Pancasila (Indonesia) */}
              <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-black text-xl shrink-0">
                    ID
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Fokus Khusus Indonesia
                    </span>
                    <h4 className="text-lg font-extrabold text-white mt-0.5 mb-1">
                      Sistem Ekonomi Pancasila (Pasal 33 UUD 1945)
                    </h4>
                    <p className="text-xs text-blue-100 leading-relaxed">
                      Indonesia menganut Sistem Ekonomi Campuran yang berakar pada kekeluargaan dan gotong royong. Cabang-cabang produksi yang penting bagi negara dan menguasai hajat hidup orang banyak dikuasai oleh negara (BUMN seperti PLN, Pertamina), sedangkan sektor lainnya diserahkan kepada koperasi dan swasta untuk berkompetisi secara sehat.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: Catatan & Studi Kasus CRUD */}
        {activeMateriTab === 'catatan' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Header Toolbar */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Fitur CRUD Materi & Catatan</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Bank Studi Kasus & Catatan Pembelajaran
                </h3>
                <p className="text-xs text-slate-500">
                  Tambah, ubah judul/isi (Rename & Update), serta hapus catatan analisis ekonomi siswa.
                </p>
              </div>

              <button
                onClick={handleOpenAddNote}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Kasus / Catatan (Create)</span>
              </button>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyCases.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {note.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {note.updatedAt}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 leading-snug mb-2">
                      {note.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                      {note.content}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {note.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium truncate max-w-[150px]">
                      Oleh: {note.author}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditNote(note)}
                        title="Edit / Rename Catatan"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        title="Hapus Catatan"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {studyCases.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h4 className="font-bold text-slate-700 text-sm">Belum ada catatan studi kasus</h4>
                <p className="text-xs text-slate-500 mt-1">Klik tombol di atas untuk membuat catatan baru.</p>
              </div>
            )}

          </div>
        )}

        {/* CTA to Quiz */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Sudah Menguasai Seluruh Materi?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Uji pemahamanmu dengan mengerjakan 10 Soal Kuis Interaktif lengkap dengan pembahasan mendalam!
              </p>
            </div>
          </div>
          <button
            onClick={onGoToQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-blue-950 font-black text-sm shadow-md hover:scale-105 transition-all shrink-0"
          >
            <span>Mulai Kuis 10 Soal Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* CREATE NOTE MODAL */}
      {isAddNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-100 relative">
            <button
              onClick={() => setIsAddNoteModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              Tambah Catatan Studi Kasus Baru
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Buat ringkasan atau analisis kasus ekonomi baru (CREATE)
            </p>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Studi Kasus / Catatan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Analisis Kenaikan Harga Cabai Saat Cuaca Ekstrem"
                  value={noteFormData.title}
                  onChange={(e) => setNoteFormData({ ...noteFormData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Materi
                  </label>
                  <select
                    value={noteFormData.category}
                    onChange={(e) => setNoteFormData({ ...noteFormData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  >
                    <option value="Kelangkaan">1. Kelangkaan</option>
                    <option value="Masalah Modern">2. Masalah Modern</option>
                    <option value="Sistem Ekonomi">3. Sistem Ekonomi</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Penulis / Kelompok
                  </label>
                  <input
                    type="text"
                    value={noteFormData.author}
                    onChange={(e) => setNoteFormData({ ...noteFormData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Uraian / Isi Catatan *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Jelaskan fenomena kelangkaan, keputusan what/how/for whom, atau sistem ekonomi yang terjadi..."
                  value={noteFormData.content}
                  onChange={(e) => setNoteFormData({ ...noteFormData, content: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tag / Kata Kunci (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Inflasi, Pasar, Pertanian"
                  value={noteFormData.tagString}
                  onChange={(e) => setNoteFormData({ ...noteFormData, tagString: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddNoteModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 border border-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / RENAME NOTE MODAL */}
      {editingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-100 relative">
            <button
              onClick={() => setEditingNote(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              Edit / Rename Catatan Studi Kasus
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Perbarui judul atau isi studi kasus ekonomi (UPDATE / RENAME)
            </p>

            <form onSubmit={handleUpdateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Studi Kasus (Rename) *
                </label>
                <input
                  type="text"
                  required
                  value={noteFormData.title}
                  onChange={(e) => setNoteFormData({ ...noteFormData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Materi
                  </label>
                  <select
                    value={noteFormData.category}
                    onChange={(e) => setNoteFormData({ ...noteFormData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  >
                    <option value="Kelangkaan">1. Kelangkaan</option>
                    <option value="Masalah Modern">2. Masalah Modern</option>
                    <option value="Sistem Ekonomi">3. Sistem Ekonomi</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Penulis
                  </label>
                  <input
                    type="text"
                    value={noteFormData.author}
                    onChange={(e) => setNoteFormData({ ...noteFormData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Uraian Isi Catatan *
                </label>
                <textarea
                  rows={4}
                  required
                  value={noteFormData.content}
                  onChange={(e) => setNoteFormData({ ...noteFormData, content: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tag / Kata Kunci
                </label>
                <input
                  type="text"
                  value={noteFormData.tagString}
                  onChange={(e) => setNoteFormData({ ...noteFormData, tagString: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 border border-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20"
                >
                  Perbarui Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
