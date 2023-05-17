import { Customer } from "@prisma/client";
import { prisma } from "~/server/db";

export default function Page({ customer }: { customer: Customer }) {
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-4xl">Kund</h1>
      <p>Förnamn: {customer.firstName}</p>
      <p>Efternamn: {customer.lastName}</p>
      <p>
        E-post:{" "}
        <a
          href={`mailto:${customer.email}`}
          className="text-blue-500 underline"
        >
          {customer.email}
        </a>
      </p>
      <p>
        Telefon:{" "}
        <a href={"tel:" + customer.phone} className="text-blue-500 underline">
          {customer.phone}
        </a>
      </p>
      <p>Anteckningar: {customer.notes || "Inga anteckningar"}</p>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  let customer = await prisma.customer.findUnique({
    where: { id: params.id },
  });

  customer = JSON.parse(JSON.stringify(customer));

  return {
    props: { customer }, // will be passed to the page component as props
  };
}
