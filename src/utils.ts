import { ethers } from "ethers";

export const convertToEtherString = (amount: number) => {
    const val = ethers.parseEther(amount.toString());
    return Number(val.toString());
};

export enum EUserType {
    OWNER = "owner",
    HOSPITAL = "hospital",
    PATIENT = "patient",
    ALL = "all",
}
