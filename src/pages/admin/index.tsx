import { NextPage } from "next";
import { prisma } from "../../server/db";
import { Booking } from "@prisma/client";

const Admin = ({ bookings }: { bookings: Booking[] }) => {
  return (
    <>
      <h1>Admin</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.arrivalDate.toDateString()}{" "}
            {booking.departureDate.toDateString()}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  const bookings = await prisma.booking.findMany({
    where: {
      arrivalDate: {
        gte: new Date(),
      },
    },
  });

  return {
    props: { bookings }, // will be passed to the page component as props
  };
}
