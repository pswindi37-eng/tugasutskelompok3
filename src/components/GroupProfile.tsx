import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  ChevronRight, 
  ChevronsRight,
  Search, 
  X, 
  Check, 
  UserPlus, 
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';
import { GroupMember } from '../types';
import { INITIAL_GROUP_MEMBERS } from '../data/initialData';

interface GroupProfileProps {
  members: GroupMember[];
  setMembers: React.Dispatch<React.SetStateAction<GroupMember[]>>;
}

export const GroupProfile: React.FC<GroupProfileProps> = ({ members, setMembers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null);

  // Modal states for CRUD operations
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<GroupMember | null>(null);
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);

  // Form states for Create & Update
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    role: '',
    bio: '',
    avatarSeed: 'SiswaBaru',
  });

  // Filtered members by search
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open modal to Add New Member (CREATE)
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      nim: '',
      role: 'Anggota Riset',
      bio: 'Aktif berkontribusi dalam tim pembelajaran ekonomi.',
      avatarSeed: `Member${Date.now().toString().slice(-4)}`,
    });
    setIsAddModalOpen(true);
  };

  // Submit Add Member (CREATE)
  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.nim.trim()) return;

    const newMember: GroupMember = {
      id: `mem-${Date.now()}`,
      name: formData.name.toUpperCase().trim(),
      nim: formData.nim.trim(),
      role: formData.role.trim() || 'Anggota',
      bio: formData.bio.trim() || 'Anggota tim Ekonomi Kita Kelompok 3.',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formData.avatarSeed)}&backgroundColor=b6e3f4,c0aede,ffd5dc`,
      order: members.length + 1,
    };

    setMembers((prev) => [...prev, newMember]);
    setIsAddModalOpen(false);
  };

  // Open modal to Edit/Rename Member (RENAME & UPDATE)
  const handleOpenEditModal = (member: GroupMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      nim: member.nim,
      role: member.role,
      bio: member.bio || '',
      avatarSeed: member.name,
    });
  };

  // Submit Edit/Rename Member (RENAME & UPDATE)
  const handleUpdateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !formData.name.trim() || !formData.nim.trim()) return;

    setMembers((prev) =>
      prev.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              name: formData.name.toUpperCase().trim(),
              nim: formData.nim.trim(),
              role: formData.role.trim(),
              bio: formData.bio.trim(),
            }
          : m
      )
    );
    setEditingMember(null);
    if (selectedMember?.id === editingMember.id) {
      setSelectedMember(null);
    }
  };

  // Confirm Delete Member (DELETE)
  const handleDeleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setDeletingMemberId(null);
    if (selectedMember?.id === id) {
      setSelectedMember(null);
    }
  };

  // Reset to initial 6 Kelompok 3 members
  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan daftar anggota ke 6 data asli Kelompok 3?')) {
      setMembers(INITIAL_GROUP_MEMBERS);
    }
  };

  return (
    <section id="profil-kelompok" className="py-8 sm:py-12 relative overflow-hidden">
      
      {/* Background decoration matching reference aesthetic */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section matching reference image with Golden Ribbon & Title */}
        <div className="flex flex-col items-center text-center mb-8">
          
          {/* Golden Laurels Ribbon Emblem */}
          <div className="relative inline-flex flex-col items-center mb-3">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center text-amber-300">
                  <GraduationCap className="w-8 h-8" />
                </div>
              </div>
            </div>
            {/* Ribbon banner: "Ekonomi Muda" */}
            <div className="mt-[-12px] z-10 px-4 py-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-blue-950 font-black text-xs uppercase tracking-wider rounded-full shadow-md border border-amber-200">
              Ekonomi Muda
            </div>
          </div>

          {/* Section Title with Users Icon */}
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Users className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Profil Anggota Kelompok
            </h2>
          </div>

          {/* Subtitle verbatim from reference image */}
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            Kami sepenuhnya berkomitmen untuk memberikan pengalaman belajar ekonomi yang interaktif dan menyenangkan.
          </p>

          {/* CRUD Management Toolbar */}
          <div className="mt-6 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-2xl shadow-sm border border-blue-100">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama atau NIM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            {/* Action Buttons: Add Member & Reset to default */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Anggota (Create)</span>
              </button>

              <button
                onClick={handleResetToDefault}
                title="Kembalikan ke 6 anggota asli Kelompok 3"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Default</span>
              </button>
            </div>

          </div>

        </div>

        {/* Member Cards Grid matching the image style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={member.id}
                className="group relative bg-white rounded-3xl p-5 shadow-lg shadow-blue-900/5 border border-blue-100 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between"
              >
                {/* Number Badge Top Right matching the image ("01", "02", etc.) */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-blue-600/30">
                  {formattedIndex}
                </div>

                <div>
                  <div className="flex items-center gap-4">
                    {/* Member Avatar */}
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-100 to-indigo-100 p-1 border-2 border-blue-200 overflow-hidden shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Member Information */}
                    <div className="pr-8 min-w-0">
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-1">
                        {member.name}
                      </h3>
                      
                      {/* Role Pill */}
                      <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                        <ShieldCheck className="w-3 h-3 text-blue-600" />
                        <span className="truncate">{member.role}</span>
                      </div>

                      {/* NIM display */}
                      <p className="text-xs text-slate-500 mt-1 font-mono font-medium">
                        NIM: <span className="font-bold text-slate-800">{member.nim}</span>
                      </p>
                    </div>
                  </div>

                  {/* Bio snippet */}
                  {member.bio && (
                    <p className="mt-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </div>

                {/* Card Action Footer with CRUD Buttons & Chevron >>> matching the image */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  
                  {/* CRUD quick buttons: Rename/Edit and Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(member)}
                      title="Ubah / Rename Nama & Data"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingMemberId(member.id)}
                      title="Hapus Anggota"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* >>> detail button matching the reference image bottom right of card */}
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm group/btn"
                  >
                    <span>Detail</span>
                    <ChevronsRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if search yields no results */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">Tidak ada anggota yang cocok</h4>
            <p className="text-xs text-slate-500 mt-1">Coba kata kunci pencarian lain atau tambahkan anggota baru.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Bottom Banner Ribbon matching the reference image */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-lg shadow-blue-900/20 border border-blue-400/30">
            <GraduationCap className="w-5 h-5 text-amber-300" />
            <span className="text-sm sm:text-base font-bold tracking-wide">
              Belajar Ekonomi, Raih Masa Depan
            </span>
          </div>
        </div>

      </div>

      {/* CREATE MODAL: Tambah Anggota Baru */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-700">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Tambah Anggota Kelompok
                </h3>
                <p className="text-xs text-slate-500">Operasi CREATE data anggota Kelompok 3</p>
              </div>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Anggota *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: RIZKY RAMADHAN"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NIM / NISN *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 2602350"
                    value={formData.nim}
                    onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Peran / Jabatan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Anggota Riset"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan / Bio Anggota
                </label>
                <textarea
                  rows={2}
                  placeholder="Deskripsi tugas atau motto belajar anggota..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  Simpan Anggota Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE & RENAME MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100 relative">
            <button
              onClick={() => setEditingMember(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
                <Edit3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Ubah / Rename Data Anggota
                </h3>
                <p className="text-xs text-slate-500">Operasi UPDATE & RENAME anggota Kelompok 3</p>
              </div>
            </div>

            <form onSubmit={handleUpdateMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap (Rename) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NIM / NISN *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nim}
                    onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Peran / Jabatan
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Kontribusi
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20"
                >
                  Perbarui Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingMemberId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-red-100 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Hapus Anggota Ini?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Data anggota akan dihapus dari daftar kelompok. Anda dapat mengembalikannya lewat tombol "Reset Default".
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingMemberId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteMember(deletingMemberId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-500/20"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEMBER DETAIL VIEW MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100 relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-blue-50 border-2 border-blue-200 p-2 shadow-lg mb-4">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-xl font-black text-slate-900">{selectedMember.name}</h3>
              <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>{selectedMember.role}</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-600 mt-2 bg-slate-100 px-3 py-1 rounded-lg">
                NIM: {selectedMember.nim}
              </p>

              <div className="mt-5 w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Kontribusi dalam Kelompok 3
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedMember.bio || 'Aktif dalam penyusunan konsep dan evaluasi materi pembelajaran ekonomi SMA.'}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 w-full">
                <button
                  onClick={() => {
                    handleOpenEditModal(selectedMember);
                    setSelectedMember(null);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md shadow-blue-500/20"
                >
                  Edit Data Ini
                </button>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
