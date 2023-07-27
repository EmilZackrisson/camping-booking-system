<script lang="ts">
	import type { IEmployee } from '$lib/types';
	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-french-toast';
	import type { PageData } from './$types';

	export let data: PageData;

	const employees = data.employees as IEmployee[];
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
