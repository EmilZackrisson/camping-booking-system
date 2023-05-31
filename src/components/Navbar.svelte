<nav class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</button>
			<ul class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
				<li><a href="/">Hem</a></li>
				<li>
					<a class="justify-between" href="/admin">
						Admin
						<svg
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
						>
					</a>
					<ul class="p-2">
						<li><a href="/admin/bookings">Bokningar</a></li>
						<li><a href="/admin/employees">Anställda</a></li>
						<li><a href="/admin/accomodations">Boenden</a></li>
					</ul>
				</li>
				<li><a href="/booking/new">Skapa bokning</a></li>
			</ul>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl font-bold hidden lg:inline-flex"
			>Camping Booking System</a
		>
	</div>

	<div class="navbar-end lg:hidden">
		<a href="/" class="btn btn-ghost normal-case text-xl font-bold">Camping Booking System</a>
	</div>

	<div class="navbar-end hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Hem</a></li>
			<li>
				<a class="justify-between" href="/admin">
					Admin
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
					>
				</a>
				<ul class="p-2 shadow">
					<li><a href="/admin/bookings">Bokningar</a></li>
					<li><a href="/admin/employees">Anställda</a></li>
					<li><a href="/admin/accomodations">Boenden</a></li>
				</ul>
			</li>
			<li><a href="/booking/new">Skapa bokning</a></li>
		</ul>
	</div>
</nav>
