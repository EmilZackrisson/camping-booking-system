import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const jwt = cookies.get('jwt');
	const role = cookies.get('role');
	return {
		user: {
			jwt,
			role
		}
	};
}) satisfies LayoutServerLoad;
