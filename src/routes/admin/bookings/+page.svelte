<script lang="ts">
	import BookingCard from '../../../components/BookingCard.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import type { IBooking } from '$lib/types';
	import { onMount } from 'svelte';
	import { bookingsStore } from '$lib/stores';
	import type { PageData } from './$types';

	let bookings: IBooking[] = [];

	export let data: PageData;

	bookings = data.bookings as IBooking[];
</script>

<Toaster />

<main class="container text-center">
	<h1 class="text-4xl font-bold">Bokningar</h1>
	<a href="/booking/new" class="btn btn-ghost">Skapa bokning</a>
	{#if bookings?.length === 0}
		<p>Inga bokningar</p>
	{:else if bookings}
		<section class="grid grid-cols-1 sm:grid-cols-3 gap-5">
			{#each bookings as booking (booking._id)}
				<div class="booking">
					<BookingCard data={booking} />
				</div>
			{/each}
		</section>
	{/if}
</main>
