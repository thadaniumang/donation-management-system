import { useState, useEffect } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import DonationManagement from "./contracts/DonationManagement.json";
import Home from "./components/Home";
import DonationList from "./components/DonationList";
import HospitalForm from "./components/HospitalForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddHospital from "./components/HospitalAdd";

const App = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      // Initialize Web3 provider
      const web3 = new Web3("http://localhost:7545");
      setWeb3(web3);

      // Initialize contract instance
      if (web3) {
        const contractAddress = process.env.CONTRACT_ADDRESS;
        const abi = DonationManagement.abi;
        const contractInstance = new web3.eth.Contract(
          abi as any,
          contractAddress
        );
        setContract(contractInstance as any);
      }
    };

    if (!web3) {
      init();
    }
  }, [web3]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home contract={contract} />} />
          <Route
            path="/donations/:userType"
            element={<DonationList contract={contract} />}
          />
          <Route
            path="/hospital"
            element={<HospitalForm contract={contract} />}
          />
          <Route
            path="/addhospital"
            element={<AddHospital contract={contract} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
