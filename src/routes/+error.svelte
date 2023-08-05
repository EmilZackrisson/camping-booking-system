<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="flex flex-col m-auto text-center items-center">
	<h1 class="text-3xl">Ojdå, något gick fel.</h1>
	<p>{$page.status}: {$page.error?.message}</p>
	<i>Om problemet kvarstår, kontakta systemadministratören</i>
	<p class="mt-3 btn btn-primary w-fit"><a href="/">Gå tillbaka till startsidan</a></p>
</main>
