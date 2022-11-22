import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Redirect from "../../components/utilityLogos/redirect";
import { loanData, lendingsData } from "./data";
import { useRouter } from "next/router";
import { useContractRead } from "wagmi";
import Link from "next/link";
import LoanHistorySection from "../../components/loanDetail/loanHistorySection";
import { loanFactoryABI } from "../../data/contractABI/LoanFactory";
import USDC from "../../components/cryptologos/usdc";
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
      <div className="mx-auto  p-8 w-10/12  mt-16 mb-10 bg-white rounded-md shadow-lg py-10 px-16 ">
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
          </div>
          <div className="flex flex-col  gap-3 shrink bg-[#F5F9FF] rounded-md px-5 max-w-[640px]">
            <div className="grid grid-cols-3 border-b border-[#E7EEF9]">
              <div className="pb-[20px] pt-[20px]">
                <div className="border-r border-[#E7EEF9]">
                  <span className="text-base font-semibold text-[#767676]">
                    Loan Value
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">10,000 USDC</span>
                    <i>
                      <USDC width={18} />{" "}
                    </i>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] pt-[20px]">
                <div className="pl-[60px]">
                  <span className="text-base font-semibold text-[#767676]">
                    APR
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">12%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 ">
              <div className="pb-[20px] pt-[20px]">
                <div className="border-r border-[#E7EEF9]">
                  <span className="text-base font-semibold text-[#767676]">
                    Expected Amount
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">10,500 USDC</span>
                    <i>
                      <USDC width={18} />{" "}
                    </i>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] pt-[20px]">
                <div className="pl-[60px] border-r border-[#E7EEF9]">
                  <span className="text-base font-semibold text-[#767676]">
                    Matruity
                  </span>
                  <div className="flex gap-2 items-center mt-[15px]">
                    <span className="text-xl font-normal">90 days</span>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] pt-[20px]">
                <div className="pl-[60px] ">
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
              <span className="text-xl font-normal">
                6,060 / 10,100 USDC (60%)
              </span>
              <i>
                <USDC width={18} />{" "}
              </i>
            </div>
          </div>

          <h1 className="font-semibold text-2xl">Borrower Detail</h1>
          <div className="flex flex-col  gap-3 shrink bg-[#F5F9FF] rounded-md px-5 max-w-[480px]">
            <div className="flex">
              <div className="pb-[20px] pt-[20px]">
                <div className="border-r border-[#E7EEF9] pr-[60px]">
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
              <div className="pb-[20px] pt-[20px] ">
                <div className="pl-[60px]">
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
                  <Link
                    key={4}
                    href={{ pathname: "/borrowerDetail", query: borrower }}
                  >
                    <LoanHistorySection
                      key={4}
                      index={index}
                      data={borrower}
                      myPage={true}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
