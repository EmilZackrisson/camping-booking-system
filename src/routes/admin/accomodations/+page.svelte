<script lang="ts">
	import AddStallplatsModal from '../../../components/AddStallplatsModal.svelte';
	import AccomodationCard from '../../../components/AccomodationCard.svelte';
	import type { IAccomodation } from '$lib/types';
	export let data: string | undefined;
	const accomodations: IAccomodation[] = data
		? (JSON.parse(data).accomodations as IAccomodation[])
		: [];

	console.log(accomodations);
</script>

<main class="container">
	<div class="flex flex-wrap w-full">
		{#if accomodations}
			{#each accomodations as accomodation}
				{#if accomodation.type === 'Ställplats'}
					<AccomodationCard {accomodation} />
				{/if}
			{/each}
		{/if}
	</div>
</main>

<!--suppress XmlInvalidId -->
<label for="openAddModal" class="btn">Lägg till Ställplats</label>

<AddStallplatsModal />
