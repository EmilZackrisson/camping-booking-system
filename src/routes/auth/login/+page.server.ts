import type { Actions } from './$types';
import Employee from '../../../models/Employee.js';
import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';
import type { IEmployee } from '$lib/types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password')?.toString() as string;

		mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const employee: IEmployee | null = await Employee.findOne({ email: email });

		if (!employee) {
			return new Response(JSON.stringify({ code: 401 }));
		}

		const storedPasswordHash = employee.passwordHash as string;

		const isPasswordCorrect = await bcrypt.compare(password, storedPasswordHash);

		console.log(isPasswordCorrect);

		if (!isPasswordCorrect) {
			return new Response(JSON.stringify({ code: 401 }));
		}

		const expires = new Date();
		expires.setDate(expires.getDate() + 7);

		const jwtToken = jwt.sign(
			{
				id: employee._id,
				email: employee.email
			},
			env.JWT_SECRET as string,
			{
				expiresIn: '7d'
			}
		);

		const { role } = employee;

		employee.sessions.push(jwtToken);

		await employee.save();

		cookies.set('jwt', jwtToken, {
			path: '/',
			expires: expires
		});

		cookies.set('role', role, {
			path: '/',
			expires: expires
		});

		throw redirect(303, '/admin');
	}
} satisfies Actions;
