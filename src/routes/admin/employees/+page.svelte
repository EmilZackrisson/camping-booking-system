<script lang="ts">
	export let data: any;

	console.log(data);
</script>

<h1>Anställda</h1>

<div class="nav-boxes">
	<div class="nav-box">
		<a href="/admin/employees/new">
			<h2>Skapa konto för anställd</h2>
		</a>
	</div>
</div>
<section>
	<h2>Hantera anställda</h2>
	{#each data.employees as employee}
		<div>
			{employee.firstName}
			{employee.lastName}
			{employee.email}
			{employee.phone}
			{employee.role}
			{employee._id}
		</div>
	{/each}
</section>

<style>
	.nav-boxes {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.nav-box {
		width: 200px;
		height: 200px;
		background-color: #fff;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
	}
</style>
