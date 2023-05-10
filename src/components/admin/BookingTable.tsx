import { Booking, Customer } from "@prisma/client";
import { useEffect, useState } from "react";
import { formatDate } from "~/lib/utils";
import { BookingWithCustomer } from "types";

export default function BookingTable(props: {
  bookings: BookingWithCustomer[];
}) {
  const { bookings } = props;

  return (
    <div className="container relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
              Åtgärder
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="whitespace-nowrap px-6 py-4">
                {booking.customer.firstName} {booking.customer.lastName}
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
                  className="text-blue-500"
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
