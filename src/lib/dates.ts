import { Booking } from "@prisma/client";

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const fixDates = (bookings: Booking[]) => {
  bookings.map((booking) => {
    booking.arrivalDate = new Date(booking.arrivalDate);
    booking.departureDate = new Date(booking.departureDate);
  });
  return bookings;
};
