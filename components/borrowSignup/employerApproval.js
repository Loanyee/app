import rocifi from "../../public/image/rocifi.jpeg"
import Image from "next/image"


import CopyButton from "../utilityLogos/copyButton"
import { loanFactoryABI } from "../../data/contractABI/LoanFactory";
import { useContractEvent, useSigner, useContractRead } from "wagmi";
import { useState } from "react";


const axios = require("axios");



export default function EmployerApproval(){
    
    const { data: signer, isError, isLoading } = useSigner()
  
    const [loanId, setLoanId] = useState(0);


    const [loanAddress, setLoanAddress] = useState("loading...")

    
    async function getLoanAddress(){
        const userAddress = await signer.getAddress()
        console.log("User address " , userAddress);
        
        const mostReccentLoan = await axios.post(
            process.env.NEXT_PUBLIC_GRAPH_KEY,
            {
              query: 
                    `{
                        loanHistories(first: 1, orderBy: loanId, orderDirection:desc, where:{borrower: "${userAddress}"} )  {
                          id
                          interestRate
                          borrowAmount
                          interestRate
                          paybackMonths
                          borrower
                          loanId
                        }
                    }`,
            
            }
          );

         setLoanId(mostReccentLoan.data.data.loanHistories[0].loanId)
        
    }

    getLoanAddress()

    console.log("loan id" , loanId);
    const { data } = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_CONTRACT_FACTORY,
        contractInterface: loanFactoryABI,
        functionName: 'idToLoan',
        args: loanId,
        onSuccess(data){
            setLoanAddress(data);
            console.log(data);
        },
        onError(error) {
            console.log('Error', error)
          },
        onSettled(data, error) {
        console.log('Settled', { data, error })
        },
    })
    console.log("loan address" ,loanAddress);

   
    return(
        <div className="flex flex-col gap-16 max-h-100">

        <div className="flex flex-col mt-8 gap-2">
            <h1 className="font-bold text-2xl">
            Get Employer Approval 🤝
            </h1>
            <p className="text-stone-500">
                Ask your employer to change the destination of the cash flow to the new address.
            </p>
        </div>

        <div className="flex flex-col gap-2" >
            <p className="text-lg font-semibold">Original Recipient Address</p>
            <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
            <div className="font-medium" >
                0x8324738527428324
            </div>

            </div>
            
        </div>

        <div className="flex flex-col gap-2 mb-10" >
            <p className="text-lg font-semibold">Loan Contract Address</p>
            <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3 items-center  gap-2">

                <div className="font-medium">loanyee.eth</div>

                <CopyButton></CopyButton>
                {loanAddress}


            </div>
            
        </div>
       
        
      
        
  
   
    </div>
    )
    }