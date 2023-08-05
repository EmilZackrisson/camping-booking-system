<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col">
	<h1 class="text-center text-4xl font-semibold">Administration</h1>
	<div class="flex gap-3 justify-center align-middle m-5">
		<a href="/admin/bookings" class="btn btn-primary">Bokningar</a>
		<a href="/admin/accomodations" class="btn btn-primary">Boenden</a>

		{#if data.user.role === 'Admin'}
			<a href="/admin/employees" class="btn btn-primary">Anställda</a>
		{/if}
	</div>
</section>
