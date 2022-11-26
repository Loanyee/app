import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Link from "next/link.js";
import USDC from "./cryptologos/usdc.js";
import ETH from "./cryptologos/eth.js";
import DAI from "./cryptologos/dai.js";
import USDT from "./cryptologos/usdt.js";

const shortenAddress = (str) => {
  return str.substring(0, 5) + "..." + str.substring(str.length - 3);
};

const getClassName = (status) => {
  let color;
  switch (status) {
    case "Not Active":
      color = "text-yellow-500";
      break;
    case "Completed":
      color = "text-blue-500";
      break;
    case "Stopped":
      color = "text-red-500";
      break;
    case "Active":
      color = "text-green-500";
      break;
    default:
      color = "text-black";
  }
  return color;
};

const Table = ({ columns, data, pathname }) => {
  return (
    <table className="min-w-full">
      <thead className="sticky	top-0 bg-white">
        <tr>
          {columns.map((col, index) => {
            return (
              <th
                key={index}
                scope="col"
                className="md:text-xl text-base	 font-normal text-stone-500 py-5 text-left"
              >
                {col}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {pathname
          ? data.map((row, index) => {
              return (
                <tr
                  className="hover:opacity-70 hover:cursor-pointer border-b"
                  key={index}
                >
                  <td>
                    <Link
                      key={index}
                      href={{ pathname: pathname, query: data }}
                    >
                      <div className="flex gap-5 items-center  py-4 md:text-xl text-base">
                        <Jazzicon
                          diameter={50}
                          seed={jsNumberForAddress(row.lenderAddress)}
                        />
                        {shortenAddress(row.lenderAddress)}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link
                      key={index}
                      href={{ pathname: pathname, query: data }}
                    >
                      <div className="flex gap-2 items-center  py-4 md:text-xl text-base">
                        {row.currency == "USDC" && <USDC width="2rem"></USDC>}
                        {row.currency == "USDT" && <USDT width="2rem"></USDT>}
                        {row.currency == "DAI" && <DAI width="2rem"></DAI>}

                        {row.value}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link
                      key={index}
                      href={{ pathname: pathname, query: data }}
                    >
                      <div className="py-4 md:text-xl text-base">
                        {row.maturity}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link
                      key={index}
                      href={{ pathname: pathname, query: data }}
                    >
                      <div className="py-4 md:text-xl text-base">
                        {shortenAddress(row.contractAddress)}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link
                      key={index}
                      href={{ pathname: pathname, query: data }}
                    >
                      <div className="py-4 md:text-xl text-base">
                        {row.startDate}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link
                      key={index}
                      href={{ pathname: pathname, query: data }}
                    >
                      <div className="py-4 md:text-xl text-base">{row.APY}</div>
                    </Link>
                  </td>
                  <td>
                    <Link
                      key={index}
                      href={{ pathname: pathname, query: data }}
                    >
                      <div className="py-4 md:text-xl text-base">
                        <span className={getClassName(row.status)}>
                          {" "}
                          {row.status}
                        </span>
                      </div>
                    </Link>
                  </td>
                </tr>
              );
            })
          : data.map((row, index) => {
              return (
                <tr
                  className="hover:opacity-70 hover:cursor-pointer border-b"
                  key={index}
                >
                  <td>
                    <div className="flex gap-5 items-center  py-4 md:text-xl text-base">
                      <Jazzicon
                        diameter={50}
                        seed={jsNumberForAddress(row.lenderAddress)}
                      />
                      {shortenAddress(row.lenderAddress)}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center  py-4 md:text-xl text-base">
                      {row.currency == "USDC" && <USDC width="2rem"></USDC>}
                      {row.currency == "USDT" && <USDT width="2rem"></USDT>}
                      {row.currency == "DAI" && <DAI width="2rem"></DAI>}

                      {row.value}
                    </div>
                  </td>
                  <td>
                    <div className="py-4 md:text-xl text-base">
                      {row.maturity}
                    </div>
                  </td>
                  <td>
                    <div className="py-4 md:text-xl text-base">
                      {shortenAddress(row.contractAddress)}
                    </div>
                  </td>
                  <td>
                    <div className="py-4 md:text-xl text-base">
                      {row.startDate}
                    </div>
                  </td>
                  <td>
                    <div className="py-4 md:text-xl text-base">{row.APY}</div>
                  </td>
                  <td>
                    <div className="py-4 md:text-xl text-base">
                      <span className={getClassName(row.status)}>
                        {" "}
                        {row.status}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
};

export default Table;
