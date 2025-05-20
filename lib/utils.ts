import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDurationBetweenDates(startDateStr: string, endDateStr: string): string {
  const start = new Date(startDateStr)
  const end = new Date(endDateStr)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid date'
  }

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const parts = []
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`)
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`)
  if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`)

  return parts.length > 0 ? parts.join(' ') : '0 days'
}

export function formatToMonthYear(dateStr: string): string {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function safeFormatDate(dateStr?: string) {
  if (!dateStr) return "No date";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
}

export function formatDateToMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-US', options);
}


export function getRandomString(): string {
        const options = [
            "/images/user1.svg",
            "/images/user2.svg",
            "/images/user3.svg",
            "/images/user1.svg",
            "/images/user2.svg",
        ];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }