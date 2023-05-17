import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookingWithCustomer } from "types";
import { prisma } from "~/server/db";
import { DateToString, accommodationToBool } from "~/lib/utils";

export default function Page({
  bookingProp,
}: {
  bookingProp: BookingWithCustomer;
}) {
  const [booking, setBooking] = useState<BookingWithCustomer>(bookingProp);

  useEffect(() => {
    // setBooking(bookingCopy);
    console.log("booking:", booking);
  }, [booking]);

  async function removeBooking() {
    await fetch("/api/booking", {
      method: "DELETE",
      body: JSON.stringify({ id: booking.id }),
      headers: {
        "Content-Type": "application/data",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Bokning borttagen");
    });
  }

  return (
    <div>
      <form className="flex flex-col gap-3 bg-slate-300 p-4">
        <label htmlFor="firstName">Förnamn</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={booking?.customer?.firstName || ""}
        />
        <label htmlFor="lastName">Efternamn</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={booking?.customer?.lastName || ""}
        />
        <label htmlFor="email">E-post</label>
        <input
          type="email"
          name="email"
          id="email"
          value={booking?.customer?.email || ""}
        />
        <label htmlFor="phone">Telefon</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={booking?.customer?.phone || ""}
        />
        <div className="flex flex-row gap-4">
          <label htmlFor="arrivalDate">Ankomstdatum</label>
          <input
            type="date"
            name="arrivalDate"
            id="arrivalDate"
            value={DateToString(booking.arrivalDate) || ""}
            onChange={(e) => {
              setBooking({
                ...booking,
                arrivalDate: new Date(e.target.value),
              });
            }}
          />
          <label htmlFor="departureDate">Avresedatum</label>
          <input
            type="date"
            name="departureDate"
            id="departureDate"
            value={DateToString(booking.departureDate) || ""}
            onChange={(e) => {
              setBooking({
                ...booking,
                departureDate: new Date(e.target.value),
              });
            }}
          />
        </div>

        <h3>Boende</h3>
        <div>
          <label htmlFor="stuga">Stuga</label>
          <input
            type="checkbox"
            name="stuga"
            id="stuga"
            value={accommodationToBool(booking.accommodation, "Stuga")}
          />
          <label htmlFor="husvagn">Husvagn</label>
          <input type="checkbox" name="husvagn" id="husvagn" />
          <label htmlFor="husbil">Husbil</label>
          <input type="checkbox" name="husbil" id="husbil" />
          <label htmlFor="tält">Tält</label>
          <input type="checkbox" name="tält" id="tält" />
        </div>
        <label htmlFor="numberOfPersons">Antal personer</label>
        <input
          type="number"
          name="numberOfPersons"
          id="numberOfPersons"
          value={booking?.numberOfPersons || ""}
        />

        <h3>Övrigt</h3>
        <div>
          <label htmlFor="önskemål">Önskemål</label>
          <textarea
            name="önskemål"
            id="önskemål"
            value={booking?.notes || ""}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={removeBooking}>
          Ta bort
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  console.log("params:", params);
  let bookingProp = await prisma.booking.findUnique({
    where: { id: params.id },
    include: {
      customer: true,
    },
  });

  bookingProp = JSON.parse(JSON.stringify(bookingProp));

  return {
    props: { bookingProp }, // will be passed to the page component as props
  };
}
