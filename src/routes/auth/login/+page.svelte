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

<section>
	<form on:submit={login}>
		<h1>Logga in</h1>
		<label for="email"> E-post </label>
		<input name="email" type="email" id="email" />

		<label for="password"> Lösenord </label>
		<input name="password" type="password" id="password" />

		<button type="submit">Logga in</button>
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
		max-width: 400px;
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

	section {
		background-image: url('../../../CampStoraBlaSjon-5-scaled.jpg');
		background-size: cover;
		background-position: center; /* Center the image */
		background-repeat: no-repeat; /* Do not repeat the image */
		min-height: 100vh;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
