import React, { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    contract: ethers.Contract | null;
}

const AddHospital = ({ contract }: Props) => {

    const [address, setAddress] = useState('');

    const addHospital = async () => {
        if (contract) {
            try {
                await (contract as any).methods.registerHospital().send({ from: address });
                alert('Hospital added');
            } catch (error) {
                console.error(error);
                alert('Error adding hospital. Please try again later.');
            }
        }
    };

    return (
        <div className="my-4">
            <h2 className="text-lg font-medium mb-2">Add Hospital</h2>
            <div className="flex flex-col">
                <label className="mb-2">Address</label>
                <input
                    type="text"
                    className="w-40 rounded-md p-2 border-gray-300"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-2"
                onClick={addHospital}
            >
                Add Hospital
            </button>
        </div>
    );
}
 
export default AddHospital;