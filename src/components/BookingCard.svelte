<script lang="ts">
	import type { IBooking } from '$lib/types';
	import {
		Modal,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';

	export let data: IBooking;
	import { toast, Toaster } from 'svelte-french-toast';

	async function deleteBooking(userResponse: boolean) {
		if (!userResponse) {
			modalStore.close();
			return;
		}

		const res = await fetch(`/api/booking?id=${data._id}`, {
			method: 'DELETE'
		});

		if (res.status === 200) {
			window.location.href = '/admin/bookings';
		} else {
			const data = await res.json();
			toast.error(data.error, {
				duration: 5000
			});
		}
	}

	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Är du säker?',
		body: 'Är du säker att du vill ta bort bokningen?',
		buttonTextCancel: 'Avbryt',
		buttonTextConfirm: 'Ta bort',

		// TRUE if confirm pressed, FALSE if cancel pressed
		response: (r: boolean) => deleteBooking(r)
	};
</script>

<Toaster />
<Modal />

<section class="p-3 bg-base-200 rounded-lg">
	<div>
		<p>{data.firstName} {data.lastName}</p>
		<a href={`mailto:${data.email}`} class="link-info">{data.email}</a>
		<p>Telefon: <a href={`tel:${data.phone}`} class="link-info">{data.phone}</a></p>

		<p>
			{new Date(data.dateArrival).toLocaleDateString()} - {new Date(
				data.dateDepart
			).toLocaleDateString()}
		</p>
		<p>Antal personer: {data.numberOfPersons}</p>
		<p>Bokningsnummer: {data._id}</p>
	</div>
	<a href="/admin/bookings/edit/{data._id}" class="btn hover:btn-primary btn-outline">Ändra</a>
	<!-- <label for="deleteModal" class="btn hover:btn-error btn-outline">Ta bort</label> -->
	<button class="btn hover:btn-error btn-outline" on:click={() => modalStore.trigger(modal)}
		>Ta bort</button
	>
</section>

<!-- <input type="checkbox" id="deleteModal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Är du säker att du vill ta bort bokningen?</h3>
		<p class="py-4">Om du tar bort den här bokningen kommer den inte gå att återställa.</p>
		<div class="modal-action">
			<label for="deleteModal" class="btn">Avbryt</label>
			<button class="btn btn-error" on:click={deleteBooking}>Ta bort</button>
		</div>
	</div>
</div> -->
