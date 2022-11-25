import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Redirect from "../../components/utilityLogos/redirect";
import { loanData, lendingsData } from "./data";
import { useRouter } from "next/router";
import { useContractRead } from "wagmi";
import Link from "next/link";
import LoanHistorySection from "../../components/loanDetail/loanHistorySection";
import { loanFactoryABI } from "../../data/contractABI/LoanFactory";
import Row from "../../components/row";
import Table from "../../components/Table";

const columns = [
  "Lender",
  "Value",
  "Maturity",
  "Contract Address",
  "Start Date",
  "APR",
  "Status",
];
const lendingColumns = [
  "Lender",
  "Value",
  "Maturity",
  "Credit Score",
  "Start Date",
  "APR",
  "Status",
];
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

  const query =
    "?id=0x4f39860610f7a55898fc31a51b81c05b5b32fdd831997613f05970833fcdab71&interestRate=8&borrowAmount=100000000000000000000&paybackMonths=1&borrower=0x02b5525fd3bd29dbfae8f8e453fe3b7e85d7d470&loanId=70";
  return (
    <div>
      {/* Header */}
      <div className="mx-auto  p-8 w-10/12  mt-16 mb-10 bg-white rounded-md shadow-lg py-10 md:px-16 px-6  ">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">My Page</h1>
          </div>

          <div className="flex gap-3 justify-between items-center flex-wrap">
            <div className="flex items-center gap-5">
              <Jazzicon
                diameter={65}
                seed={jsNumberForAddress(String(borrowerData.borrower))}
              />
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <p className="md:text-xl  text-base font-medium">
                    0x32j240fje2w3j3e8{" "}
                  </p>
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
                    <p className="md:text-lg text-base font-semibold	">
                      100% Repayment
                    </p>
                  </div>
                  <div className=" divide-x divide-solid divide-gray-900"></div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-gray-500 font-medium	">
                      Salary History
                    </h1>
                    <p className="md:text-lg text-base font-semibold	">
                      $5,000 for 3 months
                    </p>
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
            <div className="w-full overflow-auto">
              <div style={{ minWidth: "700px", maxHeight: "600px" }}>
                <Table
                  columns={columns}
                  data={loanData}
                  pathname="/loanDetails"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-5">
              <h1 className="font-medium text-xl">Lendings</h1>
            </div>
            <div className="w-full overflow-auto">
              <div style={{ minWidth: "700px", maxHeight: "600px" }}>
                <Table
                  columns={lendingColumns}
                  data={lendingsData}
                  pathname="/lendingsDetails"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
