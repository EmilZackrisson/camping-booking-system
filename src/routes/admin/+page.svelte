<script lang="ts">
	import Cookies from 'js-cookie';

	const role = Cookies.get('role');
</script>

<section class="flex flex-col">
	<h1 class="text-center text-4xl font-semibold">Administration</h1>
	<div class="flex gap-3 justify-center align-middle m-5">
		<a href="/admin/bookings">Bokningar</a>
		<a href="/admin/accomodations">Boenden</a>

		{#if role === 'Admin'}
			<a href="/admin/employees">Anställda</a>
		{/if}
	</div>
</section>

<style>
	a {
		@apply text-blue-500 bg-base-200 p-5 rounded-md;
	}
</style>
