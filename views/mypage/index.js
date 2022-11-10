import Jazzicon, { jsNumberForAddress } from "react-jazzicon"; //Randomly generated profiles
import Redirect from "../../components/utilityLogos/redirect";
// const { Framework } = require("@superfluid-finance/sdk-core")

import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/useContext";
import { useRouter } from "next/router";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useSigner,
} from "wagmi";

import dataSet from "../../data/loanHistoryList.js";
import LoanHistorySection from "../../components/loanDetail/loanHistorySection";

import USDC from "../../components/cryptologos/usdc";
import DAI from "../../components/cryptologos/dai";

// import employmentLoanABI from "../data/contractABI/EmploymentLoan.json"
import { writeContract } from "@wagmi/core";
import { loanFactoryABI } from "../../data/contractABI/LoanFactory";
import { employmentLoanABI } from "../../data/contractABI/employmentLoan";
import { erc20ABI } from "../../data/contractABI/erc20TokenABI";
//Helper Functions

export default function BorrowerDetail() {
  function shortenAddress(str) {
    return str.substring(0, 5) + "..." + str.substring(str.length - 3);
  }

  //Router for passing data between pages
  const router = useRouter();
  const borrowerData = router.query;
  const borrowAmountInEther = (
    borrowerData.borrowAmount / Math.pow(10, 18)
  ).toFixed(0);
  const returnAmountInEther =
    borrowAmountInEther *
    (1 + (borrowerData.interestRate / 100) * (borrowerData.paybackMonths / 12));

  const { user, setUser } = useContext(UserContext);

  const [loanContractAddress, setLoanContractAddress] = useState("0x0000");

  //Get lender address
  const { address: lenderAddress } = useAccount();

  //Get loanContract Address
  const { data: employmentLoanAddress } = useContractRead({
    addressOrName: "0xFB26b9144f13e7D2485C4df2cCbb977660DC01fc",
    contractInterface: loanFactoryABI,
    functionName: "idToLoan",
    args: borrowerData.loanId,
    onSuccess(data) {
      setLoanContractAddress(data);
    },
  });

  //get borrow amount
  const { data: borrowAmount } = useContractRead({
    addressOrName: loanContractAddress,
    contractInterface: employmentLoanABI,
    functionName: "borrowAmount",
    onSuccess(data) {
      console.log("Borrow amount is ", borrowerData.borrowAmount);
    },
  });

  //Get DAI Token contract for lender to call approve()
  const { config: approveERC20Config } = usePrepareContractWrite({
    addressOrName: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
    contractInterface: erc20ABI,
    functionName: "approve",
    args: [loanContractAddress, borrowAmount + 25],
  });

  const {
    write: approveERC20,
    data,
    isSuccess,
  } = useContractWrite(approveERC20Config);

  //Prepare Lend Function
  const { config: lendToBorrowerConfig, error } = usePrepareContractWrite({
    addressOrName: employmentLoanAddress,
    contractInterface: employmentLoanABI,
    functionName: "lend",
  });

  console.log("logging error ", error);

  const {
    write: createNewLoan,
    data: lendData,
    isSuccess: lendSuccess,
  } = useContractWrite(lendToBorrowerConfig);
  console.log("logging errors", lendData, lendSuccess);

  //Link for etherscan
  const etherscanBorrowerAddress =
    "https://etherscan.io/address/" + borrowerData.borrower;
  const etherscanContractAddress =
    "https://etherscan.io/address/" + employmentLoanAddress;

  function approve() {
    approveERC20();
  }
  function lend() {
    createNewLoan();
  }

  return (
    <div>
      {/* Header */}
      <div className="mx-auto  p-8 w-10/12  mt-16 mb-10 bg-white rounded-md shadow-lg py-10 px-16 ">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">My Page</h1>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <Jazzicon
                diameter={65}
                seed={jsNumberForAddress(String(borrowerData.borrower))}
              />
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <p className="text-xl font-medium">0x32j240fje2w3j3e8 </p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={etherscanBorrowerAddress}
                  >
                    <Redirect width="1.5rem" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col  gap-3 shrink bg-[#F5F9FF] rounded-md p-5 w-full">
                <div className="flex gap-10 justify-items-center items-center  ">
                  <div className="flex flex-col gap-2 self-center">
                    <h1 className="text-gray-500 font-medium	">Loan History</h1>
                    <p className="text-lg font-semibold	">100% Repayment</p>
                  </div>
                  <div className=" divide-x divide-solid divide-gray-900"></div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-gray-500 font-medium	">
                      Salary History
                    </h1>
                    <p className="text-lg font-semibold	">$5,000 for 3 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loan History */}
          <div>
            <div className="flex justify-between items-center mb-5">
              <h1 className="font-medium text-xl">Loans</h1>
              <div>
                <button className="rounded-full border-2 border-black	px-5 py-2 text-lg font-semibold">
                  Create a new loan
                </button>
              </div>
            </div>

            <div className="py-5 pt-2 text-stone-500 grid grid-cols-13 grid-flow-row justify-between text-xl items-center">
              <div className="col-span-3">Lender</div>
              <div className="col-span-2">Value</div>
              <div className="col-span-2">Maturity</div>
              <div className="col-span-2">Contract Address</div>
              <div className="col-span-2">Started Date</div>
              <div className="col-span-1">Interest</div>
              <div className="col-span-1">Status</div>
            </div>
            <div>
              {dataSet.map((borrower, index) => {
                return (
                  <LoanHistorySection key={4} index={index} data={borrower} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
