<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let firstName: string;
	let lastName: string;
	let email: string;
	let phone: string;
	let password: string;
	let password2: string;

	export let data: any;
	console.log(data);

	if (browser) {
		if (data.status === 302) {
			goto('/admin');
		}
	}

	async function createAccount() {
		if (password !== password2) {
			alert('Lösenorden matchar inte');
			return;
		}

		const response = await fetch('/setup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password,
				phone
			})
		});

		if (response.status === 200) {
			alert('Konto skapat');
			window.location.href = '/admin';
		} else {
			alert('Något gick fel');
		}
	}
</script>

<main>
	<h1>Setup</h1>
	<p>Setup page</p>

	<form action="POST" on:submit|preventDefault={createAccount}>
		<label for="firstName">Förnamn</label>
		<input
			type="text"
			id="firstName"
			name="firstName"
			placeholder="Förnamn"
			required
			bind:value={firstName}
		/>

		<label for="lastName">Efternamn</label>
		<input
			type="text"
			id="lastName"
			name="lastName"
			placeholder="Efternamn"
			required
			bind:value={lastName}
		/>

		<label for="email">Email</label>
		<input type="email" id="email" name="email" placeholder="Email" required bind:value={email} />

		<label for="phone">Telefonnummer</label>
		<input
			type="tel"
			id="phone"
			name="phone"
			placeholder="Telefonnummer"
			required
			bind:value={phone}
		/>

		<label for="password">Lösenord</label>
		<input
			type="password"
			id="password"
			name="password"
			placeholder="Lösenord"
			required
			bind:value={password}
		/>

		<label for="password2">Upprepa Lösenord</label>
		<input
			type="password"
			id="password2"
			name="password2"
			placeholder="Upprepa Lösenord"
			required
			bind:value={password2}
		/>

		<button type="submit">Skapa konto</button>
	</form>
</main>
