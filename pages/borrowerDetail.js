import Jazzicon, { jsNumberForAddress } from "react-jazzicon"; //Randomly generated profiles
import Redirect from "../components/utilityLogos/redirect";
// const { Framework } = require("@superfluid-finance/sdk-core")

import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";
import { useRouter } from "next/router";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useSigner,
} from "wagmi";

import dataSet from "../data/loanHistoryList.js";
import LoanHistorySection from "../components/loanDetail/loanHistorySection";

import USDC from "../components/cryptologos/usdc";
import DAI from "../components/cryptologos/dai";
import Table from "../components/Table";
// import employmentLoanABI from "../data/contractABI/EmploymentLoan.json"
import { writeContract } from "@wagmi/core";
import { loanFactoryABI } from "../data/contractABI/LoanFactory";
import { employmentLoanABI } from "../data/contractABI/employmentLoan";
import { erc20ABI } from "../data/contractABI/erc20TokenABI";
//Helper Functions

const columns = [
  "Lender",
  "Value",
  "Maturity",
  "Contract Address",
  "Start Date",
  "APR",
  "Status",
];
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
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_FACTORY,
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
    addressOrName: process.env.NEXT_PUBLIC_BORROW_TOKEN,
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
    write: lendToBorrower,
    data: lendData,
    isSuccess: lendSuccess,
  } = useContractWrite(lendToBorrowerConfig);
  console.log("logging errors", lendData, lendSuccess);

  //Link for etherscan
  const etherscanBorrowerAddress =
    "https://etherscan.io/address/" + borrowerData.borrower;
  const etherscanContractAddress =
    "https://etherscan.io/address/" + employmentLoanAddress;

  function lend() {
    lendToBorrower();
  }

  return (
    <div>
      {/* Header */}
      <div className="mx-auto  p-8 w-10/12  mt-16 mb-10 bg-white rounded-md shadow-lg py-10 md:px-16 px-6">
        <div className="flex flex-col gap-8">
          {/* Title and Borrower */}
          <div className="flex  flex-col  md:flex-row">
            <h1 className="font-semibold text-2xl flex-1">Borrower Detail</h1>
            <div className="flex-1 flex justify-start gap-4 mt-5 md:mt-0 md:justify-between">
              <button
                onClick={approveERC20}
                className="text-md hover:opacity-80  m-0 bg-stone-900 text-white py-2 px-5 rounded-full text-center"
              >
                Approve
              </button>
              <button
                onClick={lend}
                className="text-md hover:opacity-80  m-0 bg-stone-900 text-white py-2 px-5 rounded-full text-center"
              >
                Lend to this Borrower
              </button>
            </div>
          </div>

          {/* Account Detail */}
          <div className="flex items-center md:gap-5- gap-2">
            <div className="">
              <Jazzicon
                diameter={50}
                seed={jsNumberForAddress(String(borrowerData.borrower))}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="md:text-xl text-base font-medium  overflow-hidden	sm:w-48 w-40	md:w-full">
                  {borrowerData.borrower}{" "}
                </p>
                <span className="inline md:hidden">...</span>

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

          {/* Loan Detail */}

          <div className="grid grid-rows-2 flex-col border-2 divide-y divide-solid divide-gray-200 px-5 py-3 lg:w-[480px]	 w-full border-grey-200 rounded-md">
            <div className="grid grid-cols-3 justify-between pb-2">
              <div className="flex col-span-1 flex-col">
                <p className="text-md text-gray-500">Loan Value</p>
                <div className="flex gap-2">
                  <DAI width={"2rem"}></DAI>{" "}
                  <p className="md:text-xl text-base font-medium">
                    {borrowAmountInEther}
                  </p>
                </div>
              </div>
              <div className="flex col-span-1 flex-col">
                <p className="text-sm text-gray-500">Loan Duration</p>
                <p className="md:text-xl text-base font-medium">
                  {borrowerData.paybackMonths} Months
                </p>
              </div>
              <div className="flex col-span-1 flex-col ">
                <p className="text-md text-gray-500 mr-5">APY</p>
                <p className="md:text-xl text-base font-medium">
                  {borrowerData.interestRate}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 justify-around pt-2 pr-6">
              <div className="flex flex-col col-span-1">
                <p className="text-sm text-gray-500">Return Amount</p>
                <div className="flex gap-2">
                  <DAI width={"2rem"}></DAI>{" "}
                  <p className="md:text-xl text-base font-medium">
                    {returnAmountInEther.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col  col-span-1">
                <p className="text-sm text-gray-500">Contract Address</p>
                <div className="flex gap-2 items-center">
                  <p className="md:text-xl text-base font-medium">
                    {shortenAddress(`${employmentLoanAddress}`)}
                  </p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={etherscanContractAddress}
                  >
                    <Redirect width="1.2rem" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Borrower Summary */}
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-xl">Borrower Summary</h1>

            <div className="flex flex-col  gap-3 shrink md:w-[480px] w-full bg-[#F5F9FF] rounded-md p-5">
              <div className="flex md:gap-10 gap-2 justify-items-center items-center  ">
                <div className="flex flex-col gap-2 self-center">
                  <h1 className="text-gray-500">Credit Score</h1>
                  <p className="text-lg">5</p>
                </div>
                <div className=" divide-x divide-solid divide-gray-900"></div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-500">Loan History</h1>
                  <p className="text-lg">100% Repayment</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-500">Salary History</h1>
                  <p className="text-lg">3 months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Loan History */}
          <h1 className="font-medium text-xl">Loan History</h1>
          <div className="w-full overflow-auto">
            <div style={{ minWidth: "700px", maxHeight: "600px" }}>
              <Table columns={columns} data={dataSet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
