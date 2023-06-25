<script lang="ts">
	import type { IAccomodation } from '$lib/types';

	export let accomodation: IAccomodation;
</script>

<div class="bg-base-200 p-3 rounded-lg">
	<h3 class="text-2xl font-bold">
		{accomodation.type} - {accomodation.slotName} - {accomodation.location}
	</h3>
	<div>
		<h4 class="text-lg font-semibold">El</h4>
		<p>{accomodation.electricity ? 'Ja' : 'Nej'}</p>
	</div>
	<div>
		<h4 class="text-lg font-semibold">Beskrivning</h4>
		<p>{accomodation.description}</p>
	</div>
	<div>
		<h4 class="text-lg font-semibold">Pris</h4>
		{#each accomodation.prices as price, i}
			<p>Dag {i + 1} - {price} SEK</p>
		{/each}
	</div>
</div>
