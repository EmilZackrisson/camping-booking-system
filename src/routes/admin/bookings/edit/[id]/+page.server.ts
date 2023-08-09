import type { PageServerLoad } from './$types';

export const load = (async ({ params, cookies, url }) => {
	try {
		const id = params.id.replace('$', '');

		const booking = await fetch(`${url.origin}/api/booking?id=${id}`, {
			headers: {
				cookie: `jwt=${cookies.get('jwt')}`
			}
		});

		if (!booking) {
			return new Response(JSON.stringify({ error: 'Booking not found', status: 404 }));
		}

		return {
			booking: booking
		};
	} catch (error) {
		console.error('Error in /admin/bookings/edit/id', error);
		return { error };
	}
}) satisfies PageServerLoad;
