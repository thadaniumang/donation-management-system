import { useState, useEffect } from "react";
import { ethers } from "ethers";

interface Props {
  contract: ethers.Contract | null;
}

interface Hospital {
  name: string;
  address: string;
}

const HospitalList = ({ contract }: Props) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       if (contract) {
//         const hospitalCount = await contract.getHospitalCount();
//         const hospitalPromises = [];
//         for (let i = 0; i < hospitalCount; i++) {
//           hospitalPromises.push(contract.hospitals(i));
//         }
//         const hospitalResults = await Promise.all(hospitalPromises);
//         const newHospitals = hospitalResults.map((hospital) => ({
//           name: hospital.name,
//           address: hospital.hospitalAddress,
//         }));
//         setHospitals(newHospitals);
//       }
//     };
//     fetchHospitals();
//   }, [contract]);

  return (
    <div className="my-4">
      <h2 className="text-lg font-medium mb-2">Hospital List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital, index) => (
            <tr key={index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{hospital.name}</td>
              <td className="p-2">{hospital.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalList;
