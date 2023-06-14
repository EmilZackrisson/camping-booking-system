<script lang="ts">
	import type { IAccomodation } from '$lib/types';

	export let accomodation: IAccomodation;

	console.log(accomodation);
</script>

<div class="bg-base-200 p-3 rounded-lg">
	<h3 class="text-2xl font-bold">
		{accomodation.type} - {accomodation.slotName} - {accomodation.location}
	</h3>
	<div>
		<h4 class="text-lg font-semibold">Beskrivning</h4>
		<p>{accomodation.description}</p>
	</div>
	<div>
		<h4 class="text-lg font-semibold">Pris</h4>
		<!--<p>{accomodation.price[0]} kr</p>-->
	</div>
</div>
