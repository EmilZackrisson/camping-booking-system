<script lang="ts">
	async function createAccount(e: Event) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		let data = Object.fromEntries(formData.entries());

		if (data.password !== data.passwordConfirm) {
			alert('Lösenorden matchar inte');
			return;
		}

		await fetch('/admin/employees', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
</script>

<section>
	<form on:submit={createAccount}>
		<h1>Skapa konto för anställd</h1>
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
		<button type="submit">Skapa</button>
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

	select {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	button {
		margin-top: 1rem;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #eee;
		cursor: pointer;
	}
</style>
