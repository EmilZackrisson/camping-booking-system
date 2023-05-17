import { Booking, Customer } from "@prisma/client";
import { useEffect, useState } from "react";
import { formatDate } from "~/lib/utils";
import { BookingWithCustomerAndVehicles } from "types";

export default function BookingTable(props: {
  bookings: BookingWithCustomerAndVehicles[];
}) {
  const { bookings } = props;

  return (
    <div className="container relative overflow-x-auto">
      <table className="w-full  text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Kund
            </th>
            <th scope="col" className="px-6 py-3">
              Ankomstdatum
            </th>
            <th scope="col" className="px-6 py-3">
              Avresedatum
            </th>
            <th scope="col" className="px-6 py-3">
              Boende
            </th>
            <th scope="col" className="px-6 py-3">
              Fordon RegNr
            </th>
            <th scope="col" className="px-6 py-3">
              Åtgärder
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <a
                  href={`/admin/edit/customer/${booking.customer.id}`}
                  className="text-blue-500 underline"
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </a>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {formatDate(booking.arrivalDate)}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {formatDate(booking.departureDate)}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {booking.accommodation}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <a
                  href={`/admin/edit/vehicle/${booking.vehicles[0]?.id}`}
                  className="text-blue-500 underline"
                >
                  {booking.vehicles[0]?.regNumber}
                </a>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <a
                  className="text-blue-500 underline"
                  href={`/admin/edit/booking/${booking.id}`}
                >
                  Ändra
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
