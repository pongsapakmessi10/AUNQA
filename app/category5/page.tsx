"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FormShell from "../components/FormShell";

export default function Category5Page() {
  const router = useRouter();

  const handlePrev = () => {
    router.push("/category4");
  };

  return (
    <FormShell onPrev={handlePrev}>
      {/* หมวดที่ 5 */}
      <div className="py-[26px] px-[36px] border-t border-gray-200">
        <div className="flex items-center gap-[10px] m-0 mb-[18px]">
          <span className="bg-[#d5ae52] text-white font-bold text-[13px] px-[12px] py-[5px] rounded-full">
            หมวดที่ 5
          </span>
          <h2 className="text-[16px] m-0 font-bold text-[#1b3860]">
            Category 5
          </h2>
        </div>
        
        <div className="w-full my-[20px] mb-[10px]">
          <p className="text-[14px] text-gray-700">
            Category 5 (อยู่ระหว่างการพัฒนา)
          </p>
        </div>
      </div>
    </FormShell>
  );
}
