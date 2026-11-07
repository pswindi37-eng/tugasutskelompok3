import { GroupMember, QuizQuestion, StudyCaseNote, NotificationItem, PriorityItem } from '../types';

export const INITIAL_GROUP_MEMBERS: GroupMember[] = [
  {
    id: 'mem-1',
    name: 'ALFIAN ALIKA SURYA',
    nim: '2602293',
    role: 'Ketua Kelompok',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alfian&backgroundColor=b6e3f4,c0aede',
    bio: 'Mengkoordinasi seluruh perancangan media pembelajaran interaktif dan penyusunan struktur materi ekonomi.',
    order: 1,
  },
  {
    id: 'mem-2',
    name: 'ANASTASYA PUTRI',
    nim: '2602154',
    role: 'Wakil Ketua',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Anastasya&backgroundColor=ffd5dc,ffdfbf',
    bio: 'Bertanggung jawab dalam perumusan materi kelangkaan dan integrasi modul kuis interaktif.',
    order: 2,
  },
  {
    id: 'mem-3',
    name: 'DAFIT NURI ARFANDI',
    nim: '2602286',
    role: 'Sekretaris',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Dafit&backgroundColor=d1d4f9,c0aede',
    bio: 'Menyusun dokumentasi ilmiah materi 3 masalah pokok modern dan administrasi laporan.',
    order: 3,
  },
  {
    id: 'mem-4',
    name: 'GALANG PERMANA P.R.',
    nim: '2602019',
    role: 'Bendahara',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Galang&backgroundColor=b6e3f4,d1d4f9',
    bio: 'Mengelola anggaran simulasi skala prioritas dan analisis komparasi sistem ekonomi dunia.',
    order: 4,
  },
  {
    id: 'mem-5',
    name: 'LAELIE RAHMADANI',
    nim: '2602245',
    role: 'Divisi Riset & Materi',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Laelie&backgroundColor=ffd5dc,b6e3f4',
    bio: 'Melakukan verifikasi bank soal kuis, kunci jawaban, serta pembahasan komprehensif.',
    order: 5,
  },
  {
    id: 'mem-6',
    name: 'WINDI PURNAMASARI',
    nim: '2602128',
    role: 'Divisi Media & Kreatif',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Windi&backgroundColor=ffdfbf,ffd5dc',
    bio: 'Merancang tata letak antarmuka grafis, visualisasi kurva, dan interaktivitas website.',
    order: 6,
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    materiNumber: 1,
    materiTag: 'Materi 1: Kelangkaan & Kebutuhan Manusia',
    question: 'Inti dari seluruh permasalahan ekonomi yang dihadapi oleh umat manusia di dunia adalah ...',
    options: [
      'Tingginya angka pengangguran dan inflasi',
      'Kebutuhan manusia tidak terbatas, sedangkan alat pemuas kebutuhan terbatas',
      'Kebijakan pemerintah yang tidak adil dalam perpajakan',
      'Kurangnya jumlah uang yang beredar di masyarakat',
    ],
    correctAnswer: 1, // B
    explanation: 'Kelangkaan terjadi karena sumber daya yang tersedia terbatas, sementara kebutuhan manusia terus bertambah tanpa batas.',
  },
  {
    id: 'q-2',
    materiNumber: 1,
    materiTag: 'Materi 1: Kelangkaan & Kebutuhan Manusia',
    question: 'Langkah rasional yang harus diambil seseorang ketika dihadapkan pada keterbatasan sumber daya adalah ...',
    options: [
      'Membeli semua barang yang diinginkan sekaligus',
      'Menyusun skala prioritas kebutuhan yang paling mendesak',
      'Menunggu bantuan dari pemerintah',
      'Menghentikan seluruh kegiatan konsumsi',
    ],
    correctAnswer: 1, // B
    explanation: 'Skala prioritas membantu mengalokasikan sumber daya yang terbatas untuk kebutuhan yang paling penting terlebih dahulu.',
  },
  {
    id: 'q-3',
    materiNumber: 2,
    materiTag: 'Materi 2: Tiga Masalah Pokok Ekonomi Modern',
    question: 'Seorang produsen pakaian harus memutuskan apakah ia akan memproduksi seragam sekolah atau pakaian pesta mewah. Dalam masalah pokok ekonomi modern, keputusan ini berkaitan dengan pertanyaan ...',
    options: [
      'How (Bagaimana cara memproduksi)',
      'For Whom (Untuk siapa diproduksi)',
      'What (Barang apa yang akan diproduksi)',
      'Where (Di mana tempat produksi)',
    ],
    correctAnswer: 2, // C
    explanation: 'Pertanyaan What berfokus pada penentuan jenis barang/jasa apa yang akan dibuat sesuai kebutuhan pasar.',
  },
  {
    id: 'q-4',
    materiNumber: 2,
    materiTag: 'Materi 2: Tiga Masalah Pokok Ekonomi Modern',
    question: 'Pertanyaan mengenai teknik produksi, penggunaan mesin modern atau tenaga manual, serta efisiensi biaya dalam proses pembuatan barang merupakan cakupan dari masalah pokok ekonomi modern yaitu ...',
    options: [
      'What',
      'How',
      'For Whom',
      'Why',
    ],
    correctAnswer: 1, // B
    explanation: 'Masalah How membahas cara dan metode paling efisien yang digunakan dalam proses produksi.',
  },
  {
    id: 'q-5',
    materiNumber: 2,
    materiTag: 'Materi 2: Tiga Masalah Pokok Ekonomi Modern',
    question: 'Distribusi hasil produksi agar tepat sasaran kepada masyarakat yang memiliki daya beli dan membutuhkan barang tersebut berkaitan erat dengan masalah pokok ekonomi modern berupa ...',
    options: [
      'What',
      'How',
      'For Whom',
      'When',
    ],
    correctAnswer: 2, // C
    explanation: 'Masalah For Whom menjawab untuk siapa barang tersebut dibuat dan siapa yang berhak menikmatinya.',
  },
  {
    id: 'q-6',
    materiNumber: 3,
    materiTag: 'Materi 3: Macam-Macam Sistem Ekonomi di Dunia',
    question: 'Ciri khas utama yang membedakan sistem ekonomi tradisional dengan sistem ekonomi lainnya adalah ...',
    options: [
      'Menggunakan teknologi digital modern',
      'Kegiatan ekonomi berdasarkan kebiasaan dan adat istiadat turun-temurun',
      'Pemerintah mengatur seluruh penetapan harga pasar',
      'Terjadi persaingan bebas yang sangat ketat antar perusahaan',
    ],
    correctAnswer: 1, // B
    explanation: 'Sistem ekonomi tradisional sangat bergantung pada tradisi leluhur dan belum mengenal teknologi modern.',
  },
  {
    id: 'q-7',
    materiNumber: 3,
    materiTag: 'Materi 3: Macam-Macam Sistem Ekonomi di Dunia',
    question: 'Dalam sebuah negara dengan sistem ekonomi komando, permasalahan penentuan harga barang, jenis produksi, dan distribusi dikendalikan sepenuhnya oleh ...',
    options: [
      'Mekanisme pasar bebas',
      'Swasta dan pemilik modal',
      'Pemerintah',
      'Kesepakatan antar konsumen',
    ],
    correctAnswer: 2, // C
    explanation: 'Sistem ekonomi komando menempatkan pemerintah sebagai pengendali tunggal seluruh aktivitas perekonomian.',
  },
  {
    id: 'q-8',
    materiNumber: 3,
    materiTag: 'Materi 3: Macam-Macam Sistem Ekonomi di Dunia',
    question: 'Kelebihan utama dari sistem ekonomi pasar bebas (liberal) bagi para produsen adalah ...',
    options: [
      'Adanya kebebasan penuh untuk bersaing dan mencari keuntungan seluas-luasnya',
      'Kebutuhan pokok rakyat dijamin sepenuhnya oleh negara',
      'Tidak akan pernah terjadi kesenjangan sosial',
      'Harga barang selalu ditekan sangat murah oleh pemerintah',
    ],
    correctAnswer: 0, // A
    explanation: 'Sistem pasar bebas memberikan keleluasaan penuh bagi individu/swasta untuk berkompetisi dan berinovasi demi keuntungan.',
  },
  {
    id: 'q-9',
    materiNumber: 3,
    materiTag: 'Materi 3: Macam-Macam Sistem Ekonomi di Dunia',
    question: 'Indonesia menganut sistem ekonomi Pancasila di mana peran pemerintah dan swasta berjalan berdampingan. Sistem ini dikategorikan sebagai sistem ekonomi ...',
    options: [
      'Tradisional',
      'Komando murni',
      'Campuran',
      'Kapitalis murni',
    ],
    correctAnswer: 2, // C
    explanation: 'Sistem ekonomi campuran menggabungkan unsur mekanisme pasar dengan peran aktif pemerintah untuk mencegah monopoli dan menjaga kesejahteraan sosial.',
  },
  {
    id: 'q-10',
    materiNumber: 3,
    materiTag: 'Materi 3: Macam-Macam Sistem Ekonomi di Dunia',
    question: 'Salah satu kelemahan besar dari sistem ekonomi pasar bebas apabila dibiarkan tanpa pengawasan adalah ...',
    options: [
      'Inovasi teknologi menjadi mati total',
      'Munculnya praktik monopoli dan kesenjangan ekonomi yang tajam',
      'Pemerintah memegang kendali penuh atas harga barang',
      'Terjadinya kelangkaan barang akibat tidak ada produsen yang mau membuat',
    ],
    correctAnswer: 1, // B
    explanation: 'Tanpa regulasi pemerintah, pemilik modal besar di sistem liberal berisiko memonopoli pasar dan menciptakan kesenjangan sosial yang parah.',
  },
];

