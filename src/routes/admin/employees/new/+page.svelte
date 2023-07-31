<script lang="ts">
	import { toast, Toaster } from 'svelte-french-toast';
	import type { PageData } from './$types';

	async function createAccount(e: Event) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		let data = Object.fromEntries(formData.entries());

		if (data.password !== data.passwordConfirm) {
			alert('Lösenorden matchar inte');
			return;
		}

		await fetch('/api/secure/employee', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => {
				if (res.status === 200) {
					toast.success('Kontot skapades', {
						duration: 3000,
						position: 'top-right'
					});

					// Redirect user to admin page after 3 seconds
					setTimeout(() => {
						window.location.href = '/admin/employees';
					}, 3000);
				} else {
					toast.error('Kunde inte skapa konto', {
						duration: 3000,
						position: 'top-right'
					});
				}
			})
			.catch((err) => {
				console.error(err);
				toast.error('Kunde inte skapa konto', {
					duration: 3000,
					position: 'top-right'
				});
			});
	}
</script>

<Toaster />
<section>
	<form on:submit={createAccount} class="container flex flex-col gap-3">
		<h1 class="text-3xl font-semibold text-center">Skapa konto för anställd</h1>
		<label for="firstName">Förnamn</label>
		<input type="text" name="firstName" id="firstName" required />
		<label for="lastName">Efternamn</label>
		<input type="text" name="lastName" id="lastName" required />
		<label for="email">E-post</label>
		<input type="email" name="email" id="email" required />
		<label for="phone">Telefonnummer</label>
		<input type="tel" name="phone" id="phone" required />
		<label for="role">Roll</label>
		<select name="role" id="role">
			<option value="Employee">Anställd</option>
			<option value="Admin">Administratör</option>
		</select>
		<label for="password">Lösenord</label>
		<input type="password" name="password" id="password" required />
		<label for="passwordConfirm">Bekräfta lösenord</label>
		<input type="password" name="passwordConfirm" id="passwordConfirm" required />
		<button type="submit" class="btn btn-primary">Skapa konto för anställd</button>
	</form>
</section>

<style lang="postcss">
	form {
		@apply w-full max-w-lg;
	}

	input {
		@apply input input-bordered w-full;
	}

	select {
		@apply select select-bordered w-full;
	}
</style>
