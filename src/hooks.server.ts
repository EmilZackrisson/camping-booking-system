import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';
import Employee from './models/Employee';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/api/secure')) {
		const cookie = event.cookies.get('token');

		if (!cookie) {
			return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
		}

		const expires = event.cookies.get('expires');

		if (!cookie || !expires) {
			console.log('Redirecting to login', cookie, expires);
			return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
		}

		const now = new Date();
		const expiresDate = new Date(expires);

		if (now > expiresDate) {
			console.log('Redirecting to login', now, expiresDate);
			return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
		}

		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const employeeFromDb = await Employee.findOne({ sessions: { $elemMatch: { token: cookie } } });

		await mongoose.disconnect();

		if (!employeeFromDb) {
			console.log('Redirecting to login', ' no employee found');
			return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
		}

		return resolve(event);
	}

	return resolve(event);
}) satisfies Handle;