export const INITIAL_STUDY_CASES: StudyCaseNote[] = [
  {
    id: 'case-1',
    title: 'Studi Kasus Kelangkaan Pupuk dan Skala Prioritas Petani',
    category: 'Kelangkaan',
    author: 'Kelompok 3 (Ekonomi Muda)',
    content: 'Saat musim tanam tiba, pupuk subsidi mengalami kelangkaan di tingkat distributor lokal. Petani dituntut menyusun skala prioritas: mendahulukan tanaman pangan pokok (padi) yang mendekati panen daripada tanaman sekunder. Ini membuktikan bahwa alokasi sumber daya terbatas harus didasarkan pada urgensi mendesak.',
    tags: ['Kelangkaan', 'Pertanian', 'Prioritas'],
    createdAt: '2025-02-15 08:30',
    updatedAt: '2025-02-15 08:30',
  },
  {
    id: 'case-2',
    title: 'Dilema UMKM Sepatu Lokal: What, How, For Whom',
    category: 'Masalah Modern',
    author: 'Kelompok 3 (Ekonomi Muda)',
    content: 'Produsen sepatu lokal di Cibaduyut memutuskan memproduksi sneakers kanvas santai (What), menggunakan kombinasi mesin jahit otomatis dan pengrajin tangan terampil demi menjaga efisiensi biaya (How), dengan target generasi muda dan pelajar SMA berdaya beli terjangkau (For Whom).',
    tags: ['UMKM', '3 Masalah Modern', 'Produksi'],
    createdAt: '2025-02-16 10:15',
    updatedAt: '2025-02-16 10:15',
  },
  {
    id: 'case-3',
    title: 'Sistem Ekonomi Pancasila dalam Menjaga Kedaulatan Energi',
    category: 'Sistem Ekonomi',
    author: 'Kelompok 3 (Ekonomi Muda)',
    content: 'Penerapan Pasal 33 UUD 1945 di Indonesia membuktikan peran Sistem Ekonomi Campuran. Cabang produksi vital seperti listrik (PLN) dan minyak (Pertamina) dikuasai negara untuk kemakmuran rakyat, sementara sektor ritel dan UMKM diberikan keleluasaan kepada swasta untuk bersaing sehat.',
    tags: ['Pancasila', 'Campuran', 'BUMN', 'Pasar'],
    createdAt: '2025-02-17 14:00',
    updatedAt: '2025-02-17 14:00',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Selamat Datang di Ekonomi Kita!',
    message: 'Media Pembelajaran Kelompok 3 siap digunakan. Jelajahi 3 materi utama dan uji pemahamanmu di Kuis Interaktif!',
    time: 'Baru saja',
    read: false,
    type: 'info',
  },
  {
    id: 'notif-2',
    title: 'Tersedia Fitur CRUD Lengkap',
    message: 'Kamu bisa Menambah, Mengedit/Rename, dan Menghapus data Anggota Kelompok, Catatan Kasus, serta Soal Kuis.',
    time: '10 menit lalu',
    read: false,
    type: 'group',
  },
  {
    id: 'notif-3',
    title: 'Bank Soal Kuis Diperbarui',
    message: '10 Soal Kuis resmi sesuai silabus SMA Fase E/F telah sinkron dengan pembahasan lengkap!',
    time: '1 jam lalu',
    read: false,
    type: 'quiz',
  },
];

