"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function FormShell({
  children,
  onNext,
  onPrev,
  isCategory1Valid,
}: {
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  isCategory1Valid?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/category1") document.title = "AUNQA - หมวดที่ 1";
    else if (pathname === "/category2") document.title = "AUNQA - หมวดที่ 2";
    else if (pathname === "/category3") document.title = "AUNQA - หมวดที่ 3";
    else if (pathname === "/category4") document.title = "AUNQA - หมวดที่ 4";
    else if (pathname === "/category5") document.title = "AUNQA - หมวดที่ 5";
    else document.title = "AUNQA";
  }, [pathname]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>


      <div className="max-w-[920px] mx-auto bg-white rounded-[16px] shadow-[0_1px_2px_rgba(43,42,38,.06),_0_6px_20px_rgba(43,42,38,.05)] overflow-hidden border border-gray-200 print:shadow-none print:border-none print:rounded-none">
        <div className="bg-gradient-to-r from-[#1b3860] to-[#142946] h-[6px] w-full" />

        {/* Header */}
        <div className="flex items-center gap-[20px] py-[20px] px-[36px] pt-[28px] border-b border-gray-200 max-sm:flex-col max-sm:items-start">
          <div className="w-[100px] h-[100px] rounded-full bg-gray-50 border-2 border-[#1b3860] flex items-center justify-center shrink-0 overflow-hidden relative">
            <Image 
              src="/Logo/Thammasat.png" 
              alt="Thammasat Logo" 
              fill
              className="object-contain p-[4px] grayscale" 
            />
          </div>
          <div className="flex-1">
            <h1 className="text-[20px] m-0 mb-[6px] font-bold text-[#1b3860]">
              เค้าโครงรายวิชาและผลลัพธ์การเรียนรู้ที่คาดหวัง
            </h1>
            <div className="flex items-baseline gap-[8px] text-[14px] text-gray-700 mt-[4px]">
              <label className="font-semibold text-[#1b3860] whitespace-nowrap">
                หลักสูตร
              </label>
              <input
                defaultValue="สาขาวิชาพลังงานชีวภาพและการแปรรูปเทคโนโลยีชีวภาพ (หลักสูตรปรับปรุง พ.ศ. 2566)"
                className="flex-1 border-none border-b border-dashed border-gray-300 bg-transparent font-inherit text-[14px] text-gray-700 px-[4px] py-[2px] focus:outline-none focus:border-b focus:border-solid focus:border-[#d5ae52] print:border-transparent print:shadow-none print:bg-transparent"
              />
            </div>
            <div className="flex items-baseline gap-[8px] text-[14px] text-gray-700 mt-[4px]">
              <label className="font-semibold text-[#1b3860] whitespace-nowrap">
                คณะ
              </label>
              <input
                defaultValue="วิทยาศาสตร์และเทคโนโลยี"
                className="flex-1 border-none border-b border-dashed border-gray-300 bg-transparent font-inherit text-[14px] text-gray-700 px-[4px] py-[2px] focus:outline-none focus:border-b focus:border-solid focus:border-[#d5ae52] print:border-transparent print:shadow-none print:bg-transparent"
              />
            </div>
          </div>
        </div>

        {children}

        {/* Actions Toolbar */}
        <div className="flex justify-end gap-[10px] px-[36px] pb-[20px] print:hidden">
          {onPrev && (
            <button
              className="font-inherit text-[14px] font-semibold px-[18px] py-[10px] rounded-[8px] cursor-pointer border border-gray-200 bg-white text-gray-700 flex items-center gap-[6px] hover:bg-gray-50 transition duration-300"
              onClick={onPrev}
            >
              ย้อนกลับ
            </button>
          )}
          {onNext && (
            <button
              className="font-inherit text-[14px] font-semibold px-[18px] py-[10px] rounded-[8px] cursor-pointer border flex items-center gap-[6px] bg-[#d5ae52] border-[#d5ae52] text-white hover:bg-[#c29c45] hover:border-[#c29c45] transition duration-300"
              onClick={onNext}
            >
              ถัดไป ➡
            </button>
          )}
          {!onNext && (
            <button
              className="font-inherit text-[14px] font-semibold px-[18px] py-[10px] rounded-[8px] cursor-pointer border flex items-center gap-[6px] bg-[#d5ae52] border-[#d5ae52] text-white hover:bg-[#c29c45] hover:border-[#c29c45] transition duration-300"
              onClick={handlePrint}
            >
               Export / พิมพ์ PDF
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="py-[18px] px-[36px] pb-[26px] flex justify-between items-center text-[12px] text-gray-500 border-t border-gray-200">
          <span>
            เค้าโครงรายวิชา{" "}
            <input
              defaultValue="ทวป.367 การประเมินวัฏจักรผลิตภัณฑ์และคาร์บอนฟุตพรินต์สำหรับอุตสาหกรรมชีวเคมี"
              className="border-none bg-transparent font-inherit text-gray-500 text-[12px] text-right w-[420px] focus:outline-none focus:border-b focus:border-dashed focus:border-gray-300 print:border-transparent print:shadow-none print:bg-transparent"
            />
          </span>
          <span>
            หน้า{" "}
            <input
              defaultValue="1"
              className="border-none bg-transparent font-inherit text-gray-500 text-[12px] text-center w-[30px] focus:outline-none focus:border-b focus:border-dashed focus:border-gray-300 print:border-transparent print:shadow-none print:bg-transparent"
            />
          </span>
        </div>
      </div>
    </>
  );
}
