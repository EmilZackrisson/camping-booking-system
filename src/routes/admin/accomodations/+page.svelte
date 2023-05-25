<script lang="ts">
	export const data: any;
	let accomodations: any;
	if (data.status === false) {
		console.log(data);
	} else {
		accomodations = data.accomodations;
	}
</script>

<main>
	{#if accomodations}
		{#each accomodations as accomodation}
			{accomodation.name}
		{/each}
	{/if}
</main>
