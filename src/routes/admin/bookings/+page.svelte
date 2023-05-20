<script lang="ts">
    import BookingCard from "../../../components/BookingCard.svelte";

    /** @type {import('./$types').PageData} */
    export let data;


    const bookings = JSON.parse(data.bookings);
    console.log(bookings);

</script>

<h1>Bokningar</h1>

<div class="bookings">
    {#each bookings as booking}
    <div class="booking">
        <BookingCard data={booking} />

    </div>
{/each}
</div>

<style>
    .bookings {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:10px;
        width: 100%;
        padding-bottom: 20px;
    }

    .booking{
        width: 500px;
    }
</style>