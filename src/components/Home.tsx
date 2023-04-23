import { Link } from "react-router-dom";
import DonationForm from "./DonationForm";
import { ethers } from "ethers";

interface Props {
  contract: ethers.Contract | null;
}

function Home( {contract}: Props ) {
  return (
    <>
      <div className="text-center mt-6 mb-12">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Donato
        </h1>
        <p className="mb-5">
          This platform allows donors to donate money, hospitals to request money for a particular patient, and tracks all transactions. Please choose from the following options:
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
        <Link to="/addhospital" className="card">
          <h2 className="text-xl font-bold mb-2">Add Hospital</h2>
          <p className="text-gray-700">
            Add a hospital to the list of hospitals who can request funds.
          </p>
        </Link>
        <Link to="/donations/patient" className="card">  
          <h2 className="text-xl font-bold mb-2">Donations to Patients</h2>
          <p className="text-gray-700">
            View all the donations that a patient has received and their details.
          </p>
        </Link>
        <Link to="/donations/hospital" className="card">
          <h2 className="text-xl font-bold mb-2">Donations by Hospitals</h2>
          <p className="text-gray-700">
            View all the donations that a hospital has received for patients and their details.
          </p>    
        </Link>
        <Link to="/donations/all" className="card">    
          <h2 className="text-xl font-bold mb-2">All Donations</h2>
          <p className="text-gray-700">
            View all the donations that have been received by patients and their details.
          </p>  
        </Link>
        <Link to="/hospital" className="card">
          <h2 className="text-xl font-bold mb-2">Request Funds</h2>
          <p className="text-gray-700">
            Hospitals can request funds for a particular patient who needs medical treatment.
          </p>
        </Link>
      </div>
      <div className="text-center mt-12 mb-6">
        <h2 className="text-xl font-bold mb-2">Donate</h2>
        <p className="text-gray-700">
          Make a donation to the donation pool. <br/> Your donation will go towards helping patients in need.
        </p>
        <DonationForm contract={contract} />
      </div>
    </>
  );
}

export default Home;
