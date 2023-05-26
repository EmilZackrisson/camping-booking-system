<script lang="ts">
	export let data: any;

	console.log(data);
</script>

<main class="container text-center">
	<h1 class="text-4xl font-semibold">Hantera anställda</h1>
	<a href="/admin/employees/new" class="btn btn-ghost">
		<h2>Skapa konto för anställd</h2>
	</a>
	<section>
		{#each data.employees as employee}
			<div class="flex flex-col bg-base-200 rounded-lg max-w-md p-3">
				<p>{employee.firstName} {employee.lastName}</p>
				<a href="mailto:{employee.email}" class="text-info">{employee.email}</a>
				<a href="tel:{employee.phone}" class="text-info">{employee.phone}</a>
				<p>Roll: {employee.role}</p>
				<p>ID: {employee._id}</p>
				{#if employee.notes}
					<p>Anteckningar: {employee.notes}</p>
				{/if}
			</div>
		{/each}
	</section>
</main>
