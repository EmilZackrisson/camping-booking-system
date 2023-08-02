<section>
	<form method="POST" class="flex p-5 bg-base-100 rounded-md flex-col container max-w-2xl">
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
