<script lang="ts">
	import Cookies from 'js-cookie';

	async function login(e: Event) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		let data = Object.fromEntries(formData.entries());

		const response = await fetch('/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		if (result.token !== undefined) {
			// window.location.href = "/booking";
			console.log(result);

			localStorage.setItem('token', result.token);
			Cookies.set('token', result.token, { expires: 7 });

			window.location.href = '/admin';
		} else {
			alert(result.status);
		}
	}
</script>

<form on:submit={login}>
	<h1>Logga in</h1>
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button type="submit">Log in</button>
</form>

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

	button {
		margin-top: 1rem;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #eee;
		cursor: pointer;
	}
</style>
