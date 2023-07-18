import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';
import Employee from './models/Employee';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

Sentry.init({
	dsn: 'https://43162651ea9d488eaed5095a43f9943f@o4504838824198144.ingest.sentry.io/4505421714882560',
	tracesSampleRate: 1,
	environment: env.NODE_ENV
});

export const handle = sequence(Sentry.sentryHandle(), (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/api/secure')) {
		const cookie = event.cookies.get('jwt')?.trim();

		console.log('Cookie: ', cookie);

		if (!cookie) {
			return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
		}

		jwt.verify(cookie, env.JWT_SECRET as string, async function (err) {
			if (err) {
				console.log(err);
				return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
			}

			await mongoose.connect(env.MONGO_CONNECTION_STRING);

			const employeeFromDb = await Employee.findOne({ sessions: cookie });

			// console.log(employeeFromDb);

			if (!employeeFromDb) {
				console.log('(hooks.server.ts) Redirecting to login', ' no employee found');
				return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
			}

			return resolve(event);
		});
	}

	return resolve(event);
}) satisfies Handle);

export const handleError = Sentry.handleErrorWithSentry();
