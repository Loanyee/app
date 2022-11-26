import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Redirect from "../../components/utilityLogos/redirect";
import { loanData, lendingsData } from "./data";
import { useRouter } from "next/router";
import { useContractRead } from "wagmi";
import Link from "next/link";
import LoanHistorySection from "../../components/loanDetail/loanHistorySection";
import { loanFactoryABI } from "../../data/contractABI/LoanFactory";
import USDC from "../../components/cryptologos/usdc";
import Table from "../../components/Table";

const columns = [
  "Lender",
  "Value",
  "Maturity",
  "Contract Address",
  "Start Date",
  "Interest",
  "Status",
];

export default function LendingsDetails() {
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
      <div className="mx-auto  p-8 w-10/12  mt-16 mb-10 bg-white rounded-md shadow-lg  md:px-16 px-6 ">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Loan Detail</h1>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <Jazzicon
                diameter={65}
                seed={jsNumberForAddress(String(borrowerData.borrower))}
              />
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <p className="md:text-xl text-base font-semibold">
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
          </div>
          <div className="flex flex-col  gap-3 shrink bg-[#F5F9FF] rounded-md px-5 max-w-[640px]">
            <div className="grid md:grid-cols-3 grid-cols-2 border-b border-[#E7EEF9]">
              <div className="pb-[20px] pt-[20px]">
                <div className="border-r border-[#E7EEF9]">
                  <span className="text-base font-semibold text-[#767676]">
                    Loan Value
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">10,000 USDC</span>
                    <i className="hidden md:inline">
                      <USDC width={18} />{" "}
                    </i>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] pt-[20px]">
                <div className="sm:pl-[60px] pl-5 ">
                  <span className="text-base font-semibold text-[#767676]">
                    APR
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">12%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 ">
              <div className="pb-[20px] pt-[20px]">
                <div className="border-r border-[#E7EEF9]">
                  <span className="text-base font-semibold text-[#767676]">
                    Expected Amount
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">10,500 USDC</span>
                    <i className="hidden md:inline">
                      <USDC width={18} />{" "}
                    </i>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] pt-[20px]">
                <div className="sm:pl-[60px] pl-5 border-r border-[#E7EEF9]">
                  <span className="text-base font-semibold text-[#767676]">
                    Matruity
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">90 days</span>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] pt-[20px]">
                <div className="md:pl-[60px] pl-0 ">
                  <span className="text-base font-semibold text-[#767676]">
                    Contract Address
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">0xhf...24je </span>
                    <i>
                      {" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={etherscanBorrowerAddress}
                      >
                        <Redirect width="1.5rem" />
                      </a>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="font-semibold text-2xl">Repayment Status</h1>
          <div className="flex justify-between items-center shrink bg-[#F5F9FF] rounded-md px-5 max-w-[640px] py-5">
            <div className="flex gap-2 items-center mt-[15px]">
              <span className="md:text-xl text-base font-normal">
                6,060 / 10,100 USDC (60%)
              </span>
              <i className="hidden md:inline">
                <USDC width={18} />{" "}
              </i>
            </div>
          </div>

          <h1 className="font-semibold text-2xl">Borrower Detail</h1>
          <div className="flex flex-col gap-3 shrink bg-[#F5F9FF] rounded-md px-5 max-w-[480px]">
            <div className="flex flex-col sm:flex-row ">
              <div className="pb-[20px] pt-[20px]">
                <div className="sm:border-r border-b sm:border-b-0  border-[#E7EEF9] sm:pr-[60px] pr-0 pb-5">
                  <span className="text-sm font-semibold text-[#767676]">
                    Loan History
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-base font-normal">
                      100% Repayment
                    </span>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] sm:pt-[20px]  pt-[0px]">
                <div className="sm:pl-[60px] pl-0">
                  <span className="text-sm font-semibold text-[#767676]">
                    Salary History
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-base font-normal">
                      $5,000/month for 3 months
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Loan History */}
          <div>
            <div className="flex justify-between items-center mb-5">
              <h1 className="font-semibold text-2xl">Loan History</h1>
            </div>
            <div className="w-full overflow-auto">
              <div style={{ minWidth: "700px", maxHeight: "600px" }}>
                <Table columns={columns} data={loanData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
