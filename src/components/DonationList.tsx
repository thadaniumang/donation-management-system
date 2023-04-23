import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { EUserType } from "../utils";

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
  const { userType } = useParams();

  const [address, setAddress] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [donations, setDonations] = useState<Donation[]>([]);

  const fetchDonations = async () => {
    setShowList(false);
    setError("");
    if (contract) {
      try {
        if (userType === EUserType.HOSPITAL) {
          const donations = await (contract as any).methods
            .getDonationsByHospital(address)
            .call();
          setDonations(donations);
        } else if (userType === EUserType.PATIENT) {
          const donations = await (contract as any).methods
            .getDonationsByPatient(address)
            .call();
          setDonations(donations);
        } else if (userType === EUserType.ALL) {
          const donations = await (contract as any).methods
            .getDonations()
            .call();
          setDonations(donations);
        }
        setShowList(true);
      } catch (err) {
        console.log(err);
        setError("Such an Address does not exist");
      }
    } else {
      setError("Contract not initialized");
    }
  };

  
  const [title, setTitle] = useState<string>("Donations");
  const [showInput, setShowInput] = useState<boolean>(false);

  useEffect(() => {
    if (userType === EUserType.HOSPITAL) {
      setTitle("Donations By Hospital");
      setShowInput(true);
    } else if (userType === EUserType.PATIENT) {
      setTitle("Donations To Patient");
      setShowInput(true);
    } else if (userType === EUserType.ALL) {
      setTitle("All Donations");
      fetchDonations();
    } else {
      setTitle("Invalid Page");
    }
  }, [userType]);

  return (
    <div className="w-full">
      <h2 className="text-lg font-medium mb-5 text-center">{title}</h2>
      { 
        showInput && (
          <>
            <div className="flex items-center justify-center">
              <input
                id="address"
                type="text"
                className="inputField"
                placeholder="Ethereum Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                className="submitButton ml-2"
                onClick={fetchDonations}
              >
                Get
              </button>
            </div>
          </>
        )
      }
      {
        showList && (
          <div className="mt-12 mb-6">
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
                      {Number(
                        ethers.formatEther(donation.amount)
                      ).toFixed(4).toString()}
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
        )
      }
      {
        error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )
      }
    </div>
  );
};

export default DonationList;
