import { useState, useEffect } from "react";

import USDC from "../cryptologos/usdc.js"; //USDC svg component
import ETH from "../cryptologos/eth.js"; //ETH svg component
import DAI from "../cryptologos/dai.js";
import USDT from "../cryptologos/usdt.js";
import { GET_STREAM_DETAILS } from "../../queries/getStream";
import { GET_TIME } from "../../utils/date";
import { useLazyQuery } from "@apollo/client";
import moment from "moment/moment.js";
import { useAccount } from "wagmi";

const mockupData = [
  {
    __typename: "Stream",
    id: "0x54dc214722bb592e0f46a9a4a724eb464aea6b62-0x6f40b3e8000693929464d14ab05f38037f8edff2-0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00-0.0",
    currentFlowRate: "33333333333222",
    createdAtTimestamp: "1668429048",
    updatedAtTimestamp: "1668429048",
    token: {
      __typename: "Token",
      id: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00",
      name: "Super fDAI Fake Token",
      symbol: "fDAIx",
    },
    streamPeriods: [
      {
        __typename: "StreamPeriod",
        id: "0x54dc214722bb592e0f46a9a4a724eb464aea6b62-0x6f40b3e8000693929464d14ab05f38037f8edff2-0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00-0.0-0.0",
      },
    ],
  },
  {
    __typename: "Stream",
    id: "0x54dc214722bb592e0f46a9a4a724eb464aea6b62-0x6f40b3e8000693929464d14ab05f38037f8edff2-0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00-0.0",
    currentFlowRate: "99999999999999",
    createdAtTimestamp: "1664796413",
    updatedAtTimestamp: "1668429048",
    token: {
      __typename: "Token",
      id: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00",
      name: "Super fDAI Fake Token",
      symbol: "fDAIx",
    },
    streamPeriods: [
      {
        __typename: "StreamPeriod",
        id: "0x54dc214722bb592e0f46a9a4a724eb464aea6b62-0x6f40b3e8000693929464d14ab05f38037f8edff2-0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00-0.0-0.0",
      },
    ],
  },
  {
    __typename: "Stream",
    id: "0x54dc214722bb592e0f46a9a4a724eb464aea6b62-0x6f40b3e8000693929464d14ab05f38037f8edff2-0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00-0.0",
    currentFlowRate: "99999999999999",
    createdAtTimestamp: "1663241213",
    updatedAtTimestamp: "1668429048",
    token: {
      __typename: "Token",
      id: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00",
      name: "Super fDAI Fake Token",
      symbol: "fDAIx",
    },
    streamPeriods: [
      {
        __typename: "StreamPeriod",
        id: "0x54dc214722bb592e0f46a9a4a724eb464aea6b62-0x6f40b3e8000693929464d14ab05f38037f8edff2-0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00-0.0-0.0",
      },
    ],
  },
];

