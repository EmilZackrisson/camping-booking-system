import { FormEvent } from "react";

export default function NewBooking() {
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let form = new FormData(e.currentTarget);
    let data = Object.fromEntries(form.entries());
    if (verifySubmit(data)) {
      console.log(data);
      postData(data);
    }
  }

  async function postData(data: { [k: string]: FormDataEntryValue }) {
    await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        alert("Bokning skickad");
      })
      .catch((err) => {
        console.error(err);
        alert("Något gick fel");
      });
  }

  function verifySubmit(data: { [k: string]: FormDataEntryValue }) {
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
    if (data.email !== data.confemail) {
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
    if (!data.godkännande) {
      alert("Du måste godkänna bokningsvillkoren");
      return false;
    }
    return true;
  }

  return (
    <div className="p-5">
      <h1>New Booking</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-3 bg-slate-300 p-4"
      >
        <label htmlFor="firstName">Förnamn</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="lastName">Efternamn</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="email">E-post</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="confemail">Bekräfta E-post</label>
        <input type="email" name="confemail" id="confemail" />
        <label htmlFor="phone">Telefon</label>
        <input type="tel" name="phone" id="phone" />
        <div className="flex flex-row gap-4">
          <label htmlFor="arrivalDate">Ankomstdatum</label>
          <input type="date" name="arrivalDate" id="arrivalDate" />
          <label htmlFor="departureDate">Avresedatum</label>
          <input type="date" name="departureDate" id="departureDate" />
        </div>

        <h3>Boende</h3>
        <div>
          <label htmlFor="stuga">Stuga</label>
          <input type="checkbox" name="stuga" id="stuga" />
          <label htmlFor="husvagn">Husvagn</label>
          <input type="checkbox" name="husvagn" id="husvagn" />
          <label htmlFor="husbil">Husbil</label>
          <input type="checkbox" name="husbil" id="husbil" />
          <label htmlFor="tält">Tält</label>
          <input type="checkbox" name="tält" id="tält" />
        </div>

        <h3>Övrigt</h3>
        <div>
          <label htmlFor="önskemål">Önskemål</label>
          <textarea name="önskemål" id="önskemål"></textarea>
        </div>
        <label htmlFor="godkännande">Godkännande</label>
        <input type="checkbox" name="godkännande" id="godkännande" />
        <p>
          Vi behöver ovan uppgifter för att kunna fullfölja er bokning av boende
          hos oss och vi kommer inte att dela dessa uppgifter med tredje part.
        </p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
