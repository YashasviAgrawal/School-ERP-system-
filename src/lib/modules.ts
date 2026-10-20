import type { ComponentType } from 'react'
import {
  ArrowUpCircle,
  Award,
  Book,
  CalendarCheck,
  Cap,
  Chart,
  Clock,
  Folder,
  Megaphone,
  Rupee,
  Sun,
  Users,
  type IconProps,
} from '@/components/ui/Icons'

/** Soft tile + strong icon colour per module, so the grid reads at a glance. */
export type ModuleTone = 'blue' | 'green' | 'amber' | 'rose' | 'violet' | 'teal'

export const TONES: Record<ModuleTone, { bg: string; fg: string }> = {
  // earthy tones that sit with midnight navy and honey oak
  blue: { bg: '#E6EAF1', fg: '#3B5070' }, // slate
  green: { bg: '#E5EDE4', fg: '#4F7454' }, // sage
  amber: { bg: '#F5E8D4', fg: '#9A6A35' }, // honey oak
  rose: { bg: '#F6E4DD', fg: '#A4553C' }, // terracotta
  violet: { bg: '#EEE6EE', fg: '#7A5576' }, // mauve
  teal: { bg: '#E1ECEB', fg: '#3E7470' }, // muted teal
}

export type ErpModule = { title: string; line: string; icon: ComponentType<IconProps>; tone: ModuleTone }

/**
 * The ERP's real modules, matching the sidebar in ErpScreens.tsx.
 * Only list what the product actually does.
 */
export const MODULES: ErpModule[] = [
  { title: 'Dashboard', line: 'Students, staff, fees and attendance at a glance, every morning.', icon: Chart, tone: 'blue' },
  { title: 'Students', line: 'Profiles, parent details and documents in one searchable list.', icon: Cap, tone: 'violet' },
  { title: 'Teachers', line: 'Staff records, attendance, leave and substitutions.', icon: Users, tone: 'teal' },
  { title: 'Classes & attendance', line: 'Teachers mark it on their phone. The office sees it live.', icon: CalendarCheck, tone: 'green' },
  { title: 'Fees', line: 'Collections, receipts, dues and reminders, class by class.', icon: Rupee, tone: 'amber' },
  { title: 'Exams & results', line: 'Marks and results for every exam, ready to share.', icon: Award, tone: 'rose' },
  { title: 'Schedules', line: 'Timetables without clashes, and substitutes arranged for you.', icon: Clock, tone: 'blue' },
  { title: 'Diary notes', line: 'Homework and class notes that reach every student.', icon: Book, tone: 'violet' },
  { title: 'Announcements', line: 'Notices to parents, teachers or a single class in seconds.', icon: Megaphone, tone: 'rose' },
  { title: 'Holidays', line: 'One school calendar, shared with every app.', icon: Sun, tone: 'amber' },
  { title: 'Resources', line: 'Study material and files, organised by class and subject.', icon: Folder, tone: 'teal' },
  { title: 'Sessions & promotion', line: 'Close the year and move every class up in a few clicks.', icon: ArrowUpCircle, tone: 'green' },
]
