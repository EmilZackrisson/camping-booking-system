import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import Employee from './models/Employee';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/admin')) {
		const cookie = event.cookies.get('token');
		if (!cookie) {
			return new Response('Unauthorized', { status: 401 });
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

		await mongoose.connect(MONGO_CONNECTION_STRING);

		const employeeFromDb = await Employee.findOne({ sessions: { $elemMatch: { token: cookie } } });

		await mongoose.disconnect();

		if (!employeeFromDb) {
			console.log('Redirecting to login', ' no employee found');
			return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
		}

		const response = await resolve(event);
		return response;
	}

	const response = await resolve(event);
	return response;
}
