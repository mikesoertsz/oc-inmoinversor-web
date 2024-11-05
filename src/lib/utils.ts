import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function limit<T>(arr: T[], limit: number) {
  return arr.slice(0, limit);
}
