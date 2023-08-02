<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import Cookies from 'js-cookie';
	import type { PageData } from '../routes/$types';

	export let userData: PageData;

	async function logout() {
		Cookies.remove('role');
		Cookies.remove('jwt');

		await fetch('/auth/logout', {
			method: 'POST'
		}).then((res) => {
			if (res.ok) redirect(303, '/');
		});
	}
</script>

<nav class="navbar bg-base-100">
	<div class="navbar-start">
		<!-- Dropdown navigation for mobile devices -->

		<details class="dropdown lg:hidden">
			<summary class="btn btn-ghost">
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
			</summary>
			<ul class="p-4 absolute bg-base-200 rounded-lg shadow w-36 flex flex-col gap-3">
				<li><a href="/">Hem</a></li>
				<li class="cursor-pointer">
					<details class="dropdown">
						<summary>Admin</summary>
						<ul class="p-3 flex flex-col gap-2">
							<li><a href="/admin/bookings">Bokningar</a></li>
							{#if userData.user.role === 'Admin'}
								<li><a href="/admin/employees">Anställda</a></li>
							{/if}
							<li><a href="/admin/accomodations">Boenden</a></li>
						</ul>
					</details>
				</li>
				<li><a href="/booking/new">Skapa bokning</a></li>
				{#if userData.user.jwt === undefined}
					<li><a href="/auth/login">Logga in</a></li>
				{:else}
					<li><button on:click={logout} class="hover:btn-error">Logga ut</button></li>
				{/if}
			</ul>
		</details>

		<a href="/" class="btn btn-ghost normal-case text-xl font-bold hidden lg:inline-flex"
			>Camping Booking System</a
		>
	</div>

	<div class="navbar-end lg:hidden">
		<a href="/" class="btn btn-ghost normal-case text-xl font-bold">Camping Booking System</a>
	</div>

	<!-- Navigation for bigger screens-->
	<div class="navbar-end hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Hem</a></li>
			<li>
				<details class="dropdown">
					<summary class="justify-between"> Admin </summary>
					<ul class="p-2">
						<li><a href="/admin/bookings">Bokningar</a></li>
						{#if userData.user.role === 'Admin'}
							<li><a href="/admin/employees">Anställda</a></li>
						{/if}
						<li><a href="/admin/accomodations">Boenden</a></li>
					</ul>
				</details>
			</li>
			<li><a href="/booking/new">Skapa bokning</a></li>
			{#if userData.user.jwt === undefined}
				<li><a href="/auth/login">Logga in</a></li>
			{:else}
				<li><button on:click={logout} class="hover:btn-error">Logga ut</button></li>
			{/if}
		</ul>
	</div>
</nav>
