import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function getYear(date: string | Date): number {
  return new Date(date).getFullYear();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function getRegionBadgeClass(region: string): string {
  switch (region) {
    case 'ARCTIC':
      return 'badge-arctic';
    case 'ANTARCTIC':
      return 'badge-antarctic';
    case 'HIMALAYA':
      return 'badge bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20';
    case 'SOUTHERN_OCEAN':
      return 'badge bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20';
    default:
      return 'badge bg-surface-500/10 text-surface-400';
  }
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return 'badge-completed';
    case 'ONGOING':
      return 'badge-ongoing';
    case 'PLANNED':
      return 'badge-planned';
    case 'DRAFT':
      return 'badge bg-surface-500/10 text-surface-400';
    case 'REVIEW':
      return 'badge bg-amber-500/10 text-amber-400';
    case 'APPROVED':
      return 'badge bg-green-500/10 text-green-400';
    case 'PUBLISHED':
      return 'badge bg-polar-500/10 text-polar-400';
    default:
      return 'badge bg-surface-500/10 text-surface-400';
  }
}

export const REGION_LABELS: Record<string, string> = {
  ARCTIC: 'Arctic',
  ANTARCTIC: 'Antarctic',
  HIMALAYA: 'Himalaya',
  SOUTHERN_OCEAN: 'Southern Ocean',
};

export const STATUS_LABELS: Record<string, string> = {
  PLANNED: 'Planned',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};
