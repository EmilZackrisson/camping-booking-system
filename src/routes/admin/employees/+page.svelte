<script lang="ts">
	import type { IFilteredEmployee } from '$lib/types';
	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-french-toast';

	let employees: IFilteredEmployee[] = [];

	onMount(async () => {
		employees = await getEmployees().then((employees) => {
			console.log('Employees +page.svelte: ', employees.employees);
			return employees.employees;
		});
	});

	async function getEmployees() {
		const employeeRes = await fetch('/api/admin/employees', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (employeeRes.ok) {
			return await employeeRes.json();
		} else {
			console.log(employeeRes);
			toast.error('Kunde inte hämta anställda.\nKontakta systemadministratör om felet kvarstår.', {
				duration: 5000
			});
		}
	}
</script>

<Toaster />

<main class="container text-center">
	<h1 class="text-4xl font-semibold">Hantera anställda</h1>
	<a href="/admin/employees/new" class="btn btn-ghost">
		<h2>Skapa konto för anställd</h2>
	</a>
	<section class="flex flex-wrap items-start gap-3">
		{#each employees as employee}
			<div class="flex flex-col bg-base-200 rounded-lg max-w-md p-5">
				<p>{employee.firstName} {employee.lastName}</p>
				<a href="mailto:{employee.email}" class="text-info">{employee.email}</a>
				<a href="tel:{employee.phone}" class="text-info">{employee.phone}</a>
				<p>Roll: {employee.role}</p>
				<p>ID: {employee._id}</p>
				{#if employee.notes}
					<p>Anteckningar: {employee.notes}</p>
				{/if}

				<a href="/admin/employees/manage?id={employee._id}" class="btn btn-ghost">Hantera</a>
			</div>
		{/each}
	</section>
</main>
