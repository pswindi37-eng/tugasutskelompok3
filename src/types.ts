export interface GroupMember {
  id: string;
  name: string;
  nim: string;
  role: string;
  avatar: string;
  bio?: string;
  phone?: string;
  order: number;
}

export interface QuizQuestion {
  id: string;
  materiNumber: number; // 1, 2, or 3
  materiTag: string; // e.g. "Materi 1: Kelangkaan & Kebutuhan"
  question: string;
  options: string[];
  correctAnswer: number; // index 0, 1, 2, or 3 (A, B, C, D)
  explanation: string;
  isCustom?: boolean;
}

export interface StudyCaseNote {
  id: string;
  title: string;
  category: 'Kelangkaan' | 'Masalah Modern' | 'Sistem Ekonomi' | 'Umum';
  author: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'quiz' | 'group' | 'assignment';
}

export interface PriorityItem {
  id: string;
  name: string;
  category: 'Primer' | 'Sekunder' | 'Tersier';
  cost: number;
  urgency: 'Sangat Mendesak' | 'Mendesak' | 'Bisa Ditunda';
  description: string;
  selected: boolean;
}
