import React from "react";

const arrow = (
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.85014 0.363636V8.89205L10.0717 5.65909L11.2536 6.82955L6.00355 12.0682L0.764915 6.82955L1.92401 5.65909L5.15696 8.89205V0.363636H6.85014Z"
      fill="#444444"
    />
  </svg>
);
const EmployApproval = () => {
  return (
    <div className="max-w-[500px] mx-auto mt-5">
      <h1 className="font-semibold text-2xl mb-[17px]">
        Approve the money streaming update to “0xk3...344f”
      </h1>
      <p className="text-[#444444] text-base font-normal mb-[40px]">
        0xk3...344r requests the loan on Loanyee and needs your approval to
        update the money streaming. Once you approve it, the cash flow will go
        to the Loanyee’s contract address.
        <br /> (loanyee.eth : 0xjw...3j3e) <br />
        Until they receive the loan from a lender, they will still receive 100%
        of cash flow. <br />
        Once you approve it here, if other employees ask loan on Loanyee, you
        don’t have to update it anymore.
      </p>
      <div className="flex flex-col gap-2">
        <p className="text-base font-semibold text-[#444444]">
          Original Recipient Address
        </p>
        <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
          <div className="font-medium">0xk3n4rgd23de9n344r</div>
        </div>
      </div>
      <div className="flex justify-center my-[25px]">{arrow}</div>
      <div className="flex flex-col gap-2">
        <p className="text-base font-semibold text-[#444444]">
          New receipient address
        </p>
        <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
          <div className="font-medium">loanyee.eth (0xjwi394ha3r923j3e)</div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="rounded-full border-2 border-black text-white bg-black w-[171px] px-5 py-2 text-lg font-semibold mt-10">
          Approve
        </button>
      </div>
    </div>
  );
};

export default EmployApproval;
