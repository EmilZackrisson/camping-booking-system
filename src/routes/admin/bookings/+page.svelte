<script lang="ts" ✂prettier:content✂="CglpbXBvcnQgQm9va2luZ0NhcmQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9Cb29raW5nQ2FyZC5zdmVsdGUnOwoJaW1wb3J0IHRvYXN0LCB7VG9hc3Rlcn0gZnJvbSAnc3ZlbHRlLWZyZW5jaC10b2FzdCc7CglpbXBvcnQgdHlwZSB7SUJvb2tpbmd9IGZyb20gJyRsaWIvdHlwZXMnOwoKCWV4cG9ydCBsZXQgZGF0YTsKCgljb25zdCBib29raW5nczogSUJvb2tpbmdbXSA9IEpTT04ucGFyc2UoZGF0YS5ib29raW5ncyBhcyBzdHJpbmcpLmJvb2tpbmdzOwoJLy8gY29uc29sZS5sb2coJ0Jvb2tpbmdzJywgYm9va2luZ3MpOwoKCWlmIChkYXRhLmVycm9yKSB7CgkJdG9hc3QuZXJyb3IoZGF0YS5lcnJvciBhcyBzdHJpbmcsIHsKCQkJZHVyYXRpb246IDUwMDAKCQl9KTsKCX0K">{}</script>

<Toaster />

<main class="container text-center">
	<h1 class="text-4xl font-bold">Bokningar</h1>
	<a href="/booking/new" class="btn btn-ghost">Skapa bokning</a>

	{#if bookings?.length === 0}
		<p>Inga bokningar</p>
	{:else if bookings}
		<section class="grid grid-cols-1 sm:grid-cols-3">
			{#each bookings as booking}
				<div class="booking">
					<BookingCard data={booking} />
				</div>
			{/each}
		</section>
	{/if}
</main>