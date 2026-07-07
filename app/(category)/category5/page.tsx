"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormShell from "../../components/FormShell";

export default function Category5Page() {
  const router = useRouter();

  // State สำหรับจัดการข้อมูลประกอบการปรับปรุง (Dynamic List)
  const [improvements, setImprovements] = useState([
    "ผลการศึกษาของนักศึกษา",
    "ผลการประเมินประสิทธิผลของรายวิชาโดยนักศึกษา",
    "ผลการประเมินการสอนโดยนักศึกษา",
    "บันทึกของกลุ่มอาจารย์ผู้สอน",
  ]);

  const handlePrev = () => {
    router.push("/category4");
  };

  const addImprove = () => {
    setImprovements([...improvements, ""]);
  };

  const removeImprove = (index: number) => {
    setImprovements(improvements.filter((_, i) => i !== index));
  };

  const updateImprove = (index: number, value: string) => {
    const newImprovements = [...improvements];
    newImprovements[index] = value;
    setImprovements(newImprovements);
  };

  // คลาสสไตล์สำหรับกล่องข้อความที่ปรับให้เหมือนในรูป
  const inputClassName = "w-full font-sans text-[14px] border border-gray-200 rounded-md py-[10px] px-[12px] bg-[#f8f9fa] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[1px] focus:ring-blue-400 focus:bg-white resize-y";

  return (
    <FormShell onPrev={handlePrev}>
      <div className="bg-white border-t border-gray-200">

        {/* Header */}
        <div className="py-[26px] px-[36px] border-b border-gray-200">
          <h1 className="text-[18px] font-bold text-gray-900 mb-1.5 m-0">
            หมวดที่ 5 การประเมินและปรับปรุงการดำเนินการของรายวิชา
          </h1>
          <div className="text-[13px] text-gray-600">
            เค้าโครงรายวิชา ทวป.367 การประเมินวัฏจักรผลิตภัณฑ์และคาร์บอนฟุตพรินต์สำหรับอุตสาหกรรมชีวเคมี
          </div>
        </div>

        {/* Main Section */}
        <div className="py-[26px] px-[36px]">
          <div className="flex items-center gap-[10px] m-0 mb-[18px]">
            <span className="bg-[#f2b705] text-[#2b2a26] font-bold text-[13px] px-[12px] py-[5px] rounded-full">
              หมวดที่ 5
            </span>
            <h2 className="text-[16px] m-0 font-bold text-[#1b3860]">
              การประเมินและปรับปรุงการดำเนินการของรายวิชา
            </h2>
          </div>

          {/* Field 1 */}
          <div className="flex flex-col gap-2 mb-[20px]">
            <label className="text-[14px] font-bold text-[#1b3860]">
              1. กลยุทธ์การประเมินประสิทธิผลของรายวิชาโดยนักศึกษา
            </label>
            <textarea
              rows={3}
              className={inputClassName}
              placeholder="อธิบายกลยุทธ์การประเมินประสิทธิผลของรายวิชาโดยนักศึกษา..."
              defaultValue="มีระบบออนไลน์ในการประเมินผลการจัดการเรียนการสอนโดยนักศึกษา โดยแยกเป็นการประเมินผู้สอนและการประเมินภาพรวมของรายวิชา"
            />
          </div>

          {/* Field 2 */}
          <div className="flex flex-col gap-2 mb-[20px]">
            <label className="text-[14px] font-bold text-[#1b3860]">
              2. กลยุทธ์การประเมินการสอน
            </label>
            <textarea
              rows={3}
              className={inputClassName}
              placeholder="อธิบายกลยุทธ์การประเมินการสอน..."
              defaultValue="เปิดโอกาสให้นักศึกษาประเมินผลการสอนของอาจารย์ในทุกด้าน ทั้งในด้านทักษะ ความรู้ กลยุทธ์การสอน และการใช้สื่อการสอน"
            />
          </div>

          {/* Field 3 (Dynamic List) */}
          <div className="flex flex-col gap-2 mb-[20px]">
            <label className="text-[14px] font-bold text-[#1b3860]">
              3. การปรับปรุงการสอน
            </label>
            <textarea
              rows={2}
              className={inputClassName}
              placeholder="อธิบายกลไกและการปรับปรุงการเรียนการสอน..."
              defaultValue="มีกลไกและการปรับปรุงการเรียนการสอน ดังนี้ ประชุม และ/หรือ สัมมนาอาจารย์ผู้สอนเพื่อพิจารณาปรับปรุงการจัดการเรียนการสอนสำหรับปีการศึกษาต่อไปโดยอาศัยข้อมูลดังต่อไปนี้"
            />

            <ul className="flex flex-col gap-2 mt-2 list-none p-0 m-0">
              {improvements.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 bg-[#f8f9fa] border border-gray-200 rounded-md py-1.5 px-2 pl-3.5"
                >
                  {/* เปลี่ยนสีจุดวงกลมเป็นสีทอง #d9a300 */}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9a300] shrink-0" />
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateImprove(index, e.target.value)}
                    placeholder="เช่น ผลการศึกษาของนักศึกษา"
                    className="flex-1 border-none bg-transparent font-sans text-[14px] py-1.5 px-1 text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeImprove(index)}
                    className="text-gray-400 text-[16px] py-0.5 px-2 rounded-md hover:text-[#c0392b] hover:bg-gray-200 transition-colors cursor-pointer border-none bg-transparent"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <div>
              {/* เปลี่ยนสีกรอบและข้อความปุ่มเป็นสีทอง #d9a300 */}
              <button
                type="button"
                onClick={addImprove}
                className="inline-flex items-center gap-1.5 bg-white border border-dashed border-[#d9a300] text-[#d9a300] font-semibold text-[13px] py-2 px-3.5 rounded-md cursor-pointer hover:bg-[#fff8e0] transition-colors mt-2 font-sans"
              >
                + เพิ่มข้อมูลประกอบการปรับปรุง
              </button>
            </div>
          </div>

          {/* Field 4 */}
          <div className="flex flex-col gap-2 mb-[20px]">
            <label className="text-[14px] font-bold text-[#1b3860]">
              4. การทวนสอบมาตรฐานผลสัมฤทธิ์ของนักศึกษาในรายวิชา
            </label>
            <textarea
              rows={3}
              className={inputClassName}
              placeholder="อธิบายกระบวนการทวนสอบมาตรฐานผลสัมฤทธิ์ของนักศึกษา..."
              defaultValue="มีคณะกรรมการในการพิจารณาข้อสอบ เกณฑ์การตัดเกรดของรายวิชา รวมทั้งการประกาศคะแนนให้นักศึกษาทราบ เพื่อทวนสอบมาตรฐานผลสัมฤทธิ์ของผู้เรียน และเพื่อให้ตรงตามมาตรฐานผลการเรียนรู้ที่คาดหวังของรายวิชา"
            />
          </div>

          {/* Field 5 */}
          <div className="flex flex-col gap-2 mb-[20px]">
            <label className="text-[14px] font-bold text-[#1b3860]">
              5. การดำเนินการทบทวนและการวางแผนปรับปรุงประสิทธิผลของรายวิชา
            </label>
            <textarea
              rows={3}
              className={inputClassName}
              placeholder="อธิบายกระบวนการทบทวนและวางแผนปรับปรุงรายวิชา..."
              defaultValue="เมื่อสิ้นสุดปีการศึกษา อาจารย์ผู้รับผิดชอบรายวิชารวบรวมข้อมูลจากการประเมินผลการการสอนของอาจารย์ และการประเมินรายวิชา เพื่อนำเสนอต่อคณะกรรมการบริหารหลักสูตรฯ ในการพิจารณาประเด็นที่ควรปรับปรุงของรายวิชา"
            />
          </div>
        </div>
      </div>
    </FormShell>
  );
}
