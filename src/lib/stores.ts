import { writable } from 'svelte/store';
import type { IBooking } from './types';

export const bookingsStore = writable<IBooking[]>([]);
