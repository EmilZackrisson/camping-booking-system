<script lang="ts">
	import BookingCard from '../../../components/BookingCard.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import type { IBooking } from '$lib/types';

	export let data = {
		bookings: [],
		error: ''
	};

	const bookings: IBooking[] = JSON.parse(data.bookings as string).bookings;
	// console.log('Bookings', bookings);

	if (data.error) {
		toast.error(data.error as string, {
			duration: 5000
		});
	}
</script>

<Toaster />

<main class="container text-center">
	<h1 class="text-4xl font-bold">Bokningar</h1>
	<a href="/booking/new" class="btn btn-ghost">Skapa bokning</a>

	{#if bookings?.length === 0}
		<p>Inga bokningar</p>
	{:else if bookings}
		<section class="grid grid-cols-1 sm:grid-cols-3 gap-5">
			{#each bookings as booking}
				<div class="booking">
					<BookingCard data={booking} />
				</div>
			{/each}
		</section>
	{/if}
</main>
