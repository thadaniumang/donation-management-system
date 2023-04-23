import { useState } from "react";
import { ethers } from "ethers";

interface Props {
  contract: ethers.Contract | null;
}

const HospitalForm = ({ contract }: Props) => {
  const [patientAddress, setPatientAddress] = useState<string>("");
  const [requestedAmount, setRequestedAmount] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");

  const handleRequestFunds = async () => {
    if (contract) {
      try {
        const amountValue = Number(requestedAmount).toFixed(18);
        const valueInWei = ethers.parseUnits(amountValue,"ether")

        await (contract as any).methods
          .requestDonationForPatient(patientAddress, valueInWei, desc)
          .send({
            from: (window as any).ethereum.selectedAddress,
            gas: 1000000,
          });
        alert(
          `Request for ${requestedAmount} ETH for ${patientAddress} successful!`
        );
        setPatientAddress("");
        setRequestedAmount(0);
        setDesc("");
      } catch (error) {
        console.error(error);
        alert("Error requesting funds. Only Hospitals can raise funds for patients.");
      }
    } else {
      alert("Contract not initialized. Please try again later.");
    }
  };

  return (
    <div className="pageContainer formContainer">
      <h2 className="text-lg font-medium mb-5 text-center">
        Request Funds for a Patient
      </h2>
      <div className="formControl">
        <label htmlFor="patientName" className="mr-2">
          Patient Address:
        </label>
        <input
          id="patientName"
          type="text"
          className="inputField col-span-2"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label htmlFor="requestedAmount" className="mr-2">
          Requested Amount (ETH):
        </label>
        <input
          id="requestedAmount"
          type="number"
          step="0.01"
          min="0"
          className="inputField col-span-2"
          value={requestedAmount}
          onChange={(e) => setRequestedAmount(Number(e.target.value))}
        />
      </div>
      <div className="formControl">
        <label htmlFor="requestedAmount" className="mr-2">
          Description:
        </label>
        <input
          id="requestedAmount"
          type="text"
          step="0.01"
          min="0"
          className="inputField col-span-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="text-center mt-8">
        <button
          className="submitButton"
          onClick={handleRequestFunds}
        >
          Request Funds
        </button>
      </div>
    </div>
  );
};

export default HospitalForm;
