<script>
	import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />

<slot />

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
