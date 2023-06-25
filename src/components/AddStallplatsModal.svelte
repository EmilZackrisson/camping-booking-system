<script lang="ts">
	let prices = {
		priceDay1: 0,
		priceDay2: 0,
		priceDay3: 0,
		priceDay4: 0,
		priceDay5: 0,
		priceDay6: 0,
		priceDay7: 0
	};

	async function add(e: Event) {
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		// Remove form prices from data
		for (let i = 1; i <= 7; i++) {
			delete data[`priceDay${i}`];
		}

		let accomodation: any = {
			...data,
			prices
		};

		if (accomodation.electricity === 'on') {
			accomodation.electricity = true;
		} else {
			accomodation.electricity = false;
		}

		console.log(accomodation);

		const response = await fetch('/api/secure/accomodations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(accomodation)
		});

		if (response.ok) {
			const json = await response.json();
			console.log(json);

			window.location.reload();
		}

		return false;
	}
</script>

<input type="checkbox" id="openAddModal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Lägg till Ställplats</h3>
		<form on:submit={add} class="flex flex-col">
			<label for="slotName">Platsnamn</label>
			<input type="text" name="slotName" id="slotName" />
			<label for="location">Område</label>
			<select id="location" name="location">
				<option value="A">A</option>
				<option value="B">B</option>
				<option value="C">C</option>
				<option value="D">D</option>
				<option value="E">E</option>
			</select>
			<label for="electricity">El</label>
			<input type="checkbox" name="electricity" id="electricity" />
			<label for="description">Beskrivning</label>
			<textarea name="description" id="description" cols="30" rows="10" />
			<div class="flex flex-col">
				<p>Priser</p>
				<label for="priceDay1">En Dag</label>
				<input type="number" name="priceDay1" id="priceDay1" bind:value={prices.priceDay1} />
				<label for="priceDay2">Två Dagar</label>
				<input type="number" name="priceDay2" id="priceDay2" bind:value={prices.priceDay2} />
				<label for="priceDay3">Tre Dagar</label>
				<input type="number" name="priceDay3" id="priceDay3" bind:value={prices.priceDay3} />
				<label for="priceDay4">Fyra Dagar</label>
				<input type="number" name="priceDay4" id="priceDay4" bind:value={prices.priceDay4} />
				<label for="priceDay5">Fem Dagar</label>
				<input type="number" name="priceDay5" id="priceDay5" bind:value={prices.priceDay5} />
				<label for="priceDay6">Sex Dagar</label>
				<input type="number" name="priceDay6" id="priceDay6" bind:value={prices.priceDay6} />
				<label for="priceDay7">Sju Dagar</label>
				<input type="number" name="priceDay7" id="priceDay7" bind:value={prices.priceDay7} />
			</div>
			<div class="modal-action">
				<label for="openAddModal" class="btn">Stäng</label>
				<button class="btn btn-primary" type="submit">Lägg till</button>
			</div>
		</form>
	</div>
</div>
