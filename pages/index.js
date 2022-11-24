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
import Row from "../components/row";
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
        "https://api.studio.thegraph.com/query/35243/loanyee/0.3.0",
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

    let loanList = await fetch(
      "https://testnet.tableland.network/query?s=SELECT%20*%20FROM%20loan_5_775"
    );
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
      <div className="container mx-auto mt-16 mb-10 bg-white rounded-md shadow-lg py-10 md:px-16 px-6">
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
        <div className="w-full overflow-auto">
          <div style={{ minWidth: "700px", maxHeight: "600px" }}>
            {loanData.length ? (
              <table className="min-w-full">
                <thead className="sticky	top-0 bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="md:text-xl text-base	 font-normal text-stone-500 py-5 text-left"
                    >
                      Borrower
                    </th>
                    <th
                      scope="col"
                      className="md:text-xl text-base font-normal text-stone-500 py-5 text-left"
                    >
                      Loan Value
                    </th>
                    <th
                      scope="col"
                      className="md:text-xl text-base font-normal text-stone-500 py-5 text-left"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="md:text-xl text-base font-normal text-stone-500 py-5 text-left"
                    >
                      Interest Rate
                    </th>
                    <th
                      scope="col"
                      className="md:text-xl text-base font-normal text-stone-500 py-5 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                {loanData.map((borrower, index) => {
                  return (
                    <Row
                      data={borrower}
                      key={index}
                      pathname="/borrowerDetail"
                    />
                  );
                })}
              </table>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
