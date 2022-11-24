import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Link from "next/link.js";
import USDC from "./cryptologos/usdc.js";
import ETH from "./cryptologos/eth.js";
import DAI from "./cryptologos/dai.js";
import USDT from "./cryptologos/usdt.js";

const shortenAddress = (str) => {
  return str.substring(0, 5) + "..." + str.substring(str.length - 3);
};
const Row = ({ index, data, pathname }) => {
  return (
    <tr className="hover:opacity-70 hover:cursor-pointer border-b">
      <td>
        <Link key={index} href={{ pathname: pathname, query: data }}>
          <div className="flex gap-5 items-center  py-4 md:text-xl text-base">
            <Jazzicon diameter={50} seed={jsNumberForAddress(data.borrower)} />
            {shortenAddress(data.borrower)}
          </div>
        </Link>
      </td>
      <td>
        <Link key={index} href={{ pathname: pathname, query: data }}>
          <div className="flex gap-2  items-center  py-4 md:text-xl text-base">
            {data.currency == "USDC" && <USDC width="2rem"></USDC>}
            {data.currency == "ETH" && <ETH width="2rem"></ETH>}
            <DAI width="2rem"></DAI>
            {(data.borrowAmount / 1000000000000000000).toFixed(0)} DAI
          </div>
        </Link>
      </td>
      <td>
        <Link key={index} href={{ pathname: pathname, query: data }}>
          <div className="py-4 md:text-xl text-base">
            {data.paybackMonths} months
          </div>
        </Link>
      </td>
      <td>
        <Link key={index} href={{ pathname: pathname, query: data }}>
          <div className=" py-4 md:text-xl text-base">{data.interestRate}%</div>
        </Link>
      </td>
      <td>
        <Link key={index} href={{ pathname: pathname, query: data }}>
          <div className="flex gap-2 items-center col-span-1 py-4 md:text-xl text-base">
            <div className="w-5 h-5 rounded-full bg-green-400" /> Active
            {/* {data.status == "Inactive" && <div className="w-5 h-5 rounded-full bg-red-400"/>}
           {data.status} */}
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default Row;
