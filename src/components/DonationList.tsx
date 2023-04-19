import { useState, useEffect } from "react";
import { ethers } from "ethers";

interface Props {
  contract: ethers.Contract | null;
}

interface Donation {
  donor: string;
  amount: any;
  hospital: string;
  patient: string;
  timestamp: string;
  description: string;
}

const DonationList = ({ contract }: Props) => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      if (contract) {
        const donations = await (contract as any).methods
          .getDonationsByHospital((window as any).ethereum.selectedAddress)
          .call();
        console.log({ donations });
        // const donationResults = await Promise.all(donationPromises);
        // const newDonations = donationResults.map((donation) => ({
        //   donor: donation[0],
        //   amount: donation[1],
        // }));
        setDonations(donations);
      }
    };
    fetchDonations();
  }, [contract]);

  console.log(donations);

  return (
    <div className="my-4">
      <h2 className="text-lg font-medium mb-2 text-center">Donation List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 ml-3">#</th>
            <th className="p-2">Amount (ETH)</th>
            <th className="p-2">Hospital</th>
            <th className="p-2">Patient</th>
            <th className="p-2">Timestamp</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                {(
                  BigInt(donation.amount) / BigInt(1000000000000000000)
                ).toString()}
                ETH
              </td>
              <td className="p-2">{donation.hospital}</td>
              <td className="p-2">{donation.patient}</td>
              <td className="p-2">{donation.timestamp}</td>
              <td className="p-2">{donation.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationList;
