

  import { useContractEvent } from "wagmi"

export default function Test(){
    useContractEvent({
        address: process.env.NEXT_PUBLIC_CONTRACT_FACTORY,
        abi: loanFactoryABI,
        eventName: 'loanCreated',
        listener(node, label, owner) {
          console.log("testing listner " ,node, label, owner)
        },
      })
    return(
        <div>
            test
        </div>
    )
}