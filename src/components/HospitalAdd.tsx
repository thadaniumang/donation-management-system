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
      } catch (error) {
        console.error(error);
        alert("Error adding hospital. Please try again later.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 px-96 flex-col my-4">
      <h2 className="text-lg font-medium mb-5 text-center">Add Hospital</h2>
      <div className="flex items-center">
        <label className="mr-2">Address:</label>
        <input
          type="text"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="mr-2">Name:</label>
        <input
          type="text"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="mr-2">Location:</label>
        <input
          type="text"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="mr-2">Contact:</label>
        <input
          type="text"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={contact}
          onChange={(e) => setcontact(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="mr-2">Email:</label>
        <input
          type="text"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="mr-2">Website:</label>
        <input
          type="text"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={website}
          onChange={(e) => setwebsite(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-2">
        <label className="mr-2">Description:</label>
        <input
          type="text"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-2"
        onClick={addHospital}
      >
        Add Hospital
      </button>
    </div>
  );
};

export default AddHospital;
