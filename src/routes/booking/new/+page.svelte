<script lang="ts">
	let caravanChecked = false;
	let motorhomeChecked = false;

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	// Client API:
	const { form } = superForm(data.form, {
		onUpdate: (form) => {
			console.log(form);
		}
	});

	let caravanData: {
		length: number;
		width: number;
		regNr: string;
	} = {
		length: 0,
		width: 0,
		regNr: ''
	};

	let motorhomeData: {
		length: number;
		width: number;
		regNr: string;
	} = {
		length: 0,
		width: 0,
		regNr: ''
	};

	async function postForm(form: Event) {
		const formData = new FormData(form.target as HTMLFormElement);
		let data = Object.fromEntries(formData.entries());

		// Make a string of the type of accommodation
		let typeOfAccommodation = '';
		if (data.tent) {
			typeOfAccommodation += 'Tält, ';
		}
		if (data.caravan) {
			typeOfAccommodation += 'Husvagn, ';
			caravanData.length = Number(data.caravanLength);
			caravanData.width = Number(data.caravanWidth);
			caravanData.regNr = data.caravanRegNr as string;

			delete data.caravanLength;
			delete data.caravanWidth;
			delete data.caravanRegNr;

			data.caravanData = JSON.stringify(caravanData);
		}
		if (data.motorhome) {
			typeOfAccommodation += 'Husbil, ';
			motorhomeData.length = Number(data.motorhomeLength);
			motorhomeData.width = Number(data.motorhomeWidth);
			motorhomeData.regNr = data.motorhomeRegNr as string;

			delete data.motorhomeLength;
			delete data.motorhomeWidth;
			delete data.motorhomeRegNr;

			data.motorhomeData = JSON.stringify(motorhomeData);
		}
		if (data.cottage) {
			typeOfAccommodation += 'Stuga, ';
		}
		typeOfAccommodation = typeOfAccommodation.slice(0, -2);

		// Remove the checkboxes from the data object
		delete data.tent;
		delete data.caravan;
		delete data.motorhome;
		delete data.cottage;

		// Add the type of accommodation to the data object
		data.typeOfAccommodation = typeOfAccommodation;

		// Check if date is valid
		if (data.arrivalDate > data.departureDate) {
			alert('Ankomstdatum kan inte vara senare än avresedatum');
			return;
		}
		if (data.arrivalDate < new Date().toISOString().slice(0, 10)) {
			alert('Ankomstdatum kan inte vara tidigare än dagens datum');
			return;
		}

		// Check if number of persons is valid
		if (data.numberOfPersons < '1') {
			alert('Antal personer måste vara minst 1');
			return;
		}

		// Check if gdpr is checked
		if (!data.gdpr) {
			alert('Du måste godkänna att dina uppgifter lagras');
			return;
		}

		// Check if motorhome reg nr is filled in
		if (data.motorhomeRegNr === '' && data.motorhomeLength !== undefined) {
			alert('Du måste fylla i registreringsnummer på husbilen');
			return;
		}

		// Check if caravan reg nr is filled in
		if (data.caravanRegNr === '' && data.caravanLength !== undefined) {
			alert('Du måste fylla i registreringsnummer på husvagnen');
			return;
		}

		try {
			console.log(data);

			await fetch('http://localhost:5173/api/booking', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(() => {
					console.log('Success');
					const form: HTMLFormElement = document.getElementById('form') as HTMLFormElement;
					form.reset();
					alert('Bokning skickad!');
				})
				.catch((err) => {
					console.log(err);
					alert('Något gick fel, försök igen');
				});
		} catch (error) {
			console.error('Error adding document: ', error);
		}
	}
</script>

<SuperDebug data={$form} />

<section class="flex justify-center m-5">
	<form method="POST" id="form" class="w-2/5 flex flex-col">
		<h1 class="text-4xl text-center font-semibold">Bokningsformulär</h1>
		<label for="firstName">Förnamn</label>
		<input type="text" name="firstName" id="firstName" required bind:value={$form.firstName} />
		<label for="lastName">Efternamn</label>
		<input type="text" name="lastName" id="lastName" required bind:value={$form.lastName} />
		<label for="email">E-post</label>
		<input type="email" name="email" id="email" required bind:value={$form.email} />
		<label for="phone">Telefonnummer</label>
		<input type="tel" name="phone" id="phone" required bind:value={$form.phone} />
		<label for="arrivalDate">Ankomstdatum</label>
		<input
			type="date"
			name="arrivalDate"
			id="arrivalDate"
			required
			bind:value={$form.dateArrival}
		/>
		<label for="departureDate">Avresedatum</label>
		<input
			type="date"
			name="departureDate"
			id="departureDate"
			required
			bind:value={$form.dateDepart}
		/>
		<label for="numberOfPersons">Antal Personer</label>
		<input
			type="number"
			name="numberOfPersons"
			id="numberOfPersons"
			required
			bind:value={$form.numberOfPersons}
		/>
		<div class="divider" />
		<p>Typ av boende</p>
		<div class="type flex flex-col gap-2">
			<div class="checkbox-row">
				<input type="checkbox" id="tent" name="tent" />
				<label for="tent" class="label-text">Tält</label>
			</div>
			<div class="checkbox-row">
				<input type="checkbox" name="caravan" id="caravan" bind:checked={caravanChecked} />
				<label for="caravan">Husvagn</label>
			</div>
			<div class="checkbox-row">
				<input type="checkbox" name="motorhome" id="motorhome" bind:checked={motorhomeChecked} />
				<label for="motorhome">Husbil</label>
			</div>
			<div class="checkbox-row">
				<input type="checkbox" name="cottage" id="cottage" />
				<label for="cottage">Stuga</label>
			</div>
		</div>

		{#if motorhomeChecked}
			<label for="motorhomeLength">Längd på husbil</label>
			<input type="number" name="motorhomeLength" id="motorhomeLength" />
			<label for="motorhomeWidth">Bredd på husbil</label>
			<input type="number" name="motorhomeWidth" id="motorhomeWidth" />
			<label for="motorhomeRegNr">Registeringsnummer på husbil*</label>
			<input type="text" name="motorhomeRegNr" id="motorhomeRegNr" />
		{/if}

		{#if caravanChecked}
			<label for="caravanLength">Längd på husvagn</label>
			<input type="number" name="caravanLength" id="caravanLength" />
			<label for="caravanWidth">Bredd på husvagn</label>
			<input type="number" name="caravanWidth" id="caravanWidth" />
			<label for="caravanRegNr">Registeringsnummer på husvagn</label>
			<input type="text" name="caravanRegNr" id="caravanRegNr" />
		{/if}

		<div class="divider" />

		<label for="message">Meddelande</label>
		<textarea name="message" id="message" cols="30" rows="10" />

		<div class="divider" />

		<p>
			Genom att skicka detta formulär godkänner du att vi lagrar dina uppgifter i vårt
			bokningssystem.
		</p>

		<div class="checkbox-row">
			<input type="checkbox" name="gdpr" id="gdpr" required />
			<label for="gdpr">Jag godkänner att mina uppgifter lagras</label>
		</div>

		<button type="submit" class="btn btn-primary mt-2">Skicka</button>
	</form>
</section>

<style lang="postcss">
	input[type='checkbox'] {
		@apply checkbox checkbox-primary;
	}

	label {
		@apply label-text;
	}

	input[type='text'],
	input[type='email'],
	input[type='tel'],
	input[type='number'],
	input[type='date'] {
		@apply input input-bordered w-full;
	}

	textarea {
		@apply textarea textarea-bordered;
	}

	.checkbox-row {
		@apply flex items-center mt-1;
	}

	.checkbox-row > label {
		@apply ml-2;
	}
</style>
