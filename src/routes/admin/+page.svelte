<script lang="ts">
</script>

<section>
	<h1>Admin</h1>
	<div class="nav-boxes">
		<div class="nav-box">
			<a href="/admin/employees">
				<h2>Anställda</h2>
			</a>
		</div>
		<div class="nav-box">
			<a href="/admin/bookings">
				<h2>Bokningar</h2>
			</a>
		</div>
	</div>
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
