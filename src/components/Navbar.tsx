import React, { useState } from 'react';
import { 
  TrendingUp, 
  Home, 
  Users, 
  BookOpen, 
  HelpCircle, 
  Bell, 
  User, 
  Menu, 
  X, 
  Database, 
  CheckCheck,
  CheckCircle2
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NavbarProps {
  activeTab: 'beranda' | 'kelompok' | 'materi' | 'kuis' | 'crud';
  setActiveTab: (tab: 'beranda' | 'kelompok' | 'materi' | 'kuis' | 'crud') => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  notifications,
  setNotifications,
  onOpenGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  interface NavItem {
    id: 'beranda' | 'kelompok' | 'materi' | 'kuis' | 'crud';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isSpecial?: boolean;
  }

  const navItems: NavItem[] = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'kelompok', label: 'Profil & Kelompok', icon: Users },
    { id: 'materi', label: 'Materi Ekonomi', icon: BookOpen },
    { id: 'kuis', label: 'Kuis Interaktif', icon: HelpCircle },
    { id: 'crud', label: 'Pusat CRUD', icon: Database, isSpecial: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo Section matching the reference image */}
            <div 
              onClick={() => setActiveTab('beranda')}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <div className="relative">
                  <TrendingUp className="w-6 h-6 stroke-[2.5]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-blue-700"></span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                    Ekonomi Kita
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 rounded-md">
                    SMA Fase E/F
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500 tracking-normal">
                  Media Pembelajaran Ekonomi SMA • Kelompok 3
                </span>
              </div>
            </div>

            {/* Desktop Navigation Tabs matching the image */}
            <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/30 scale-[1.02]'
                        : item.isSpecial
                        ? 'text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/90'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isSpecial ? 'text-indigo-600' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons: Notification & Profile */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Notification Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileModal(false);
                  }}
                  aria-label="Notifikasi"
                  className="relative p-2.5 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 min-w-5 h-5 px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-blue-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-blue-600" />
                        <h4 className="font-bold text-slate-800 text-sm">Pemberitahuan</h4>
                        <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                          {unreadCount} Baru
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          Tandai Dibaca
                        </button>
                      )}
                    </div>

                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`py-3 px-2 rounded-xl transition-colors ${
                            !n.read ? 'bg-blue-50/60 font-medium' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-slate-800">{n.title}</p>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                      <button
                        onClick={onOpenGuide}
                        className="text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Buka Panduan Penggunaan Lengkap →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar Trigger Button */}
              <button
                onClick={() => {
                  setShowProfileModal(!showProfileModal);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1.5 pl-2 sm:pr-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 hover:border-blue-400 transition-all focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                  K3
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">Kelompok 3</span>
                  <span className="text-[10px] text-blue-600 font-semibold">Ekonomi Muda</span>
                </div>
              </button>

              {/* Mobile hamburger menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100"
                aria-label="Menu Navigasi"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 px-4 pt-3 pb-5 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : item.isSpecial
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Profile & Information Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-blue-100 relative">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/30">
                K3
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Kelompok 3 (Ekonomi Muda)</h3>
                <p className="text-xs font-semibold text-blue-600">Ekonomi SMA • Kelas X / XI (Fase E/F)</p>
                <p className="text-xs text-slate-500 mt-0.5">Tahun Ajaran 2024 / 2025</p>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 mb-5">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Misi Pembelajaran
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kami berkomitmen menciptakan media belajar ekonomi yang menyenangkan, memudahkan pemahaman konsep kelangkaan, 3 masalah modern (What, How, For Whom), serta ragam sistem ekonomi dunia.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  setActiveTab('kelompok');
                }}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                Lihat & Kelola Anggota Kelompok (6 Anggota)
              </button>
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  onOpenGuide();
                }}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-slate-500" />
                Panduan Belajar & Fitur Aplikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
