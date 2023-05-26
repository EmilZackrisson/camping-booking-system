<script lang="ts">
	import AddStallplatsModal from '../../../components/AddStallplatsModal.svelte';
	import AccomodationCard from '../../../components/AccomodationCard.svelte';
	export let data;
	const accomodations = JSON.parse(data.accomodations).accomodations;
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

<!-- Put this part before </body> tag -->
<AddStallplatsModal id="openAddModal" />
