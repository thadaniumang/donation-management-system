// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract DonationManagementSystem {
    
    struct Hospital {
        uint256 id;
        string name;
        string location;
        string contact;
        string email;
        string website;
        string description;
    }

    struct Donation {
        uint256 id;
        uint256 amount;
        uint256 timestamp;
        address hospital;
        address patient;
        string description;
    }

    address public owner;
    uint256 public donationId;

    mapping(address => Hospital) public hospitals;
    mapping(uint256 => Donation) public donations;
    mapping(address => uint256) public balances;

    event DonationReceived(address indexed donor, uint256 amount);
    event DonationMade(address indexed donor, address indexed hospital, uint256 indexed donationId, uint256 amount);
    event HospitalAdded(address indexed hospital);

    uint256 public hospitalId;
    uint256 public patientId;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyHospital() {
        require(hospitals[msg.sender].id != 0, "Only hospital can call this function.");
        _;
    }

    function registerHospital(string memory _name, string memory _location, string memory _contact, string memory _email, string memory _website, string memory _description, address hospital) public onlyOwner {
        hospitals[hospital] = Hospital(hospitalId + 1, _name, _location, _contact, _email, _website, _description);
        hospitalId++;
        emit HospitalAdded(hospital);
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than zero.");
        balances[msg.sender] += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getDonations() public view returns (Donation[] memory) {
        Donation[] memory _donations = new Donation[](donationId);
        for (uint256 i = 0; i < donationId; i++) {
            _donations[i] = donations[i];
        }
        return _donations;
    }

    function getDonationsByHospital(address _hospital) public view returns (Donation[] memory) {
        Donation[] memory _donations = new Donation[](donationId);
        uint256 counter = 0;
        for (uint256 i = 0; i < donationId; i++) {
            if (donations[i].hospital == _hospital) {
                _donations[counter] = donations[i];
                counter++;
            }
        }
        return _donations;
    }

    function getDonationsByPatient(address _patient) public view returns (Donation[] memory) {
        Donation[] memory _donations = new Donation[](donationId);
        uint256 counter = 0;
        for (uint256 i = 0; i < donationId; i++) {
            if (donations[i].patient == _patient) {
                _donations[counter] = donations[i];
                counter++;
            }
        }
        return _donations;
    }

    function getDonationsByMe() public view returns (uint256) {
        uint256 _balance = balances[msg.sender];
        return _balance;
    }

    function getDonationsByHospitalAndPatient(address _hospital, address _patient) public view returns (Donation[] memory) {
        Donation[] memory _donations = new Donation[](donationId);
        uint256 counter = 0;
        for (uint256 i = 0; i < donationId; i++) {
            if (donations[i].hospital == _hospital && donations[i].patient == _patient) {
                _donations[counter] = donations[i];
                counter++;
            }
        }
        return _donations;
    }

    function requestDonationForPatient(address _patient, uint256 _amount, string memory _description) public onlyHospital {
        require(_amount > 0, "Requested donation amount must be greater than zero.");
        require(_amount <= address(this).balance, "Requested donation amount is greater than available balance.");
        payable(_patient).transfer(_amount);
        donations[donationId] = Donation(donationId, _amount, block.timestamp, msg.sender, _patient, _description);
        donationId++;
    }

    function getDonationCount() public view returns (uint256) {
        return donationId;
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
