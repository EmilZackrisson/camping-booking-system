import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db";
import { BookingForm } from "types";

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
      json.boende = accommodation(json);

      if ((json.husvagn || json.husbil) && json.vehicleRegNumber) {
        let vehicleType = "";
        if (json.husvagn) vehicleType += "Husvagn ";
        if (json.husbil) vehicleType += "Husbil ";

        json.vehicleLength = Number(json.vehicleLength);
        json.vehicleWidth = Number(json.vehicleWidth);

        const vehicle = await prisma.vehicle.create({
          data: {
            length: json.vehicleLength,
            width: json.vehicleWidth,
            regNumber: json.vehicleRegNumber,
            type: vehicleType,
          },
        });

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
            accommodation: json.boende,
            vehicles: {
              connect: {
                id: vehicle.id,
              },
            },
          },
        });
        res.json(prismaRes);
        return;
      }
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
          accommodation: json.boende,
        },
      });

      res.json(prismaRes);
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

function accommodation(data: BookingForm) {
  let acc = "";
  if (data.stuga) acc += "Stuga ";
  if (data.husvagn) acc += "Husvagn ";
  if (data.husbil) acc += "Husbil ";
  if (data.tält) acc += "Tält ";
  return acc;
}
