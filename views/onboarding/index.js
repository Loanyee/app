import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Borrower from "../../components/utilityLogos/borrower";
import Lenders from "../../components/utilityLogos/Lenders";
import style from "./style.module.css";

const OnboardingView = () => {
  const router = useRouter();

  const handleClick = (key, redirect) => {
    localStorage.setItem("Onboarding", key);
    if (typeof window !== "undefined") {
      router.push(`/${redirect}`);
    }
  };

  useEffect(() => {
    document.body.style.background = "#F8F8F8";
  }, []);

  return (
    <div className={`container mx-auto md:py-0 py-10 ${style.onboarding}`}>
      <div className={style.onboarding_wrapper}>
        <h1 className="font-medium text-4xl text-center">
          What do you want to do in Loanyee?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-16">
          <div
            className={`bg-white rounded-3xl shadow-sm p-10 relative ${style.card_wrapper}`}
            onClick={() => handleClick("Borrow", "/borrow")}
          >
            <h3 className="text-center font-semibold text-3xl mb-3">Borrow</h3>
            <p className="text-center font-medium text-lg">
              Instant fund with uncollateralized loan by <br /> sharing the
              future salary to the lender
            </p>
            <div className={`absolute ${style.card_img_left}`}>
              <Borrower />
            </div>
          </div>
          <div
            className={`bg-white rounded-3xl shadow-sm p-10 relative ${style.card_wrapper}`}
            onClick={() => handleClick("Lend", "")}
          >
            <h3 className="text-center font-semibold text-3xl mb-3">Lend</h3>
            <p className="text-center font-medium text-lg">
              Higher APY up to 30% <br /> than overcollateralized lending
              protocol
            </p>
            <div className={`absolute ${style.card_img_right}`}>
              <Lenders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
