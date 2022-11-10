/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import loanyeeLogo from "../public/image/LoanyeeLogo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

//wallet connect
import { useAccount } from "wagmi";

//React Hooks
import { useEffect, useState } from "react";
import style from "../styles/Home.module.css";
const Header = ({ updatedHeader }) => {
  const { isConnected } = useAccount();
  const [walletConnected, setWalletConnected] = useState();
  const [checkNewUser, setCheckNewUser] = useState();
  const [isMypage, setIsMypage] = useState();
  useEffect(() => {
    setWalletConnected(isConnected);
    setCheckNewUser(localStorage.getItem("joinas"));
    setIsMypage(localStorage.getItem("wagmi.connected"));
  }, []);

  return (
    <header
      className={`flex justify-between align-middle py-6 px-8 ${
        updatedHeader ? style.header_bg : ""
      }`}
    >
      <Link href="/">
        <div className="items-center">
          <Image
            src={loanyeeLogo}
            width={200}
            height={40}
            alt="Not found"
          ></Image>
        </div>
      </Link>

      <div className="flex flex-row gap-3 items-center">
        {/* {walletConnected && (
          <Link href="/borrow">
            <a className="text-lg hover:opacity-60 m-0 border-black border-2 text-black bg-white py-2 px-5 rounded-full">
              Become a Borrower
            </a>
          </Link>
        )} */}
        {isMypage && (
          <Link href="/mypage">
            <a className="text-lg hover:opacity-60 m-0 border-black border-2 text-black bg-white py-2 px-5 rounded-full">
              Mypage
            </a>
          </Link>
        )}

        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
