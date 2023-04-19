import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { convertToEtherString } from "../utils";

interface Props {
  contract: ethers.Contract | null;
}

interface Donation {
  donor: string;
  amount: any;
}

const DonationList = ({ contract }: Props) => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      if (contract) {
        const donationCount = await (contract as any).methods.getDonationCount().call();
        console.log(donationCount);
        const donationPromises = [];
        for (let i = 0; i < donationCount; i++) {
          const donation = await (contract as any).methods.getDonation(i).call({from: (window as any).ethereum.selectedAddress});
          donationPromises.push(donation);
        }
        const donationResults = await Promise.all(donationPromises);
        console.log(donationResults);
        const newDonations = donationResults.map((donation) => ({
          donor: donation[0],
          amount: donation[1],
        }));
        setDonations(newDonations);
      }
    };
    fetchDonations();
  }, [contract]);

  console.log(donations);

  return (
    <div className="my-4">
      <h2 className="text-lg font-medium mb-2">Donation List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">#</th>
            <th className="p-2">Donor</th>
            <th className="p-2">Amount (ETH)</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{donation.donor}</td>
              <td className="p-2">
                {(ethers.parseEther(donation.amount.toString()) / BigInt(1000000000000000000)).toString()}
                ETH
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationList;