export default function SetupLoan({
  setFunctions,
  formState,
  APY,
  creditScore,
}) {
  const [openMenuCurrency, setOpenMenuCurrency] = useState(false);
  const [calculatedStream, setCalculatedStream] = useState([]);
  const { address, connector, isConnected } = useAccount();

  // const { loading, error, data } = useQuery(GET_STREAM_DETAILS, {
  //   variables: {
  //     sender: senderAddress.toLocaleLowerCase(),
  //     receiver: receiverAddress.toLocaleLowerCase(),
  //   },
  // });
  const senderAddress = address;
  const receiverAddress = "0x237CE8AbaED724970C17Afd1ff82B191CC3759Bc";

  // TYPE 0 2
  // const senderAddress = "0x02b5525Fd3bd29dBFaE8f8e453FE3B7e85D7D470";
  // const receiverAddress = "0x237CE8AbaED724970C17Afd1ff82B191CC3759Bc";

  const [getStream, { loading, data }] = useLazyQuery(GET_STREAM_DETAILS, {
    variables: {
      sender: senderAddress?.toLocaleLowerCase(),
      receiver: receiverAddress.toLocaleLowerCase(),
    },
  });

  function toggleMenuCurrency() {
    if (openMenuCurrency == false) {
      setOpenMenuCurrency(true);
    } else {
      setOpenMenuCurrency(false);
    }
  }

  const handleCurrency = (event) => {
    setFunctions.setCurrency(event.currentTarget.id);
    setOpenMenuCurrency(false);
  };

  const [openMenuDuration, setOpenMenuDuration] = useState(false);

  function toggleMenuDuration() {
    if (openMenuDuration == false) {
      setOpenMenuDuration(true);
    } else {
      setOpenMenuDuration(false);
    }
  }

  const handleDuration = (event) => {
    setFunctions.setLoanDurationType(event.currentTarget.id);
    setOpenMenuDuration(false);
  };

  const formatMonthlyAmount = (number) => {
    return Math.round((number / 10 ** 18) * 60 * 60 * 24 * 30);
  };

  useEffect(() => {
    if (data) {
      const streamsData = data.streams;
      const streams = [];

      // streamsData for real data

      streamsData.forEach((s, index) => {
        const currentStream = {
          stream: index + 1,
          duration: GET_TIME(moment().unix(), s.createdAtTimestamp),
          currentMonthlyAmount: formatMonthlyAmount(s.currentFlowRate),
          TotalAmountReceived: "19999",
        };
        streams.push(currentStream);
      });

      console.log("address", address);
      setCalculatedStream(streams);
    }
  }, [data]);

  return (
    <div className="max-h-100">
      <h1 className="flex  mt-8 font-bold text-2xl">Setup Loan 🔧</h1>

      <div className="mb-4 mt-4 flex items-center gap-5">
        <div className="flex-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="employer_address"
          >
            Employer Address
          </label>
          <input
            className=" appearance-none border-2  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none rounded-md text-lg"
            id="employer_address"
            type="text"
            placeholder="0xor...238m"
          />
        </div>
        <div>
          <button
            className="rounded-full border-2 border-black px-3 py-3 w-32	h-14	mt-7"
            onClick={() => getStream()}
          >
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : data?.streams[0]?.currentFlowRate == 0 ||
        data?.streams.length === 0 ? (
        <h1>No active stream with this account</h1>
      ) : (
        calculatedStream.map((stream) => {
          return (
            <div key={stream.stream}>
              <h2 className="text-xl text-gray-600">Stream {stream.stream}</h2>
              <div>
                <span className="text-xl text-gray-600">Duration : </span>
                <span className="text-xl font-medium">{stream.duration} </span>
              </div>
              <div>
                <span className="text-xl text-gray-600">
                  Current Monthly Amount :{" "}
                </span>
                <span className="text-xl font-medium">
                  {" "}
                  {stream.currentMonthlyAmount} USDC
                </span>
              </div>
              <div>
                <span className="text-xl text-gray-600">
                  Total Amount Received :{" "}
                </span>
                <span className="text-xl font-medium">10,000.00 USDC</span>
              </div>
            </div>
          );
        })
      )}

      <div className="flex flex-row mt-5 bg-slate-200 rounded-md p-3  gap-1">
        💡
        <h2 className="ml-3 text-gray-500 text-md font-normal">
          Current Interest Rate: <b>{APY * 100}%</b>
        </h2>
      </div>

      <div className="bt-5 flex flex-col gap-5 mt-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Borrow Amount</h2>
          <div className="grid grid-cols-5 border-2 px-5 rounded-md text-lg w-full p-3 border-gray-200">
            <input
              style={{ outline: "none" }}
              value={formState.borrowAmount}
              onChange={(event) =>
                setFunctions.setBorrowAmount(event.target.value)
              }
              placeholder="0.0"
              maxLength="9"
              className="col-span-4"
            />

            {/* <!-- Toggle Menu--> */}
            <div className="relative inline-block text-left col-span-1">
              <div>
                <button
                  onClick={toggleMenuCurrency}
                  type="button"
                  className="inline-flex items-center gap-2 w-full  rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {formState.currency}{" "}
                  {formState.currency == "USDC" && <USDC width="20px"></USDC>}{" "}
                  {formState.currency == "USDT" && <USDT width="20px"></USDT>}{" "}
                  {formState.currency == "DAI" && <DAI width="20px"></DAI>}
                  <div className="absolute right-3">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              {openMenuCurrency && (
                <div
                  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <button
                      onClick={handleCurrency}
                      className="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="USDC"
                    >
                      USDC <USDC width="1.5rem"></USDC>
                    </button>
                    <button
                      onClick={handleCurrency}
                      className="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="USDT"
                    >
                      USDT <USDT width="1.5rem"></USDT>{" "}
                    </button>
                    <button
                      onClick={handleCurrency}
                      className="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="DAI"
                    >
                      DAI <DAI width="1.5rem"></DAI>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Loan Duration</h2>
          <div className="grid grid-cols-5 border-2 px-5 rounded-md text-lg w-full p-3 border-gray-200">
            <input
              style={{ outline: "none" }}
              placeholder="0"
              value={formState.loanDuration}
              onChange={(event) =>
                setFunctions.setLoanDuration(event.target.value)
              }
              className="col-span-4"
            ></input>
            {/* Toggle Menu */}
            <div className="relative inline-block text-left col-span-1">
              <div>
                <button
                  onClick={toggleMenuDuration}
                  type="button"
                  className="inline-flex items-center gap-2 w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {formState.loanDurationType}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {openMenuDuration && (
                <div
                  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <button
                      onClick={handleDuration}
                      className="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="Day"
                    >
                      Day
                    </button>

                    <button
                      onClick={handleDuration}
                      className="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="Month"
                    >
                      Month
                    </button>
                    <button
                      onClick={handleDuration}
                      className="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="Year"
                    >
                      Year
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Employer Address</h2>
          <div className="grid grid-cols-5 border-2 px-5 rounded-md text-lg w-full p-3 border-gray-200">
            <input
              style={{ outline: "none" }}
              placeholder="0x..."
              value={formState.employerAddress}
              onChange={(event) =>
                setFunctions.setEmployerAddress(event.target.value)
              }
              className="col-span-4"
            ></input>
          </div>
        </div>
        {formState.formIsEmpty && (
          <div className="flex flex-row items-center mt-5 bg-slate-200 rounded-md p-3  gap-1">
            <div className="w-4 h-4 rounded-full bg-red-400 ml-3" />
            <h2 className="ml-3 text-gray-500 text-md font-normal">
              Form Cannot Be Empty
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
