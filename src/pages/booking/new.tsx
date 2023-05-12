import { ChangeEvent, FormEvent, useState } from "react";
import { BookingForm } from "types";

export default function NewBooking() {
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let form = new FormData(e.currentTarget);
    let data = Object.fromEntries(form.entries()) as unknown as BookingForm;

    if (verifySubmit(data)) {
      console.log(data);
      postData(data);
    }
  }

  const [vehicleRequired, setVehicleRequired] = useState<boolean>(false);

  const [vehicles, setVehicles] = useState<string[]>([]);

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setVehicles([...vehicles, e.target.name]);
    } else {
      setVehicles(vehicles.filter((vehicle) => vehicle !== e.target.name));
    }

    if (vehicles.length === 0 && e.target.checked) {
      setVehicleRequired(true);
    } else if (vehicles.length === 1 && !e.target.checked) {
      setVehicleRequired(false);
    }
  }

  async function postData(data: BookingForm) {
    await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/data",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Bokning skickad");
      })
      .catch((err) => {
        console.error(err);
        alert("Något gick fel");
      });
  }

  function verifySubmit(data: BookingForm) {
    if (!data.firstName) {
      alert("Du måste ange ett förnamn");
      return false;
    }
    if (!data.lastName) {
      alert("Du måste ange ett efternamn");
      return false;
    }
    if (!data.email) {
      alert("Du måste ange en e-post");
      return false;
    }
    if (data.email !== data.confirmEmail) {
      alert("E-post matchar inte bekräftelse");
      return false;
    }
    if (!data.phone) {
      alert("Du måste ange ett telefonnummer");
      return false;
    }
    if (!data.arrivalDate) {
      alert("Du måste ange ett ankomstdatum");
      return false;
    }
    if (!data.departureDate) {
      alert("Du måste ange ett avresedatum");
      return false;
    }
    if (data.arrivalDate >= data.departureDate) {
      alert("Avresedatum måste vara efter ankomstdatum");
      return false;
    }
    if (!data.agreeToPolicy) {
      alert("Du måste godkänna bokningsvillkoren");
      return false;
    }
    if (!data.numberOfPersons) {
      alert("Du måste ange antal personer");
      return false;
    }
    if (vehicleRequired) {
      if (!data.vehicleRegNumber) {
        alert("Du måste ange registreringsnummer på fordonet");
        return false;
      }
    }

    return true;
  }

  return (
    <div className="container flex p-5">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-3 bg-slate-300 p-4"
      >
        <h3 className="text-xl font-semibold">Kontaktuppgifter</h3>
        <label htmlFor="firstName">Förnamn*</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="lastName">Efternamn*</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="email">E-post*</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="confirmEmail">Bekräfta E-post*</label>
        <input type="email" name="confirmEmail" id="confirmEmail" />
        <label htmlFor="phone">Telefon* (inkl. landsnummer)</label>
        <input type="tel" name="phone" id="phone" />

        <h3 className="mt-5 text-xl font-semibold">Boende*</h3>
        <div className="flex flex-col gap-4">
          <label htmlFor="arrivalDate">Ankomstdatum*</label>
          <input type="date" name="arrivalDate" id="arrivalDate" />
          <label htmlFor="departureDate">Avresedatum*</label>
          <input type="date" name="departureDate" id="departureDate" />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Välj det boende du vill ha</h4>
          <div className="checkbox-row">
            <label htmlFor="stuga">Stuga</label>
            <input type="checkbox" name="stuga" id="stuga" />
          </div>
          <div className="checkbox-row">
            <label htmlFor="husvagn">Husvagn</label>
            <input
              type="checkbox"
              name="husvagn"
              id="husvagn"
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="checkbox-row">
            <label htmlFor="husbil">Husbil</label>
            <input
              type="checkbox"
              name="husbil"
              id="husbil"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="checkbox-row">
            <label htmlFor="tält">Tält</label>
            <input type="checkbox" name="tält" id="tält" />
          </div>
        </div>

        {vehicleRequired && (
          <div className="flex flex-col">
            <label htmlFor="vehicleLength">Längd på fordonet</label>
            <input type="number" name="vehicleLength" id="vehicleLength" />
            <label htmlFor="vehicleWidth">Bredd på fordonet</label>
            <input type="number" name="vehicleWidth" id="vehicleWidth" />
            <label htmlFor="vehicleRegNumber">Registreringsnummer*</label>
            <input type="text" name="vehicleRegNumber" id="vehicleRegNumber" />
          </div>
        )}

        <label htmlFor="numberOfPersons">Antal personer*</label>
        <input type="number" name="numberOfPersons" id="numberOfPersons" />

        <h3 className="mt-5 text-xl font-semibold">Övrigt</h3>
        <div className="flex flex-col">
          <label htmlFor="önskemål">Önskemål</label>
          <textarea name="önskemål" id="önskemål"></textarea>
        </div>
        <div>
          <label htmlFor="agreeToPolicy" className="mr-3">
            Godkännande
          </label>
          <input type="checkbox" name="agreeToPolicy" id="agreeToPolicy" />
          <p className="mt-4">
            Vi behöver ovan uppgifter för att kunna fullfölja er bokning av
            boende hos oss och vi kommer inte att dela dessa uppgifter med
            tredje part.
          </p>
        </div>

        <button type="submit" className="btn btn-primary">
          Skicka bokning
        </button>
      </form>
    </div>
  );
}
