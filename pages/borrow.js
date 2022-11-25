import EmployerApproval from "../components/borrowSignup/employerApproval";
import SetupLoan from "../components/borrowSignup/setupLoan";
import Completed from "../components/borrowSignup/completed";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { loanFactoryABI } from "../data/contractABI/LoanFactory";
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";
import Tabs from "../components/tabs";

import { Rings } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Borrow() {
  const { address: userAddress } = useAccount();

  const [currentItem, setCurrentItem] = useState(0);

  // Form Data

  const [currency, setCurrency] = useState("USDC");

  const [borrowAmount, setBorrowAmount] = useState();

  const [loanDuration, setLoanDuration] = useState();

  const [loanDurationType, setLoanDurationType] = useState("Month");

  const [employerAddress, setEmployerAddress] = useState();

  const [formIsEmpty, setFormIsEmpty] = useState(false);

  const [noActiveStream, setNoActiveStream] = useState(false);
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const setFunctions = {
    setCurrency: setCurrency,
    setBorrowAmount: setBorrowAmount,
    setLoanDuration: setLoanDuration,
    setLoanDurationType: setLoanDurationType,
    setEmployerAddress: setEmployerAddress,
    setIsBtnDisable: setIsBtnDisable,
  };

  const formState = {
    currency: currency,
    borrowAmount: borrowAmount,
    loanDuration: loanDuration,
    loanDurationType: loanDurationType,
    employerAddress: employerAddress,
    formIsEmpty: formIsEmpty,
  };

  const APY = 0.08;

  //List items
  const listItems = [
    <SetupLoan
      key={1}
      setFunctions={setFunctions}
      formState={formState}
      APY={APY}
      creditScore={3}
      noActiveStream={noActiveStream}
      setNoActiveStream={setNoActiveStream}
    />,
    <EmployerApproval key={2} />,
    <Completed key={3} formState={formState} APY={APY} />,
  ];

  //Checks to make sure tx completed already
  const [loanTxCompleted, setLoanTxCompleted] = useState(false);

  function nextPage() {
    if (currentItem == 0) {
      if (
        borrowAmount <= 0 ||
        loanDuration <= 0 ||
        borrowAmount == null ||
        loanDuration == null
      ) {
        setFormIsEmpty(true);
        return;
      } else {
        setFormIsEmpty(false);
      }
    }

    setCurrentItem((currentItem) => currentItem + 1);
  }

  function prevPage() {
    setCurrentItem((currentItem) => currentItem - 1);
  }

  // const borrowAmountInWeiString = ethers.utils.formatEther(borrowAmountInWei);
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_FACTORY,
    contractInterface: loanFactoryABI,
    functionName: "createNewLoan",
    args: [
      borrowAmount + "000000000000000000",
      8,
      loanDuration,
      employerAddress,
      userAddress,
      process.env.NEXT_PUBLIC_BORROW_TOKEN,
      process.env.NEXT_PUBLIC_SUPERFLUID_HOST,
    ],
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const {
    write: createLoan,
    isSuccess,
    data: loanTxData,
  } = useContractWrite(config);

  const {
    data,
    isError,
    isLoading: loanTxPending,
    isSuccess: loanTxSuccess,
  } = useWaitForTransaction({ hash: loanTxData?.hash });

  function submitForm(event) {
    createLoan();
  }

  if (loanTxSuccess && !loanTxCompleted) {
    nextPage();
    setLoanTxCompleted(true);
  }

  useEffect(() => {
    document.body.style.background = "#FFF";
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-3xl  mt-16 mb-10 bg-white rounded-md shadow-lg py-10 px-16">
        <Tabs />
        <header className=" flex flex-row justify-center items-center text-center align-middle gap-5">
          <div className="flex flex-row items-center gap-3">
            <div className="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center">
              <p className="text-white">1</p>
            </div>
            Setup Loan
          </div>
          <ArrowForwardIosIcon />
          {/* "flex flex-row opacity-50 items-center gap-3" */}
          <div
            className={
              currentItem == 0
                ? "flex flex-row opacity-50 items-center gap-3"
                : "flex flex-row items-center gap-3"
            }
          >
            <div className="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center">
              <p className="text-white">2</p>
            </div>
            Employer Approval
          </div>
          <ArrowForwardIosIcon />

          <div
            className={
              currentItem < 2
                ? "flex flex-row opacity-50 items-center gap-3"
                : "flex flex-row items-center gap-3"
            }
          >
            <div className="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center">
              <p className="text-white">3</p>
            </div>
            Completed
          </div>
        </header>
        {listItems[currentItem]}

        {/* Render Buttons to go back or forward */}
        <div className="flex justify-around mt-5">
          {currentItem == 2 && (
            <button
              onClick={prevPage}
              className="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center"
            >
              Back
            </button>
          )}
          {currentItem == 0 && !loanTxPending && (
            <button
              name="submitBtn"
              onClick={submitForm}
              className="text-md opacity-100 hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center disabled:cursor-not-allowed disabled:opacity-80"
              disabled={isBtnDisable}
            >
              Submit
            </button>
          )}
          {currentItem == 0 && loanTxPending && (
            <button
              name="submitBtn"
              disabled
              className="text-md flex justify-center  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center"
            >
              <Rings
                height="25"
                width="25"
                color="#ffffff"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            </button>
          )}

          {currentItem == 1 && (
            <button
              onClick={nextPage}
              className="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </>
  );
}
