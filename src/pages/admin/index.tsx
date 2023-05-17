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
    <div className="p-3">
      <h1 className="text-4xl font-bold">Admin</h1>

      <h2 className="text-2xl">Alla bokningar</h2>
      <BookingTable bookings={bookings} />
    </div>
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
