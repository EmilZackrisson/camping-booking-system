import type { PageServerLoad } from './$types';
import { getBookings } from '$lib/db';
import { serializeNonPOJOs } from '$lib/utils';
import type { IBooking } from '$lib/types';

export const load = (async () => {
	const bookings = serializeNonPOJOs(await getBookings()) as IBooking[];
	console.log(bookings);
	return {
		bookings
	};
}) satisfies PageServerLoad;
