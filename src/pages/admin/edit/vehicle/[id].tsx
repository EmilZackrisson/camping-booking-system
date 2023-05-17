import { Vehicle } from "@prisma/client";
import { prisma } from "@server/db";
import { useState } from "react";

export default function Page({ vehicle: vehicleProp }: { vehicle: Vehicle }) {
  const [vehicle, setVehicle] = useState<Vehicle>(vehicleProp);

  return (
    <div className="container  bg-gray-300 p-5 ">
      <h1>Fordon</h1>
      <p>Registreringsnummer: {vehicle.regNumber}</p>
      <p>Typ: {vehicle.type}</p>
      {vehicle.length !== 0 && <p>Längd: {vehicle.length}</p>}
      {vehicle.length === 0 && <p>Längd: Inte Registrerat</p>}
      {vehicle.width !== 0 && <p>Bredd: {vehicle.width}</p>}
      {vehicle.width === 0 && <p>Bredd: Inte Registrerat</p>}

      <p>Anteckningar: {vehicle.notes || "Inga anteckningar"}</p>

      <a
        href={`/admin/edit/booking/${vehicle.bookingId}`}
        className="text-blue-500"
      >
        Gå till tillhörande bokning
      </a>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  let vehicle = await prisma.vehicle.findUnique({
    where: { id: params.id },
  });

  vehicle = JSON.parse(JSON.stringify(vehicle));

  return {
    props: { vehicle }, // will be passed to the page component as props
  };
}
