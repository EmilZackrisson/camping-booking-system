import { prisma } from "@server/db";
import { Booking, Customer } from "@prisma/client";
import { fixDates, formatDate } from "~/lib/utils";
import BookingTable from "~/components/admin/BookingTable";
import { BookingWithCustomer, BookingWithCustomerAndVehicles } from "types";

const Admin = ({
  bookings,
}: {
  bookings: BookingWithCustomerAndVehicles[];
}) => {
  console.log("All bookings:", bookings);
  bookings = fixDates(bookings);

  return (
    <>
      <h1>Admin</h1>

      <BookingTable bookings={bookings} />
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  let bookings = (await prisma.booking.findMany({
    orderBy: { arrivalDate: "asc" },
    include: {
      customer: true,
      vehicles: true,
    },
  })) as BookingWithCustomerAndVehicles[];

  bookings = JSON.parse(JSON.stringify(bookings));

  return {
    props: { bookings }, // will be passed to the page component as props
  };
}
