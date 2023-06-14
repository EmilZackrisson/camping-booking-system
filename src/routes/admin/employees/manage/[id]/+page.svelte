<script lang="ts">
	import type { IFilteredEmployee } from '$lib/types';
	import { toast, Toaster } from 'svelte-french-toast';

	export let data: any;

	let password = '';
	let confirmPassword = '';

	const employee = data.employee[0];

	console.log(employee);

	async function changePassword() {
		if (password !== confirmPassword) {
			toast.error('Lösenorden matchar inte', {
				duration: 5000
			});
			return;
		}

		if (password.length < 8) {
			toast.error('Lösenordet måste vara minst 8 tecken långt', {
				duration: 5000
			});
			return;
		}

		const obj = {
			password,
			typeOfChange: 'password'
		};

		const res = await fetch(`/api/admin/employees?id=${employee._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		});
	}
</script>

<Toaster />

{#if employee === undefined}
	<h1 class="font-bold text-4xl">Anställd hittades inte</h1>
{/if}

<div class="container mx-auto flex justify-center items-center flex-col">
	{#if employee !== undefined}
		<h1 class="text-4xl font-semibold">{employee.firstName} {employee.lastName}</h1>
		<p><a href="mailto:{employee.email}" class="text-info">{employee.email}</a></p>
		<p><a href="tel:{employee.phone}" class="text-info">{employee.phone}</a></p>
		<p>Roll: {employee.role}</p>
		<p>ID: {employee._id}</p>
		{#if employee.notes}
			<p>Anteckningar: {employee.notes}</p>
		{:else}
			<p>Anteckningar: Inga anteckningar</p>
		{/if}
		<label for="changePasswordModal" class="btn max-w-md">Byt lösenord</label>

		<input type="checkbox" id="changePasswordModal" class="modal-toggle" />
		<div class="modal modal-bottom sm:modal-middle">
			<div class="modal-box">
				<h3 class="font-bold text-lg">
					Byt lösenord för {employee.firstName}
					{employee.lastName}
				</h3>

				<label for="password" class="label">Nytt lösenord</label>
				<input type="password" id="password" class="input input-bordered" bind:value={password} />

				<label for="confirmPassword" class="label">Bekräfta lösenord</label>
				<input
					type="password"
					id="confirmPassword"
					class="input input-bordered"
					bind:value={confirmPassword}
				/>

				<div class="modal-action">
					<label for="changePasswordModal" class="btn">Avbryt</label>
					<button class="btn btn-error" on:click={changePassword}>Byt lösenord</button>
				</div>
			</div>
		</div>
	{/if}
</div>
