import { useState } from "react";
import { ethers } from "ethers";

interface Props {
  contract: ethers.Contract | null;
}

const HospitalForm = ({ contract }: Props) => {
  const [patientAddress, setPatientAddress] = useState<string>("");
  const [requestedAmount, setRequestedAmount] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  //address _patient, uint256 _amount, string memory _description

  const handleRequestFunds = async () => {
    if (contract) {
      try {
        const amountValue = Number(requestedAmount.toString());
        await (contract as any).methods
          .requestDonationForPatient(
            patientAddress,
            BigInt(amountValue) * BigInt(1000000000000000000),
            desc
          )
          .send({
            from: (window as any).ethereum.selectedAddress,
            gas: 1000000,
          });
        alert(
          `Request for ${requestedAmount} ETH for ${patientAddress} successful!`
        );
      } catch (error) {
        console.error(error);
        alert("Error requesting funds. Please try again later.");
      }
    } else {
      alert("Contract not initialized. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-96 flex-col my-4 my-4">
      <h2 className="text-lg font-medium mb-5 text-center">
        Request Funds for a Patient
      </h2>
      <div className="flex items-center">
        <label htmlFor="patientName" className="mr-2">
          Patient Address:
        </label>
        <input
          id="patientName"
          type="text"
          className="w-40 rounded-md p-2 bg-gray-200 border-gray-300"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-2">
        <label htmlFor="requestedAmount" className="mr-2">
          Requested Amount (ETH):
        </label>
        <input
          id="requestedAmount"
          type="number"
          step="0.01"
          min="0"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={requestedAmount}
          onChange={(e) => setRequestedAmount(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center mt-2">
        <label htmlFor="requestedAmount" className="mr-2">
          Description:
        </label>
        <input
          id="requestedAmount"
          type="text"
          step="0.01"
          min="0"
          className="w-40 rounded-md p-2 border-gray-300 bg-gray-200"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-2"
        onClick={handleRequestFunds}
      >
        Request Funds
      </button>
    </div>
  );
};

export default HospitalForm;
