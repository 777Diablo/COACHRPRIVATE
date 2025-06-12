import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const swalClass = {
  cancelButton: 'swal_cancel_btn',
  confirmButton: 'swal_confirm_btn',
};