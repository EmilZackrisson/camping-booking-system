import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import Employee from '../../../models/Employee';
import mongoose from 'mongoose';

export const POST = (async ({ cookies }) => {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

		const cookie = cookies.get('jwt')?.trim();

		if (!cookie) {
			return new Response(JSON.stringify({ code: 401 }));
		}

		Employee.deleteOne({ sessions: cookie });

		return new Response(JSON.stringify({ code: 200 }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ code: 500 }));
	}
}) satisfies RequestHandler;
