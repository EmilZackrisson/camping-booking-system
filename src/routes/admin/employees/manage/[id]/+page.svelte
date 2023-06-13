<script lang="ts">
	import type { IFilteredEmployee } from '$lib/types';

	export let data: any;

	const employee = data.employee[0];

	console.log(employee);
</script>

{#if employee !== undefined}
	<p>{employee.firstName} {employee.lastName}</p>
	<a href="mailto:{employee.email}" class="text-info">{employee.email}</a>
	<a href="tel:{employee.phone}" class="text-info">{employee.phone}</a>
	<p>Roll: {employee.role}</p>
	<p>ID: {employee._id}</p>
	{#if employee.notes}
		<p>Anteckningar: {employee.notes}</p>
	{/if}
	<button class="btn">Byt lösenord</button>
{/if}
