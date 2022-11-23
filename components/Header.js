/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import loanyeeLogo from "../public/image/LoanyeeLogo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Router from "next/router";

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
    setIsMypage(true);
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
        {isConnected && isMypage && (
          <Link href="/mypage">
            <a className={style.mypageBtn}>My Page</a>
          </Link>
        )}

        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
