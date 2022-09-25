
import Link from "next/link"

import { ethers } from "ethers";

import abi from "../data/contractABI/LoanFactory.json"

import EmployerApproval from "../components/borrowSignup/employerApproval";
import SetupLoan from "../components/borrowSignup/setupLoan";
import Completed from "../components/borrowSignup/completed";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { list } from "postcss";
import ABI from "../data/contractABI/LoanFactory.json"

import {usePrepareContractWrite, useContractWrite, useAccount} from "wagmi"

let loanABI =  ABI

console.log("loan ABI is ", loanABI);

export default function Borrow(){

    const {address:userAddress} = useAccount()

    const [currentItem, setCurrentItem] = useState(0)

    const {user, setUser} = useContext(UserContext)

    const [isWalletConnected, setWalletConnected] = useState()


    // Form Data
    
    const [currency, setCurrency] = useState("USDC")

    const [borrowAmount, setBorrowAmount] = useState()

    const [loanDuration, setLoanDuration] = useState()

    const [loanDurationType, setLoanDurationType] = useState("Month")

    const [employerAddress, setEmployerAddress] = useState();

    const [formIsEmpty, setFormIsEmpty] = useState(false);

    const setFunctions = {
        setCurrency: setCurrency,
        setBorrowAmount: setBorrowAmount,
        setLoanDuration: setLoanDuration,
        setLoanDurationType: setLoanDurationType,
        setEmployerAddress: setEmployerAddress
    }

    const formState = {
        currency: currency,
        borrowAmount: borrowAmount,
        loanDuration: loanDuration,
        loanDurationType: loanDurationType,
        employerAddress: employerAddress,
        formIsEmpty: formIsEmpty
    }

    const APY = 0.10

    //List items
    const listItems = [<SetupLoan setFunctions={setFunctions} formState={formState} APY={APY} creditScore={3}/>,<EmployerApproval/>, <Completed formState={formState} APY={APY}/>]

   


    function nextPage(){
        if(currentItem==0){
            if(borrowAmount<=0 || loanDuration <=0 || borrowAmount==null || loanDuration ==null){
                setFormIsEmpty(true);
                return;
            }
            else{
                setFormIsEmpty(false);
            }


        }
       
        setCurrentItem((currentItem)=>currentItem+1)
    }

    function prevPage(){
        setCurrentItem((currentItem)=>currentItem-1)

    }

    // const borrowAmountInWeiString = ethers.utils.formatEther(borrowAmountInWei);
    const {config} = usePrepareContractWrite({
        addressOrName:  "0x60Fbd177b7B4311ab36134C106A88f337e981Ca9",
        contractInterface: loanABI,
        functionName: "createNewLoan",
        args:[borrowAmount+"000000000000000000", 10, loanDuration, employerAddress, userAddress, "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00", "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9"],
        onSuccess(data) {
            console.log('Success', data)
        },
    })
    const {write:createLoan, isSuccess } = useContractWrite(config)

    
    function submitForm(){
        console.log("Borrow amount at this stage " + borrowAmount);
        createLoan()
        nextPage()

    }
    return(
        <>
       
        <div class="mt-5 container mx-auto max-w-2xl ">
          
        <header class=" flex flex-row justify-center items-center text-center align-middle gap-5">
                <div class="flex flex-row items-center gap-3">
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            1
                        </p>
                    </div>
                    Setup Loan
                </div>
                <ArrowForwardIosIcon/>
                {/* "flex flex-row opacity-50 items-center gap-3" */}
                <div class={currentItem==0 ? "flex flex-row opacity-50 items-center gap-3" :"flex flex-row items-center gap-3" }>
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            2
                        </p>
                    </div>
                    Employer Approval
                </div>
                <ArrowForwardIosIcon/>

                <div class={currentItem<2 ? "flex flex-row opacity-50 items-center gap-3" : "flex flex-row items-center gap-3" }>
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            3
                        </p>
                    </div>
                    Completed
                </div>
            </header>
           {listItems[currentItem]}

           {/* Render Buttons to go back or forward */}
            <div class="flex justify-around mt-5">
            {currentItem==2 && <button onClick={prevPage} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Back</button>}

            {currentItem==0 && <button onClick={submitForm} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Submit</button>}

            {currentItem==1 &&
                <button onClick={nextPage} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Continue</button>
            }



            {/* {currentItem==2 ?
                <button onClick={submitForm} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Submit</button>
                        :
                <button onClick={nextPage} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Continue</button>

            }
                 */}

            </div>
        </div>
        </>
    )
}