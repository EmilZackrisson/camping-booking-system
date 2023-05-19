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

<form on:submit={createAccount}>
	<label for="firstName">Förnamn</label>
	<input type="text" name="firstName" id="firstName" required />
	<label for="lastName">Efternamn</label>
	<input type="text" name="lastName" id="lastName" required />
	<label for="email">E-post</label>
	<input type="email" name="email" id="email" required />
	<label for="phone">Telefonnummer</label>
	<input type="tel" name="phone" id="phone" required />
	<select name="role" id="role">
		<option value="Admin">Administratör</option>
		<option value="Employee">Anställd</option>
	</select>
	<label for="password">Lösenord</label>
	<input type="password" name="password" id="password" required />
	<label for="passwordConfirm">Bekräfta lösenord</label>
	<input type="password" name="passwordConfirm" id="passwordConfirm" required />
	<button type="submit">Skapa</button>
</form>
