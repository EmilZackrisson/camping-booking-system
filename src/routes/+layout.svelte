<nav class="flex bg-base-100">
	<div class="flex-1">
		<h3 class="btn btn-ghost normal-case text-xl">Camping Booking System</h3>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li>
				<a href="/admin">Admin</a>
			</li>
			<li>
				<a href="/admin/employees">Anställda</a>
			</li>
			<li>
				<a href="/admin/bookings">Bokningar</a>
			</li>
		</ul>
	</div>
</nav>

<slot />

<!-- <style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}

	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
	}

	ul {
		display: flex;
		list-style: none;
	}

	li {
		margin: 0 1rem;
	}

	a {
		text-decoration: none;
		color: #000;
	}

	.left {
		margin-left: auto;
	}

	.right {
		margin-right: 3rem;
	}

	h3 {
		margin-left: 5px;
	}
</style> -->

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
