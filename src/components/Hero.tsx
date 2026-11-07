import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Play, 
  BookOpen, 
  Sparkles, 
  Lightbulb, 
  Calculator, 
  TrendingUp, 
  Globe2, 
  Coins, 
  Layers
} from 'lucide-react';

interface HeroProps {
  onExploreMateri: () => void;
  onOpenGuide: () => void;
  onStartQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMateri,
  onOpenGuide,
  onStartQuiz,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Kelangkaan & Kebutuhan Manusia',
      subtitle: 'Memahami batas sumber daya alam dan pentingnya menyusun skala prioritas.',
      highlight: 'Scarcity & Skala Prioritas',
      badge: 'Materi 1',
    },
    {
      title: 'Tiga Masalah Pokok Ekonomi Modern',
      subtitle: 'Menjawab 3 pertanyaan esensial produsen: What, How, dan For Whom secara efisien.',
      highlight: 'What • How • For Whom',
      badge: 'Materi 2',
    },
    {
      title: 'Macam-Macam Sistem Ekonomi di Dunia',
      subtitle: 'Membedah Sistem Tradisional, Komando, Pasar Bebas, hingga Ekonomi Campuran Pancasila.',
      highlight: 'Tradisional • Komando • Pasar • Campuran',
      badge: 'Materi 3',
    },
  ];

  // Auto rotate slides gently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-6 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Container matching the reference image */}
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#024497] via-[#0b63c7] to-[#1e88e5] text-white p-6 sm:p-10 lg:p-14 shadow-2xl shadow-blue-900/30 overflow-hidden border border-blue-400/30">
          
          {/* Subtle background ambient glow & shapes */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-900/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Dotted pattern decorative overlay */}
          <div className="absolute top-6 right-6 hidden md:grid grid-cols-4 gap-2 opacity-30">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-white"></span>
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              
              {/* Badge: Belajar • Berpikir • Berkembang */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-semibold tracking-wide text-blue-50 shadow-inner">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Belajar • Berpikir • Berkembang</span>
              </div>

              {/* Main Headline with artistic calligraphic style underline */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                  Media Pembelajaran{' '}
                  <span className="relative inline-block text-white">
                    <span className="relative z-10 font-black">Ekonomi</span>
                    {/* Golden decorative accent curve underline like in the reference image */}
                    <svg
                      className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-4 sm:h-5 text-amber-400 overflow-visible"
                      viewBox="0 0 250 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 15C60 4 180 3 245 13"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <circle cx="245" cy="13" r="3" fill="#f59e0b" />
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Subtitle verbatim from image */}
              <p className="text-sm sm:text-base lg:text-lg text-blue-100/90 leading-relaxed max-w-xl font-normal">
                Selamat datang di platform belajar mandiri ekonomi interaktif. Pahami konsep dasar ekonomi, mekanisme pasar, hingga simulasi harga secara visual dan mudah!
              </p>

              {/* Active topic slide preview */}
              <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 transition-all">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Fokus Pembelajaran Hari Ini ({heroSlides[activeSlide].badge})
                  </span>
                  <span className="text-white/60">Modul Resmi SMA</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {heroSlides[activeSlide].title}
                </h4>
                <p className="text-xs text-blue-100/80 mt-0.5 line-clamp-1">
                  {heroSlides[activeSlide].subtitle}
                </p>
              </div>

              {/* Action Buttons matching the image */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
                {/* Mulai Eksplorasi Materi */}
                <button
                  onClick={onExploreMateri}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/20"
                >
                  <BookOpen className="w-4 h-4 text-blue-200" />
                  <span>Mulai Eksplorasi Materi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Lihat Panduan */}
                <button
                  onClick={onOpenGuide}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-sm border border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                  </div>
                  <span>Lihat Panduan</span>
                  <ArrowRight className="w-4 h-4 text-blue-200" />
                </button>

                {/* Direct Quiz Shortcut */}
                <button
                  onClick={onStartQuiz}
                  className="hidden xl:inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-blue-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Kuis 10 Soal</span>
                </button>
              </div>

            </div>

            {/* Right Visual Graphic Card matching the design in the image */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              
              {/* Floating motivational badge: "Ekonomi Lebih Mudah! Bersama Kami" */}
              <div className="w-full relative rounded-3xl bg-gradient-to-b from-blue-400/20 to-blue-950/40 backdrop-blur-xl border border-white/25 p-5 sm:p-6 shadow-2xl">
                
                {/* Header Tag in Illustration */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-blue-950 font-black text-xs tracking-wide shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ekonomi Lebih Mudah!</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-200">
                    Bersama Kami
                  </span>
                </div>

                {/* Visual Composite Representation of 3D Elements */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  
                  {/* Card 1: Konsep & Ide Kreatif (Lightbulb & Documents) */}
                  <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2">
                      <Lightbulb className="w-6 h-6 animate-pulse" />
                    </div>
                    <h5 className="font-bold text-sm text-white">Ide & Solusi</h5>
                    <p className="text-[11px] text-blue-200/80 mt-0.5">Memecahkan kelangkaan dengan skala prioritas cerdas.</p>
                  </div>

                  {/* Card 2: Alat Hitung & Mekanisme (Calculator & Rising Chart) */}
                  <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-2">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-sm text-white">Efisiensi Biaya</h5>
                    <p className="text-[11px] text-blue-200/80 mt-0.5">Pertanyaan How dalam meminimalkan biaya produksi.</p>
                  </div>

                  {/* Card 3: Sumber Daya & Modal (Coins & Growth) */}
                  <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-sky-400/20 text-sky-300 flex items-center justify-center mb-2">
                      <Coins className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-sm text-white">Alokasi Modal</h5>
                    <p className="text-[11px] text-blue-200/80 mt-0.5">SDA, Tenaga Kerja, Modal, dan Kewirausahaan.</p>
                  </div>

                  {/* Card 4: Sistem Ekonomi Global (Globe & Growth Arrow) */}
                  <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-indigo-400/20 text-indigo-300 flex items-center justify-center mb-2">
                      <Globe2 className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-sm text-white">Sistem Dunia</h5>
                    <p className="text-[11px] text-blue-200/80 mt-0.5">Tradisional, Komando, Pasar, dan Campuran.</p>
                  </div>

                </div>

                {/* Progress & Quick Stats Bar */}
                <div className="bg-white/15 rounded-2xl p-3 flex items-center justify-between border border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-300" />
                    <span className="text-blue-100 font-medium">10 Soal Kuis Terverifikasi</span>
                  </div>
                  <span className="font-bold text-white bg-blue-600/60 px-2 py-0.5 rounded-md">
                    100% Interaktif
                  </span>
                </div>

                {/* Carousel Pagination Dots matching the reference image bottom right */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Lihat slide ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        activeSlide === idx
                          ? 'w-7 bg-amber-400'
                          : 'w-2.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
