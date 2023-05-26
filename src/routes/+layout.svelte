<nav class="flex bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">Camping Booking System</a>
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

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
