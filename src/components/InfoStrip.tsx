import React from 'react';
import { BookOpen, Award, Calendar, Landmark } from 'lucide-react';

export const InfoStrip: React.FC = () => {
  const infoCards = [
    {
      label: 'MATA PELAJARAN',
      value: 'Ekonomi SMA',
      subtext: 'Kurikulum Merdeka',
      icon: BookOpen,
      color: 'from-blue-600 to-blue-700',
    },
    {
      label: 'KELAS / FASE',
      value: 'SMA Kelas X / XI',
      subtext: '(Fase E / F)',
      icon: Award,
      color: 'from-sky-500 to-blue-600',
    },
    {
      label: 'TAHUN AJARAN',
      value: '2024 / 2025',
      subtext: 'Semester Genap',
      icon: Calendar,
      color: 'from-indigo-500 to-blue-600',
    },
    {
      label: 'NAMA KELOMPOK',
      value: 'Kelompok 3',
      subtext: '(Ekonomi Muda)',
      icon: Landmark,
      color: 'from-blue-700 to-indigo-800',
    },
  ];

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip container with decorative dot matrix on sides */}
        <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md shadow-blue-900/5 border border-blue-100 flex items-center justify-between overflow-hidden">
          
          {/* Left Dots Decoration matching the image */}
          <div className="hidden xl:grid grid-cols-3 gap-1.5 opacity-25 pl-2 select-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-1 sm:px-4">
            {infoCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all group"
                >
                  {/* Circular Blue Icon matching the image */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  {/* Typography labels */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                      {card.label}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                      {card.value}
                    </span>
                    <span className="text-xs font-medium text-blue-600 truncate">
                      {card.subtext}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Dots Decoration matching the image */}
          <div className="hidden xl:grid grid-cols-3 gap-1.5 opacity-25 pr-2 select-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
