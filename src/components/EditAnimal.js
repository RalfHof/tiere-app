import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditAnimal() {
  const [tier, setTier] = useState({
    tierart: "",
    name: "",
    krankheit: "",
    geburtstag: "",
    gewicht: "",
  });
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function getOneTier() {
      try {
        const response = await axios.get(`http://localhost:3000/tiere/${id}`);
        setTier(response.data);
      } catch (error) {
        console.error("Fehler beim fetchen des Tieres", error);
      }
    }
    getOneTier();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/tiere/${id}`, tier);
      alert("Aktualisierung erfolgreich");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Tieres", error);
    }
  }

  function handleChange(event) {
    setTier({ ...tier, [event.target.name]: event.target.value });
  }

  return (
    <div className="edit-animal">
      <h2>{tier.name} bearbeiten</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tierart"
          value={tier.tierart}
          onChange={handleChange}
          placeholder="Tierart"
        ></input>
        <input
          type="text"
          name="name"
          value={tier.name}
          onChange={handleChange}
          placeholder="Name"
        ></input>
        <input
          type="text"
          name="krankheit"
          value={tier.krankheit}
          onChange={handleChange}
          placeholder="Krankheit"
        ></input>
        <input
          type="date"
          name="geburtstag"
          value={tier.geburtstag}
          onChange={handleChange}
          placeholder="Geburtstag"
        ></input>
        <input
          type="number"
          name="gewicht"
          value={tier.gewicht}
          onChange={handleChange}
          placeholder="Gewicht"
        ></input>
        <button type="submit">Aktualisieren</button>
      </form>
    </div>
  );
}

export default EditAnimal;


