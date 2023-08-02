<script lang="ts">
	import Navbar from '../components/Navbar.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Navbar userData={data} />

<slot />

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
