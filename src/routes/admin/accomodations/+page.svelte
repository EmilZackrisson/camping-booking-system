<script lang="ts">
	import AddStallplatsModal from '../../../components/AddStallplatsModal.svelte';
	export let data;
	console.log(data);
</script>

<main>
	<!--{#if accomodations}
		{#each accomodations as accomodation}
			{accomodation.name}
		{/each}
	{/if}-->
</main>

<!--suppress XmlInvalidId -->
<label for="openAddModal" class="btn">Lägg till Ställplats</label>

<!-- Put this part before </body> tag -->
<AddStallplatsModal id="openAddModal" />
