import { NextResponse } from "next/server";
import { prisma } from "../../server/db";

export async function POST(request: Request) {
  const req = await request.json();

  const prismaRes = await prisma.booking.create({
    data: {
      customer: {
        create: {
          firstName: req.firstName,
          lastName: req.lastName,
          email: req.email,
          phone: req.phone,
        },
      },
      arrivalDate: req.arrivalDate,
      departureDate: req.departureDate,
      numberOfPersons: req.numberOfPersons,
    },
  });

  return NextResponse.json({ prismaRes });
}
