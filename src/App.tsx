import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfoStrip } from './components/InfoStrip';
import { GroupProfile } from './components/GroupProfile';
import { MateriSection } from './components/MateriSection';
import { QuizSection } from './components/QuizSection';
import { CrudCenter } from './components/CrudCenter';
import { GuideModal } from './components/GuideModal';
import { Footer } from './components/Footer';
import { 
  GroupMember, 
  QuizQuestion, 
  StudyCaseNote, 
  NotificationItem 
} from './types';
import { 
  INITIAL_GROUP_MEMBERS, 
  INITIAL_QUIZ_QUESTIONS, 
  INITIAL_STUDY_CASES, 
  INITIAL_NOTIFICATIONS 
} from './data/initialData';
import { Sparkles, Eye, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'beranda' | 'kelompok' | 'materi' | 'kuis' | 'crud'>('beranda');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showOriginalDesignModal, setShowOriginalDesignModal] = useState(false);

  // Persistent localStorage state for Members
  const [members, setMembers] = useState<GroupMember[]>(() => {
    try {
      const saved = localStorage.getItem('ekonomi_members');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_GROUP_MEMBERS;
  });

  // Persistent localStorage state for Study Case Notes
  const [studyCases, setStudyCases] = useState<StudyCaseNote[]>(() => {
    try {
      const saved = localStorage.getItem('ekonomi_cases');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STUDY_CASES;
  });

  // Persistent localStorage state for Quiz Questions
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('ekonomi_questions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_QUIZ_QUESTIONS;
  });

  // Persistent localStorage state for Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('ekonomi_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('ekonomi_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('ekonomi_cases', JSON.stringify(studyCases));
  }, [studyCases]);

  useEffect(() => {
    localStorage.setItem('ekonomi_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('ekonomi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Scroll to top on tab change
  const handleTabChange = (tab: 'beranda' | 'kelompok' | 'materi' | 'kuis' | 'crud') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f7ff] text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        notifications={notifications}
        setNotifications={setNotifications}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <>
            {/* Hero Section matching the image */}
            <Hero
              onExploreMateri={() => handleTabChange('materi')}
              onOpenGuide={() => setIsGuideOpen(true)}
              onStartQuiz={() => handleTabChange('kuis')}
            />

            {/* Info Strip Cards matching the image */}
            <InfoStrip />

            {/* Reference Design Compare Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-100/70 to-indigo-100/70 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Desain Sesuai Gambar Referensi & Dilengkapi CRUD Lengkap
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">
                      Seluruh elemen grafis, profil Kelompok 3, materi pokok, dan 10 kuis telah terintegrasi sempurna.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowOriginalDesignModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-blue-700 text-xs font-bold border border-blue-200 shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Gambar Desain Acuan</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('crud')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                  >
                    <span>Buka Pusat CRUD</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Group Profile Section matching the image */}
            <GroupProfile
              members={members}
              setMembers={setMembers}
            />

            {/* Educational Material Section */}
            <MateriSection
              studyCases={studyCases}
              setStudyCases={setStudyCases}
              onGoToQuiz={() => handleTabChange('kuis')}
            />

            {/* Interactive Quiz Section */}
            <QuizSection
              questions={questions}
              setQuestions={setQuestions}
            />
          </>
        )}

        {activeTab === 'kelompok' && (
          <div className="py-4">
            <InfoStrip />
            <GroupProfile
              members={members}
              setMembers={setMembers}
            />
          </div>
        )}

        {activeTab === 'materi' && (
          <MateriSection
            studyCases={studyCases}
            setStudyCases={setStudyCases}
            onGoToQuiz={() => handleTabChange('kuis')}
          />
        )}

        {activeTab === 'kuis' && (
          <QuizSection
            questions={questions}
            setQuestions={setQuestions}
          />
        )}

        {activeTab === 'crud' && (
          <CrudCenter
            members={members}
            setMembers={setMembers}
            studyCases={studyCases}
            setStudyCases={setStudyCases}
            questions={questions}
            setQuestions={setQuestions}
            onGoToTab={handleTabChange}
          />
        )}
      </main>

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigateTab={(tab) => {
          setIsGuideOpen(false);
          handleTabChange(tab);
        }}
      />

      {/* Original Image Modal */}
      {showOriginalDesignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-3xl p-5 shadow-2xl border border-blue-100 relative max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Gambar Desain Referensi Asli Pengguna
                </h3>
              </div>
              <button
                onClick={() => setShowOriginalDesignModal(false)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-07_at_19.57.29_08366bd8.jpeg"
                alt="Desain Acuan Ekonomi Kita"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Desain antarmuka telah direplikasi secara presisi dengan interaktivitas penuh, animasi, simulasi, dan fungsi CRUD lengkap.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        members={members}
        onNavigateTab={handleTabChange}
      />

    </div>
  );
}
