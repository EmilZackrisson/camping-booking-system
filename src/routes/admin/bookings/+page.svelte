<script lang="ts">
	import BookingCard from '../../../components/BookingCard.svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	/** @type {import('./$types').PageData} */
	export let data: any;

	console.log(data);

	if (data.error) {
		toast.error(data.error, {
			duration: 5000
		});
	}
	const { bookings } = data;
</script>

<Toaster />

<main class="container text-center">
	<h1 class="text-4xl font-bold">Bokningar</h1>
	<a href="/booking/new" class="btn btn-ghost">Skapa bokning</a>

	<div class="bookings">
		{#if bookings.length === 0}
			<p>Inga bokningar</p>
		{/if}
		{#each bookings as booking}
			<div class="booking">
				<BookingCard data={booking} />
			</div>
		{/each}
	</div>
</main>

<style>
	.bookings {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding-bottom: 20px;
	}

	.booking {
		width: 500px;
	}
</style>
