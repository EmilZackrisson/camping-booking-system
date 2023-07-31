<script lang="ts">
	import type { PageData } from './$types';
	import Cookies from 'js-cookie';

	export let data: PageData;

	const account = data.body?.employee;
	data;

	async function logoutAllDevices() {
		const res = await fetch('/api/account/logout-all-devices', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + Cookies.get('jwt')
			}
		});

		console.log('Response', res);

		if (res.ok) {
			Cookies.remove('jwt');
			Cookies.remove('role');
			alert('Du är nu utloggad överallt.');
		} else {
			alert('Något gick fel.');
		}
	}
</script>

{#if !account}
	{#if data.status === 401}
		<main class="container text-center">
			<h1 class="text-xl">Du är inte inloggad</h1>
			<p>Du måste vara inloggad för att se denna sida.</p>
			<a href="/auth/login" class="btn btn-primary mt-3">Logga in</a>
		</main>
	{:else}
		<p>Något gick fel.</p>
	{/if}
{:else}
	<main class="container text-center">
		<h1 class="text-xl">Ditt konto</h1>
		<p>{account?.firstName} {account?.lastName}</p>
		<p>{account?.email}</p>
		<p>{account?.phone}</p>

		<button class="btn btn-secondary">Byt lösenord</button>

		<button class="btn btn-secondary" on:click={logoutAllDevices}>Logga ut överallt</button>
	</main>
{/if}
