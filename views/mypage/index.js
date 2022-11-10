import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Redirect from "../../components/utilityLogos/redirect";
import { loanData, lendingsData } from "./data";
import { useRouter } from "next/router";
import { useContractRead } from "wagmi";

import LoanHistorySection from "../../components/loanDetail/loanHistorySection";
import { loanFactoryABI } from "../../data/contractABI/LoanFactory";

export default function BorrowerDetail() {
  const router = useRouter();
  const borrowerData = router.query;

  const { data: employmentLoanAddress } = useContractRead({
    addressOrName: "0xFB26b9144f13e7D2485C4df2cCbb977660DC01fc",
    contractInterface: loanFactoryABI,
    functionName: "idToLoan",
    args: borrowerData.loanId,
    onSuccess(data) {
      setLoanContractAddress(data);
    },
  });

  const etherscanBorrowerAddress =
    "https://etherscan.io/address/" + borrowerData.borrower;
  const etherscanContractAddress =
    "https://etherscan.io/address/" + employmentLoanAddress;

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
              {loanData.map((borrower, index) => {
                return (
                  <LoanHistorySection
                    key={4}
                    index={index}
                    data={borrower}
                    myPage={true}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-5">
              <h1 className="font-medium text-xl">Lendings</h1>
            </div>
            <div className="py-5 pt-2 text-stone-500 grid grid-cols-13 grid-flow-row justify-between text-xl items-center">
              <div className="col-span-3">Borrower</div>
              <div className="col-span-2">Value</div>
              <div className="col-span-2">Maturity</div>
              <div className="col-span-2">Credit Score</div>
              <div className="col-span-2">Started Date</div>
              <div className="col-span-1">ARP</div>
              <div className="col-span-1">Status</div>
            </div>
            <div>
              {lendingsData.map((borrower, index) => {
                return (
                  <LoanHistorySection
                    key={4}
                    index={index}
                    data={borrower}
                    myPage={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
