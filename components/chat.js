import { useAccount } from "wagmi";
import { Chat } from "@pushprotocol/uiweb";

export default function PushChat() {
  const { address: walletAddress } = useAccount();
  const apiKey = process.env.NEXT_PUBLIC_PUSH_KEY;
  const support = "0x7e2cE82d63e74b0125404D8172c12137F818aA24";
  if (!walletAddress) {
    return null;
  }

  return (
    <Chat
      account={walletAddress} //user address
      supportAddress={support} //support address
      apiKey={apiKey}
      env="staging"
      primaryColor="#B836D9"
    />
  );
}
