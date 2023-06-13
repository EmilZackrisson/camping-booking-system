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

			Cookies.set('token', result.token, { expires: 7 });
			Cookies.set('expires', result.expires, { expires: 7 });
			Cookies.set('role', result.role, { expires: 7 });

			window.location.href = '/admin';
		} else {
			alert(result.status);
		}
	}
</script>

<section>
	<form on:submit={login} class="flex p-5 bg-base-100 rounded-md flex-col container max-w-2xl">
		<h1 class="text-xl">Logga in</h1>
		<div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text">E-post</span>
			</label>
			<input type="text" id="email" name="email" class="input input-bordered w-full" />
		</div>

		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text">Lösenord</span>
			</label>
			<input type="password" id="password" name="password" class="input input-bordered w-full" />
		</div>

		<button type="submit" class="btn btn-primary mt-3">Logga in</button>
	</form>
</section>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
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
