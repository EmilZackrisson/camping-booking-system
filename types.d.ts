import { prisma } from "~/server/db";

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

  önskemål: string?;
  agreeToPolicy: boolean;
};

interface BookingWithCustomer extends Booking {
  customer: Customer;
}
