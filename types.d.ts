import { Booking, Customer } from "@prisma/client";

type BookingForm = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  numberOfPersons: number;

  stuga: boolean?;
  husvagn: boolean?;
  tält: boolean?;
  husbil: boolean?;
  boende: string?;

  vehicleLength: number?;
  vehicleWidth: number?;
  vehicleRegNumber: string?;

  önskemål: string?;
  agreeToPolicy: boolean;
};

type BookingWithCustomer = Booking & { customer: Customer };

type BookingWithCustomerAndVehicles = Booking & {
  customer: Customer;
  vehicles: Vehicle[];
};
