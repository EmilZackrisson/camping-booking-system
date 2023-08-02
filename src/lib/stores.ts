import { writable } from 'svelte/store';
import type { IBooking } from './types';

export const bookingsStore = writable<IBooking[]>([]);

export const userStore = writable<{ jwt: string; role: string } | null>(null);
