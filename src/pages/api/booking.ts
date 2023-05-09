import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const json: BookingForm = JSON.parse(req.body);
      console.log(json);

      json.arrivalDate = new Date(json.arrivalDate).toISOString();
      json.departureDate = new Date(json.departureDate).toISOString();
      json.numberOfPersons = Number(json.numberOfPersons);

      const prismaRes = await prisma.booking.create({
        data: {
          customer: {
            create: {
              firstName: json.firstName,
              lastName: json.lastName,
              email: json.email,
              phone: json.phone,
            },
          },
          arrivalDate: json.arrivalDate,
          departureDate: json.departureDate,
          numberOfPersons: json.numberOfPersons,
        },
      });

      res.status(200).json(JSON.stringify(prismaRes.id));
    } catch (error) {
      res.status(500).json(JSON.stringify(error));
    }
  }
  if (req.method === "GET") {
    try {
      const allBookings = await prisma.booking.findMany({
        include: {
          customer: true,
        },
      });
      res.status(200).json(allBookings);
    } catch (error) {
      res.status(500).json(JSON.stringify(error));
    }
  } else {
    res.status(405).json(JSON.stringify({ message: "Method not allowed" }));
  }
}
