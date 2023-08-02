<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col">
	<h1 class="text-center text-4xl font-semibold">Administration</h1>
	<div class="flex gap-3 justify-center align-middle m-5">
		<a href="/admin/bookings">Bokningar</a>
		<a href="/admin/accomodations">Boenden</a>

		{#if data.user.role === 'Admin'}
			<a href="/admin/employees">Anställda</a>
		{/if}
	</div>
</section>
