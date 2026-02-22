import { type ClassDictionary, type ClassValue as ClsxClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ClassValue = ClassValue[] | ClassDictionary | string;

export function cn(...inputs: ClsxClassValue[]) {
  return twMerge(clsx(inputs));
}
