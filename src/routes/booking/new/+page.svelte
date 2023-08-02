<script lang="ts">
	import { toast, Toaster } from 'svelte-french-toast';

	let accomodationsChoosed: any[] = [];

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

		// Check witch accomodation is choosed
		if (accomodationsChoosed.includes('Husvagn')) {
			caravanData.length = Number(data.caravanLength);
			caravanData.width = Number(data.caravanWidth);
			caravanData.regNr = data.caravanRegNr as string;

			delete data.caravanLength;
			delete data.caravanWidth;
			delete data.caravanRegNr;

			data.caravanData = JSON.stringify(caravanData);
		}
		if (accomodationsChoosed.includes('Husbil')) {
			motorhomeData.length = Number(data.motorhomeLength);
			motorhomeData.width = Number(data.motorhomeWidth);
			motorhomeData.regNr = data.motorhomeRegNr as string;

			delete data.motorhomeLength;
			delete data.motorhomeWidth;
			delete data.motorhomeRegNr;

			data.motorhomeData = JSON.stringify(motorhomeData);
		}

		// Remove the checkboxes from the data object
		delete data.tent;
		delete data.caravan;
		delete data.motorhome;
		delete data.cottage;

		// Add the type of accommodation to the data object
		data.typeOfAccommodation = accomodationsChoosed.join(', ');

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
		if (data.motorhomeRegNr === '' && data.motorhomeLength) {
			alert('Du måste fylla i registreringsnummer på husbilen');
			return;
		}

		// Check if caravan reg nr is filled in
		if (data.caravanRegNr === '' && data.caravanLength) {
			alert('Du måste fylla i registreringsnummer på husvagnen');
			return;
		}

		try {
			console.log(data);

			await fetch(`/api/booking`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(async (data) => {
				const body = await data.json();
				if (data.status !== 200 || body.error) {
					alert('Något gick fel, försök igen');
					return;
				}
				console.log('Success');
				const form: HTMLFormElement = document.getElementById('form') as HTMLFormElement;
				form.reset();
				toast.success('Bokning skickad!', {
					duration: 5000
				});
			});
		} catch (error) {
			console.error('Error adding document: ', error);
			toast.error('Något gick fel, försök igen', {
				duration: 5000
			});
		}
	}
</script>

<section>
	<Toaster />
	<form on:submit={postForm} id="form" class="container flex flex-col max-w-xl">
		<h1 class="text-center text-3xl font-semibold">Bokningsformulär</h1>
		<label for="firstName">Förnamn</label>
		<input type="text" name="firstName" id="firstName" required />
		<label for="lastName">Efternamn</label>
		<input type="text" name="lastName" id="lastName" required />
		<label for="email">E-post</label>
		<input type="email" name="email" id="email" required />
		<label for="phone">Telefonnummer</label>
		<input type="tel" name="phone" id="phone" required />
		<label for="dateArrival">Ankomstdatum</label>
		<input type="date" name="dateArrival" id="dateArrival" required />
		<label for="dateDepart">Avresedatum</label>
		<input type="date" name="dateDepart" id="dateDepart" required />
		<label for="numberOfPersons">Antal Personer</label>
		<input type="number" name="numberOfPersons" id="numberOfPersons" required />
		<div class="divider" />
		<p>Typ av boende</p>
		<div class="type">
			<div class="checkbox-row">
				<input type="checkbox" id="tent" bind:group={accomodationsChoosed} value="Tält" />
				<label for="tent">Tält</label>
			</div>
			<div class="checkbox-row">
				<input type="checkbox" id="caravan" bind:group={accomodationsChoosed} value="Husvagn" />
				<label for="caravan">Husvagn</label>
			</div>
			<div class="checkbox-row">
				<input type="checkbox" id="motorhome" bind:group={accomodationsChoosed} value="Husbil" />
				<label for="motorhome">Husbil</label>
			</div>
			<div class="checkbox-row">
				<input type="checkbox" id="cottage" bind:group={accomodationsChoosed} value="Stuga" />
				<label for="cottage">Stuga</label>
			</div>
		</div>

		{#if accomodationsChoosed.includes('Husbil')}
			<label for="motorhomeLength">Längd på husbil</label>
			<input type="number" name="motorhomeLength" id="motorhomeLength" />
			<label for="motorhomeWidth">Bredd på husbil</label>
			<input type="number" name="motorhomeWidth" id="motorhomeWidth" />
			<label for="motorhomeRegNr">Registeringsnummer på husbil*</label>
			<input type="text" name="motorhomeRegNr" id="motorhomeRegNr" />
		{/if}

		{#if accomodationsChoosed.includes('Husvagn')}
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

		<button type="submit" class="btn mb-5">Skicka</button>
	</form>
</section>

<style>
	input[type='text'],
	input[type='email'],
	input[type='tel'],
	input[type='number'],
	input[type='date'] {
		@apply input input-bordered w-full;
	}

	input[type='checkbox'] {
		@apply checkbox;
	}

	textarea {
		@apply textarea textarea-bordered w-full;
	}

	label {
		@apply label-text;
	}

	.checkbox-row {
		@apply flex items-center gap-2 mb-2;
	}
</style>
