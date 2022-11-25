/* eslint-disable react-hooks/exhaustive-deps */

import Link from "next/link";
import Image from "next/image";
import loanyeeLogo from "../public/image/LoanyeeLogo.svg";
import banner from "../public/image/banner.png";
import BorrowerSection from "../components/borrowerSection.js";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";
import Tabs from "../components/tabs";
import dataSet from "../data/borrowerList";
import { loanFactoryABI } from "../data/contractABI/LoanFactory";
import { erc20ABI } from "wagmi";

//API Calls
const axios = require("axios");

export default function Home() {
 
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [isWalletConnected, setWalletConnected] = useState();
  const [loanData, setLoanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [difference, setDifference] = useState("");

  async function fetchLoans() {
    const getLoanHistory = async () => {
      const loanHistory = await axios.post(
        process.env.NEXT_PUBLIC_GRAPH_KEY,
        {
          query: `
                {
                    loanHistories(first: 6, orderBy: loanId, orderDirection:desc) {
                      id
                      interestRate
                      borrowAmount
                      interestRate
                      paybackMonths
                      borrower
                      loanId
                    }
                }
                `,
        }
      );
      return loanHistory;
    };

    let loanList = await fetch(process.env.NEXT_PUBLIC_TABLELAND_API);
    const data = await loanList.json();
    const loanDataTemp = await getLoanHistory();
    console.log(loanDataTemp);
    console.log(
      "Loan data from the graph returns ",
      loanDataTemp.data.data.loanHistories
    );
    setLoanData(loanDataTemp.data.data.loanHistories);
  }
  useEffect(() => {
    document.body.style.background = "#FFF";
    if (!localStorage.getItem("Onboarding")) {
      router.push(`/onboarding`);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div>
      <div className="container mx-auto mt-16 mb-10 bg-white rounded-md shadow-lg py-10 px-16">
        <Tabs />
        <h1 className="font-xl">{difference} </h1>
        {/* Banner */}
        {/* <div className="container mt-12 mx-auto">
                <Image className="w-12" src={banner}></Image>
              </div> */}

        {/* Sorting */}
        {/* <div className="container mt-12 mx-auto grid grid-cols-12">
      
         <div className="bg-neutral-100 rounded-full px-5 py-1">
          <input style={{outline:"none"}} ></input>
         </div>
      </div> */}

        {/* Categories */}
        <div className="mt-10  py-5 grid grid-cols-9 justify-between text-xl text-stone-500 items-center">
          <div className="col-span-2">Borrower</div>
          <div className="col-span-2">Loan Value</div>
          <div className="col-span-2">Duration</div>
          {/* <div className="col-span-2">Credit Score</div> */}
          {/* <div className="col-span-2">Salary History</div> */}
          <div className="col-span-2">Interest Rate</div>
          <div className="col-span-1">Status</div>
        </div>

        {/* Borrowers List */}
        <div style={{ maxHeight: "67rem" }} className="container mx-auto">
          {loanData.map((borrower, index) => {
            return (
              <Link
                key={index}
                href={{ pathname: "/borrowerDetail", query: borrower }}
              >
                <a>
                  <BorrowerSection index={index} data={borrower} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
