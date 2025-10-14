import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(text: string | null, maxLength: number): string {
    if (!text) return "-"
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
  }

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong!";
}