export const INITIAL_PRIORITY_ITEMS: PriorityItem[] = [
  {
    id: 'p-1',
    name: 'Beras & Makanan Pokok Keluarga',
    category: 'Primer',
    cost: 350000,
    urgency: 'Sangat Mendesak',
    description: 'Kebutuhan dasar kelangsungan hidup harian yang tidak bisa ditunda.',
    selected: true,
  },
  {
    id: 'p-2',
    name: 'Pembayaran Listrik & Air Bersih',
    category: 'Primer',
    cost: 200000,
    urgency: 'Sangat Mendesak',
    description: 'Sarana esensial untuk tempat tinggal dan aktivitas harian keluarga.',
    selected: true,
  },
  {
    id: 'p-3',
    name: 'Buku Pelajaran & Alat Tulis Sekolah',
    category: 'Primer',
    cost: 150000,
    urgency: 'Mendesak',
    description: 'Menunjang kegiatan belajar siswa di SMA untuk meraih masa depan.',
    selected: true,
  },
  {
    id: 'p-4',
    name: 'Paket Kuota Internet Belajar',
    category: 'Sekunder',
    cost: 100000,
    urgency: 'Mendesak',
    description: 'Mendukung riset tugas sekolah dan akses platform pembelajaran digital.',
    selected: false,
  },
  {
    id: 'p-5',
    name: 'Sepatu Olahraga Merk Terkenal',
    category: 'Sekunder',
    cost: 450000,
    urgency: 'Bisa Ditunda',
    description: 'Alas kaki tambahan bernilai gaya hidup, sepatu lama masih layak pakai.',
    selected: false,
  },
  {
    id: 'p-6',
    name: 'Nonton Bioskop & Makan di Kafe Estetik',
    category: 'Tersier',
    cost: 250000,
    urgency: 'Bisa Ditunda',
    description: 'Hiburan akhir pekan bersama teman, dapat dipenuhi jika kebutuhan primer tuntas.',
    selected: false,
  },
  {
    id: 'p-7',
    name: 'Smartwatch Pintar Generasi Terbaru',
    category: 'Tersier',
    cost: 850000,
    urgency: 'Bisa Ditunda',
    description: 'Barang mewah pelengkap gaya hidup berteknologi tinggi.',
    selected: false,
  },
];
