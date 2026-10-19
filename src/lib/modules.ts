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
  blue: { bg: '#E8EFFF', fg: '#2F5BD8' },
  green: { bg: '#E3F5EC', fg: '#1E8A57' },
  amber: { bg: '#FFF1DA', fg: '#B76E00' },
  rose: { bg: '#FDE7EC', fg: '#C2364F' },
  violet: { bg: '#EEE9FF', fg: '#6741D9' },
  teal: { bg: '#DFF4F2', fg: '#0F7F78' },
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
