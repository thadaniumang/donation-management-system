import { useEffect, useState } from "react";
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
    <div className="my-4">
      <h2 className="text-lg font-medium mb-2">Make a Donation</h2>
      <div className="flex items-center">
        <label htmlFor="donationAmount" className="mr-2">
          Donation Amount (ETH):
        </label>
        <input
          id="donationAmount"
          type="number"
          step="0.01"
          min="0"
          className="w-40 rounded-md p-2 border-gray-300"
          value={donationAmount}
          onChange={(e) => setDonationAmount(Number(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-2"
        onClick={handleDonation}
      >
        Donate
      </button>
    </div>
  );
};

export default DonationForm;
