/* eslint-disable no-restricted-syntax */
import { clsx, type ClassValue } from 'clsx';
import { format, parseISO, addHours } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRuntime = (minutes: number): string => {
  const formattedRuntime = format(new Date(0, 0, 0, 0, minutes), "H'h' m'm'");
  return formattedRuntime;
};

export const convertToUTC = (
  dateString: string,
  outputFormat: string = 'yyyy-MM-dd HH:mm:ss'
): string => {
  const parsedDate = parseISO(dateString);
  const utcDate = addHours(parsedDate, -parsedDate.getTimezoneOffset() / 60);
  const formattedDate = format(utcDate, outputFormat);
  return formattedDate;
};
