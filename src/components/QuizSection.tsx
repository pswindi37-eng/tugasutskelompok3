import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Printer, 
  Sliders, 
  Settings2,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types';
import { INITIAL_QUIZ_QUESTIONS } from '../data/initialData';

interface QuizSectionProps {
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ questions, setQuestions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [studentName, setStudentName] = useState('Siswa Teladan SMA');
  const [showCertificate, setShowCertificate] = useState(false);

  // Manage Question Mode (CRUD Mode)
  const [isCrudMode, setIsCrudMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  // Form State for CRUD
  const [formData, setFormData] = useState({
    materiNumber: 1,
    materiTag: 'Materi 1: Kelangkaan & Kebutuhan',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 0,
    explanation: '',
  });

  const currentQ = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    return Math.round((correctCount / (questions.length || 1)) * 100);
  };

  const getCorrectCount = () => {
    let count = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        count += 1;
      }
    });
    return count;
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setShowCertificate(false);
  };

  // CRUD Operations
  const handleOpenAddModal = () => {
    setFormData({
      materiNumber: 1,
      materiTag: 'Materi 1: Kelangkaan & Kebutuhan',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 0,
      explanation: '',
    });
    setIsAddModalOpen(true);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.optionA.trim()) return;

    const newQ: QuizQuestion = {
      id: `q-${Date.now()}`,
      materiNumber: formData.materiNumber,
      materiTag: formData.materiTag,
      question: formData.question.trim(),
      options: [formData.optionA.trim(), formData.optionB.trim(), formData.optionC.trim(), formData.optionD.trim()],
      correctAnswer: Number(formData.correctAnswer),
      explanation: formData.explanation.trim() || 'Pembahasan telah ditambahkan.',
      isCustom: true,
    };

    setQuestions((prev) => [...prev, newQ]);
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (q: QuizQuestion) => {
    setEditingQuestion(q);
    setFormData({
      materiNumber: q.materiNumber,
      materiTag: q.materiTag,
      question: q.question,
      optionA: q.options[0] || '',
      optionB: q.options[1] || '',
      optionC: q.options[2] || '',
      optionD: q.options[3] || '',
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    });
  };

  const handleUpdateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion || !formData.question.trim()) return;

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === editingQuestion.id
          ? {
              ...q,
              materiNumber: formData.materiNumber,
              materiTag: formData.materiTag,
              question: formData.question.trim(),
              options: [formData.optionA.trim(), formData.optionB.trim(), formData.optionC.trim(), formData.optionD.trim()],
              correctAnswer: Number(formData.correctAnswer),
              explanation: formData.explanation.trim(),
            }
          : q
      )
    );
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      alert('Minimal harus ada 1 soal dalam bank soal!');
      return;
    }
    if (window.confirm('Hapus soal ini dari bank kuis?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      if (currentQuestionIndex >= questions.length - 1) {
        setCurrentQuestionIndex(Math.max(0, questions.length - 2));
      }
    }
  };

  const handleResetQuestions = () => {
    if (window.confirm('Kembalikan bank soal ke 10 soal resmi bawaan Kelompok 3?')) {
      setQuestions(INITIAL_QUIZ_QUESTIONS);
      handleRestartQuiz();
    }
  };

  const score = calculateScore();
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  return (
    <section id="kuis-interaktif" className="py-8 sm:py-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Kuis Evaluasi Resmi • 10 Soal Pilihan Ganda</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kuis Interaktif Materi Ekonomi
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Uji pemahamanmu tentang Kelangkaan, 3 Masalah Modern (What, How, For Whom), dan Macam Sistem Ekonomi Dunia.
          </p>

          {/* Mode switch: Student Test Mode vs CRUD Management Mode */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={() => setIsCrudMode(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isCrudMode
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Mode Pengerjaan Kuis
            </button>
            <button
              onClick={() => setIsCrudMode(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isCrudMode
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Kelola Bank Soal (CRUD)</span>
            </button>
          </div>
        </div>

        {/* ================= CRUD QUESTION MANAGER MODE ================= */}
        {isCrudMode ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-indigo-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Pusat Manajemen Bank Soal (CRUD)
                </h3>
                <p className="text-xs text-slate-500">
                  Total {questions.length} soal tersimpan dalam database lokal.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Soal (Create)</span>
                </button>
                <button
                  onClick={handleResetQuestions}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Reset ke 10 Soal Bawaan
                </button>
              </div>
            </div>

            {/* List of questions */}
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                        {q.materiTag}
                      </span>
                      {q.isCustom && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Kustom Siswa
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg border ${
                            oIdx === q.correctAnswer
                              ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                          {oIdx === q.correctAnswer && ' (Kunci Jawaban)'}
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-slate-500 italic bg-white p-2.5 rounded-xl border border-slate-200">
                      <strong>Penjelasan:</strong> {q.explanation}
                    </p>
                  </div>

                  <div className="flex items-center sm:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenEditModal(q)}
                      className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 bg-white border border-slate-200"
                      title="Edit / Rename Soal"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 bg-white border border-slate-200"
                      title="Hapus Soal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ================= STUDENT TEST TAKING MODE ================= */
          <div className="space-y-6">
            
            {/* Top Status & Progress Bar */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-blue-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black">
                    {currentQuestionIndex + 1}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                      {currentQ.materiTag}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Soal Nomor {currentQuestionIndex + 1} dari {questions.length}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="text-slate-500">
                    Terjawab: <strong className="text-blue-700">{answeredCount}</strong> / {questions.length}
                  </span>
                  {isSubmitted && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                      Skor: {score} / 100
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Number Pills Navigation */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
                {questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = currentQuestionIndex === idx;
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                        isCurrent
                          ? 'ring-2 ring-blue-600 ring-offset-2'
                          : ''
                      } ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-500 text-white'
                            : 'bg-red-500 text-white'
                          : isAnswered
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-blue-100">
              
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed mb-6">
                {currentQ.question}
              </h3>

              {/* Options List */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const optionLabel = String.fromCharCode(65 + optIdx);
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;
                  const isCorrect = optIdx === currentQ.correctAnswer;

                  let optionStyle = 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30';

                  if (isSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-50 border-red-500 text-red-950 font-semibold ring-1 ring-red-500';
                    } else {
                      optionStyle = 'bg-slate-50/50 border-slate-200 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-600/30 shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${optionStyle}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSubmitted && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : isSubmitted && isSelected && !isCorrect
                            ? 'bg-red-600 text-white'
                            : isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700'
                        }`}
                      >
                        {optionLabel}
                      </div>

                      <div className="flex-1 text-xs sm:text-sm pt-0.5 leading-relaxed">
                        {option}
                      </div>

                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card (When Submitted or toggled) */}
              {isSubmitted && showExplanation && (
                <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs sm:text-sm text-blue-950 leading-relaxed animate-in fade-in">
                  <div className="flex items-center gap-2 font-extrabold text-blue-900 mb-1.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Pembahasan Resmi:</span>
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Question Navigation Controls */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  !isSubmitted && (
                    <button
                      onClick={handleSubmitQuiz}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-md shadow-emerald-500/20"
                    >
                      <Check className="w-4 h-4" />
                      <span>Selesai & Cek Nilai</span>
                    </button>
                  )
                )}
              </div>

            </div>

            {/* Score Summary & Certificate Trigger */}
            {isSubmitted && (
              <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl text-center space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-amber-400 text-blue-950 font-black shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    Hasil Kuis Evaluasi Ekonomi
                  </h3>
                  <p className="text-xs text-blue-200 mt-1">
                    Kamu berhasil menjawab {getCorrectCount()} dari {questions.length} soal dengan benar!
                  </p>
                </div>

                <div className="inline-block px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-xs font-semibold text-blue-200 block uppercase">Nilai Akhir</span>
                  <span className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">
                    {score}
                  </span>
                  <span className="text-xs text-white/80 block mt-1">
                    {score >= 80 ? '🌟 Sangat Memuaskan (Master Ekonomi)' : score >= 60 ? '👍 Cukup Baik (Lulus)' : '📚 Perlu Mengulang Materi'}
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-blue-950 text-xs font-black shadow-md"
                  >
                    <Award className="w-4 h-4" />
                    <span>Lihat & Cetak Sertifikat</span>
                  </button>
                  <button
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Kuis</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300 relative text-center">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header */}
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-600">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              SERTIFIKAT PENCAPAIAN PEMBELAJARAN
            </h3>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Media Pembelajaran Ekonomi SMA
            </h2>
            <p className="text-xs text-blue-700 font-bold mt-0.5">
              Diterbitkan oleh Kelompok 3 (Ekonomi Muda)
            </p>

            <div className="my-6 py-4 px-6 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">Diberikan kepada:</span>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="text-lg sm:text-xl font-black text-slate-900 text-center bg-transparent border-b-2 border-blue-400 focus:outline-none focus:border-blue-600 px-3 py-1 w-full max-w-sm mx-auto"
                placeholder="Masukkan Namamu"
              />
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Telah berhasil menyelesaikan evaluasi <strong>Masalah Pokok Ekonomi & Sistem Ekonomi</strong> dengan perolehan nilai:
              </p>
              <div className="mt-2 text-3xl font-black text-blue-700 font-mono">
                {score} / 100
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left text-xs text-slate-600 border-t border-slate-200 pt-4 mb-6">
              <div>
                <span className="font-bold block text-slate-800">Materi yang Dikuasai:</span>
                <p>1. Kelangkaan & Kebutuhan Manusia</p>
                <p>2. Tiga Masalah Pokok Modern (What, How, For Whom)</p>
                <p>3. Macam-Macam Sistem Ekonomi Dunia</p>
              </div>
              <div className="text-right">
                <span className="font-bold block text-slate-800">Tanggal Penyelesaian:</span>
                <p>{new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                <p className="mt-2 font-bold text-blue-600">Ekonomi Kita - SMA Fase E/F</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Sertifikat</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE QUESTION MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              Tambah Soal Kuis Baru (Create)
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Tambahkan pertanyaan kuis baru beserta 4 pilihan jawaban dan penjelasannya.
            </p>

            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Materi
                  </label>
                  <select
                    value={formData.materiNumber}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      const tags = [
                        'Materi 1: Kelangkaan & Kebutuhan Manusia',
                        'Materi 2: Tiga Masalah Pokok Modern',
                        'Materi 3: Macam-Macam Sistem Ekonomi',
                      ];
                      setFormData({
                        ...formData,
                        materiNumber: num,
                        materiTag: tags[num - 1] || tags[0],
                      });
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={1}>Materi 1: Kelangkaan</option>
                    <option value={2}>Materi 2: Masalah Modern</option>
                    <option value={3}>Materi 3: Sistem Ekonomi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kunci Jawaban Benar
                  </label>
                  <select
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={0}>Pilihan A</option>
                    <option value={1}>Pilihan B</option>
                    <option value={2}>Pilihan C</option>
                    <option value={3}>Pilihan D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Teks Pertanyaan *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ketik soal kuis di sini..."
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Pilihan A</label>
                  <input
                    type="text"
                    required
                    value={formData.optionA}
                    onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Pilihan B</label>
                  <input
                    type="text"
                    required
                    value={formData.optionB}
                    onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Pilihan C</label>
                  <input
                    type="text"
                    required
                    value={formData.optionC}
                    onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Pilihan D</label>
                  <input
                    type="text"
                    required
                    value={formData.optionD}
                    onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Uraian Pembahasan Soal
                </label>
                <textarea
                  rows={2}
                  placeholder="Mengapa pilihan jawaban tersebut benar?"
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 border border-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20"
                >
                  Simpan Soal Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / RENAME QUESTION MODAL */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingQuestion(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              Edit / Rename Soal Kuis (Update)
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Perbarui redaksi soal, pilihan ganda, kunci jawaban, atau pembahasan.
            </p>

            <form onSubmit={handleUpdateQuestion} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Materi
                  </label>
                  <select
                    value={formData.materiNumber}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      const tags = [
                        'Materi 1: Kelangkaan & Kebutuhan Manusia',
                        'Materi 2: Tiga Masalah Pokok Modern',
                        'Materi 3: Macam-Macam Sistem Ekonomi',
                      ];
                      setFormData({
                        ...formData,
                        materiNumber: num,
                        materiTag: tags[num - 1] || tags[0],
                      });
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={1}>Materi 1: Kelangkaan</option>
                    <option value={2}>Materi 2: Masalah Modern</option>
                    <option value={3}>Materi 3: Sistem Ekonomi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kunci Jawaban Benar
                  </label>
                  <select
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={0}>Pilihan A</option>
                    <option value={1}>Pilihan B</option>
                    <option value={2}>Pilihan C</option>
                    <option value={3}>Pilihan D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Teks Pertanyaan (Rename) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Pilihan A</label>
                  <input
                    type="text"
                    required
                    value={formData.optionA}
                    onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Pilihan B</label>
                  <input
                    type="text"
                    required
                    value={formData.optionB}
                    onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Pilihan C</label>
                  <input
                    type="text"
                    required
                    value={formData.optionC}
                    onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Pilihan D</label>
                  <input
                    type="text"
                    required
                    value={formData.optionD}
                    onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Uraian Pembahasan
                </label>
                <textarea
                  rows={2}
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 border border-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20"
                >
                  Perbarui Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
