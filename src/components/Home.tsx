import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto mt-10 px-96">
      <h1 className="text-3xl font-bold mb-5">
        Welcome to the Donation Management System
      </h1>
      <p className="mb-5">
        This platform allows donors to donate money, hospitals to request money
        for a particular patient, and tracks all transactions. Please choose
        from the following options:
      </p>
      <div className="flex-col">
        <div className="flex justify-around mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3 mb-5">
            <Link to="/donate">
              <div className="p-5 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-300 h-40">
                <h2 className="text-xl font-bold mb-2">Donate</h2>
                <p className="text-gray-700">
                  Make a donation to the donation pool. Your donation will go
                  towards helping patients in need.
                </p>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mb-5">
            <Link to="/hospital">
              <div className="p-5 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-300 h-40">
                <h2 className="text-xl font-bold mb-2">Request Funds</h2>
                <p className="text-gray-700">
                  Hospitals can request funds for a particular patient who needs
                  medical treatment.
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-around mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3 mb-5">
            <Link to="/donations">
              <div className="p-5 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-300 h-40">
                <h2 className="text-xl font-bold mb-2">View Donations</h2>
                <p className="text-gray-700">
                  View all the donations that you have received and their
                  details.
                </p>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mb-5">
            <Link to="/addhospital">
              <div className="p-5 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-300 h-40">
                <h2 className="text-xl font-bold mb-2">Add Hospital</h2>
                <p className="text-gray-700">
                  Add a hospital to the list of hospitals who can request funds.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
