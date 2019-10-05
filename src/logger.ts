import { Dictionary } from 'express-serve-static-core';

interface Type {
  color: string;
  label: string;
}

const TYPES: Dictionary<Type> = {
  INFO: { color: '\x1b[36m', label: 'INFO' },
  FINE: { color: '\x1b[32m', label: 'INFO' },
  WARN: { color: '\x1b[33m', label: 'WARN' },
  ERROR: { color: '\x1b[31m', label: 'ERROR' },
};

function currentTime(): string {
  const addZeros = (number: number): string =>
    number.toString().padStart(2, '0');

  const date = new Date();
  const hours = addZeros(date.getHours());
  const minutes = addZeros(date.getMinutes());
  const seconds = addZeros(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}

function colorize(message: string, color: string): string {
  return `${color}${message}\x1b[0m`;
}

function log(type: Type, message: any): void {
  const logHeader =
    `${colorize(currentTime(), '\x1b[35m')} ` +
    ` [${colorize(type.label, type.color)}]`;

  console.log(logHeader, message);
}

export default {
  info(message: any) {
    log(TYPES['INFO'], message);
  },
  fine(message: any) {
    log(TYPES['FINE'], message);
  },
  warn(message: any) {
    log(TYPES['WARN'], message);
  },
  error(message: any) {
    log(TYPES['ERROR'], message);
  },
};
