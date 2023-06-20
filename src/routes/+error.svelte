<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Ojdå, något gick fel.</h1>
<h1>{$page.status}: {$page.error?.message}</h1>
