import { useState } from "react";
import { ethers } from "ethers";
import { convertToEtherString } from "../utils";

interface Props {
  contract: ethers.Contract | null;
}

const DonationForm = ({ contract }: Props) => {
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleDonation = async () => {
    if (contract) {
      try {
        console.log((window as any).ethereum.selectedAddress);
        const amountValue = convertToEtherString(donationAmount);
        await (contract as any).methods.donate().send({
          from: (window as any).ethereum.selectedAddress,
          value: amountValue,
        });
        alert(`Donation of ${donationAmount} ETH successful!`);
      } catch (error) {
        console.error(error);
        alert("Error donating funds. Please try again later.");
      }
    } else {
      alert("Contract not initialized. Please try again later.");
    }
  };

  return (
    <div className="my-6">
      <div className="flex items-center justify-center">
        <input
          id="donationAmount"
          type="number"
          placeholder="Donation Amount (ETH)"
          step="0.01"
          min="0"
          className="inputField"
          value={donationAmount}
          onChange={(e) => setDonationAmount(Number(e.target.value))}
        />
        <button
          className="submitButton ml-2"
          onClick={handleDonation}
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default DonationForm;
