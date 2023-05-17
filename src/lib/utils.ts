import { BookingWithCustomer, BookingWithCustomerAndVehicles } from "types";

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const fixDates = (bookings: BookingWithCustomerAndVehicles[]) => {
  bookings.map((booking) => {
    booking.arrivalDate = new Date(booking.arrivalDate);
    booking.departureDate = new Date(booking.departureDate);
  });
  return bookings;
};

export const DateToString = (date: Date) => {
  return new Date(date).toISOString().split("T")[0];
};

export function accommodationToBool(
  accommodation: string,
  checkboxType: string
) {
  accommodation = accommodation.toLowerCase();
  checkboxType = checkboxType.toLowerCase();
  if (accommodation.includes("Stuga") && checkboxType.includes("Stuga")) {
    console.log("Stuga");
    return 1;
  }
  if (accommodation.includes("Husvagn") && checkboxType.includes("Husvagn")) {
    console.log("Husvagn");
    return 1;
  }
  if (accommodation.includes("Husbil") && checkboxType.includes("Husbil")) {
    console.log("Husbil");
    return 1;
  }
  if (accommodation.includes("Tält") && checkboxType.includes("Tält")) {
    console.log("Tält");
    return 1;
  }
  return 0;
}
