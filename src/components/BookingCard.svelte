<script lang="ts">
    export let data: any;
    console.log(data)
</script>

<section>
    <div class="card">
        <p>{data.firstName} {data.lastName}</p>
        <a href={`mailto:${data.email}`}>{data.email}</a>
        <a href={`tel:${data.phone}`}>Telefon: {data.phone}</a>
        <p>{new Date(data.dateArrival).toLocaleDateString()} - {new Date(data.dateDepart).toLocaleDateString()}</p>
        <p>Antal personer: {data.numberOfPersons}</p>
        <p>Bokningsnummer: {data._id}</p>
    </div>
    <a href="/admin/bookings/edit/${data._id}" class="edit">Ändra</a>
    <a href="/admin/bookings/delete" class="delete">Ta bort</a>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-style: solid;
        border-width: 1px;
        padding: 10px;
    }

    .card{
        display: flex;
        flex-direction: column;
    }
</style>