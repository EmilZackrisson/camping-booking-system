import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	phone: z.string(),
	dateArrival: z.date(),
	dateDepart: z.date(),
	numberOfPersons: z.number(),
	Vehicles: z.array(
		z
			.object({
				length: z.number().optional(),
				width: z.number().optional(),
				regNr: z.string()
			})
			.optional()
	),
	Accommodations: z.string(),
	notes: z.string().optional()
});

export const load = async () => {
	// Server API:
	const form = await superValidate(schema);
	console.log('POST', form);

	if (!form.valid) {
		return fail(400, { form });
	}

	// Always return { form } in load and form actions.
	return { form };
};
