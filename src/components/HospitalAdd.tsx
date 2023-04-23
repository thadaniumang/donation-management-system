import React, { useState } from "react";
import { ethers } from "ethers";

interface Props {
  contract: ethers.Contract | null;
}

const AddHospital = ({ contract }: Props) => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [location, setlocation] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [website, setwebsite] = useState("");
  const [desc, setdesc] = useState("");

  const addHospital = async () => {
    if (contract) {
      try {
        await (contract as any).methods
          .registerHospital(
            name,
            location,
            contact,
            email,
            website,
            desc,
            address
          )
          .send({
            from: (window as any).ethereum.selectedAddress,
            gas: 1000000,
          });
        alert("Hospital added");
        setAddress("");
        setName("");
        setlocation("");
        setcontact("");
        setemail("");
        setwebsite("");
        setdesc("");
      } catch (error) {
        console.error(error);
        alert("Error adding hospital. Only owners can add hospital.");
      }
    }
  };

  return (
    <div className="pageContainer formContainer">
      <h2 className="text-lg font-medium mb-12 text-center">Add Hospital</h2>
      <div className="formControl">
        <label htmlFor="address" className="mr-2 w-full">Address</label>
        <input
          type="text"
          id="address"
          className="inputField col-span-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label htmlFor="name" className="mr-2 w-full">Name</label>
        <input
          type="text"
          id="name"
          className="inputField col-span-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label htmlFor="location" className="mr-2 w-full">Location</label>
        <input
          type="text"
          id="location"
          className="inputField col-span-2"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label htmlFor="contact" className="mr-2 w-full">Contact</label>
        <input
          type="text"
          id="contact"
          className="inputField col-span-2"
          value={contact}
          onChange={(e) => setcontact(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label htmlFor="email" className="mr-2">Email</label>
        <input
          type="email"
          id="email"
          className="inputField col-span-2"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label htmlFor="website" className="mr-2">Website</label>
        <input
          type="url"
          id="website"
          className="inputField col-span-2"
          value={website}
          onChange={(e) => setwebsite(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label htmlFor="description" className="mr-2">Description</label>
        <input
          type="text"
          id="description"
          className="inputField col-span-2"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
      </div>
      <div className="text-center mt-12 mb-4">
        <button
          className="submitButton"
          onClick={addHospital}
        >
          Add Hospital
        </button>
      </div>
    </div>
  );
};

export default AddHospital;
