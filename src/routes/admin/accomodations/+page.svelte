<script lang="ts">
	import AddStallplatsModal from '../../../components/AddStallplatsModal.svelte';
	import AccomodationCard from '../../../components/AccomodationCard.svelte';
	import type { IAccomodation } from '$lib/types';
	import { onMount } from 'svelte';

	let accomodations: IAccomodation[];

	onMount(async () => {
		accomodations = await getAccomodations().then((accomodations) => {
			console.log(accomodations.accomodations);
			return accomodations.accomodations;
		});
	});

	async function getAccomodations() {
		const res = await fetch('/api/secure/accomodations');
		const data = await res.json();
		return data;
	}

	/*console.log(accomodations.accomodations);*/
</script>

<main class="container flex flex-col items-center">
	<h1 class="font-semibold text-4xl">Boenden</h1>
	<!--suppress XmlInvalidId -->
	<label for="openAddModal" class="btn">Lägg till Ställplats</label>
	<div class="flex flex-wrap w-full gap-5 mt-3">
		{#if accomodations}
			{#each accomodations as accomodation}
				{#if accomodation.type === 'Ställplats'}
					<AccomodationCard {accomodation} />
				{/if}
			{/each}
		{/if}
	</div>
</main>

<AddStallplatsModal />
