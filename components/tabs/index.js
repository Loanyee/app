/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "./style.module.css";

const Tabs = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("/");
  const changeTab = (url) => {
    router.push(url);
  };

  useEffect(() => {
    setActiveTab(router.pathname);
  }, []);

  return (
    <div
      className={`mx-auto mb-12 py-2 px-2 rounded-full bg-gray-200 flex gap-3 ${style.tabs} `}
    >
      <button
        className={`py-2 block basis-3/6 text-xl bg-white rounded-full active ${
          activeTab == "/" ? style.active : ""
        }`}
        onClick={() => changeTab("/")}
      >
        Lend
      </button>
      <button
        className={`block basis-3/6 text-xl bg-white rounded-full ${
          activeTab == "/borrow" ? style.active : ""
        }`}
        onClick={() => changeTab("/borrow")}
      >
        Borrow
      </button>
    </div>
  );
};

export default Tabs;
