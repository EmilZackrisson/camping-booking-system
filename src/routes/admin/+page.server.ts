import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const jwt = cookies.get('jwt');
	const role = cookies.get('role');
	return {
		user: {
			role,
			jwt
		}
	};
}) satisfies PageServerLoad;
