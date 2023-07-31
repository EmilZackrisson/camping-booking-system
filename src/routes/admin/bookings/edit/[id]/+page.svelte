<script lang="ts">
	import type { IBooking } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let booking = data.booking as IBooking;

	let caravanChecked = booking.Vehicles.includes('caravan');
	let motorhomeChecked = booking.Vehicles.includes('motorhome');

	let arrivalDate = new Date(booking.dateArrival).toISOString().split('T')[0];
	let departureDate = new Date(booking.dateDepart).toISOString().split('T')[0];
</script>

<h1>Bokning {booking._id}</h1>

<section>
	<form id="form">
		<h1>Bokningsformulär</h1>
		<label for="firstName">Förnamn</label>
		<input type="text" name="firstName" id="firstName" required bind:value={booking.firstName} />
		<label for="lastName">Efternamn</label>
		<input type="text" name="lastName" id="lastName" required bind:value={booking.lastName} />
		<label for="email">E-post</label>
		<input type="email" name="email" id="email" required bind:value={booking.email} />
		<label for="phone">Telefonnummer</label>
		<input type="tel" name="phone" id="phone" required bind:value={booking.phone} />
		<label for="arrivalDate">Ankomstdatum</label>
		<input type="date" name="arrivalDate" id="arrivalDate" required bind:value={arrivalDate} />
		<label for="departureDate">Avresedatum</label>
		<input
			type="date"
			name="departureDate"
			id="departureDate"
			required
			bind:value={departureDate}
		/>
		<label for="numberOfPersons">Antal Personer</label>
		<input
			type="number"
			name="numberOfPersons"
			id="numberOfPersons"
			required
			bind:value={booking.numberOfPersons}
		/>
		<p>Typ av boende</p>
		<div class="type">
			<div class="checkbox-row">
				<input type="checkbox" name="tent" id="tent" />
				<label for="tent">Tält</label>
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

		<label for="message">Meddelande</label>
		<textarea name="message" id="message" cols="30" rows="10" />
		<p>
			Genom att skicka detta formulär godkänner du att vi lagrar dina uppgifter i vårt
			bokningssystem.
		</p>

		<div class="checkbox-row">
			<input type="checkbox" name="gdpr" id="gdpr" required />
			<label for="gdpr">Jag godkänner att mina uppgifter lagras</label>
		</div>

		<button type="submit">Skicka</button>
	</form>
</section>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 500px;
		margin: 20px;
		padding: 1rem;
		background-color: #fff;
		border-radius: 5px;
	}

	label {
		margin-top: 1rem;
	}

	input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	input[type='checkbox'] {
		margin-left: 1rem;
	}

	button {
		margin-top: 1rem;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #eee;
		cursor: pointer;
	}

	.checkbox-row > input[type='checkbox'] {
		margin-left: 1rem;
	}

	textarea {
		max-width: 100%;
	}

	section {
		min-height: 100vh;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
