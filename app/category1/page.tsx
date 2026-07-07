"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext, IS_DEV_MODE } from "../FormContext";
import FormShell from "../components/FormShell";

export default function Category1Page() {
  const router = useRouter();
  const form = useFormContext();
  const [showErrors, setShowErrors] = useState(false);

  const handleNext = () => {
    if (IS_DEV_MODE || form.isCategory1Valid()) {
      router.push("/category2");
    } else {
      setShowErrors(true);
      const requiredFields = [
        { id: "courseId", value: form.courseId },
        { id: "credit", value: form.credit },
        { id: "term", value: form.term },
        { id: "group", value: form.group },
        { id: "studyDay", value: form.studyDay },
        { id: "studyTime", value: form.studyTime },
        { id: "studyLocation", value: form.studyLocation },
        { id: "instructors", value: form.instructors },
        { id: "descTh", value: form.descTh },
        { id: "descEn", value: form.descEn },
      ];
      
      const firstEmpty = requiredFields.find(f => f.value.trim() === "");
      if (firstEmpty) {
        const el = document.getElementById(firstEmpty.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus({ preventScroll: true });
        }
      }
    }
  };

  const handleCourseTypeChange = (type: string, checked: boolean) => {
    form.setCourseTypes({ ...form.courseTypes, [type]: checked });
  };

  const getInputClass = (value: string, isRequired: boolean = true) => {
    const isError = isRequired && showErrors && value.trim() === "";
    const baseClass = "font-inherit text-[14px] border rounded-[8px] px-[11px] py-[9px] bg-gray-50 text-gray-700 resize-y focus:outline-none print:border-transparent print:shadow-none print:bg-transparent transition-colors duration-200";
    return `${baseClass} ${
      isError
        ? "border-red-500 focus:border-red-500 focus:ring focus:ring-red-500/20 bg-red-50"
        : "border-gray-200 focus:border-[#d5ae52] focus:ring focus:ring-[#d5ae52]/20 focus:bg-white"
    }`;
  };

  return (
    <FormShell onNext={handleNext} isCategory1Valid={form.isCategory1Valid()}>
      <div className="py-[26px] px-[36px]">
        <div className="flex items-center gap-[10px] m-0 mb-[18px]">
          <span className="bg-[#d5ae52] text-white font-bold text-[13px] px-[12px] py-[5px] rounded-full">
            หมวดที่ 1
          </span>
          <h2 className="text-[16px] m-0 font-bold text-[#1b3860]">
            ข้อมูลทั่วไปของรายวิชา
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[14px] gap-x-[24px]">
          <div className="flex flex-col gap-[5px] col-span-1 sm:col-span-2">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              1. รหัสวิชาและชื่อวิชา <span className="text-red-500">*</span>
            </label>
            <input
              id="courseId"
              className={getInputClass(form.courseId)}
              placeholder="เช่น ทวป.367 การประเมินวัฏจักรผลิตภัณฑ์และคาร์บอนฟุตพรินต์สำหรับอุตสาหกรรมชีวเคมี (BEB 367 ...)"
              value={form.courseId}
              onChange={(e) => form.setCourseId(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              จำนวนหน่วยกิต <span className="text-red-500">*</span>
            </label>
            <input
              id="credit"
              className={getInputClass(form.credit)}
              placeholder="เช่น 3 (3-0-6) บรรยาย 3 หน่วยกิต"
              value={form.credit}
              onChange={(e) => form.setCredit(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              ภาค/ปีการศึกษา <span className="text-red-500">*</span>
            </label>
            <input
              id="term"
              className={getInputClass(form.term)}
              placeholder="เช่น x/2568"
              value={form.term}
              onChange={(e) => form.setTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[5px] col-span-1 sm:col-span-2">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              ประเภทของรายวิชา
            </label>
            <div className="flex flex-wrap gap-y-[10px] gap-x-[18px] bg-gray-50 border border-gray-200 rounded-[8px] py-[12px] px-[14px]">
              {[
                { id: "1", label: "1. วิชาศึกษาทั่วไป" },
                { id: "2.1", label: "2.1 วิชาพื้นฐานด้านวิชาชีพ/วิทยาศาสตร์" },
                { id: "2.2", label: "2.2 วิชาแกน" },
                { id: "2.3", label: "2.3 วิชาบังคับ" },
                { id: "2.4", label: "2.4 วิชาบังคับเลือก" },
                { id: "3", label: "3. วิชาเลือกเสรี" },
              ].map((t) => (
                <label
                  key={t.id}
                  className="flex items-center gap-[6px] text-[13px] text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-[#d5ae52] w-[15px] h-[15px] cursor-pointer"
                    checked={!!form.courseTypes[t.id]}
                    onChange={(e) =>
                      handleCourseTypeChange(t.id, e.target.checked)
                    }
                  />{" "}
                  {t.label}
                </label>
              ))}
            </div>
          </div>



          <div className="flex flex-col gap-[5px] col-span-1 sm:col-span-2">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              2. ผู้รับผิดชอบรายวิชา / อาจารย์ผู้สอน พร้อมข้อมูลการติดต่อ <span className="text-red-500">*</span>
            </label>
            <textarea
              id="instructors"
              rows={2}
              className={getInputClass(form.instructors)}
              placeholder="ชื่ออาจารย์ผู้รับผิดชอบรายวิชาและอาจารย์ผู้สอน"
              value={form.instructors}
              onChange={(e) => form.setInstructors(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              ช่องทางติดต่อ/ให้คำปรึกษา
            </label>
            <input
              id="contact"
              className={getInputClass(form.contact, false)}
              placeholder="เช่น MS Teams / Chat: somchai@tu.ac.th"
              value={form.contact}
              onChange={(e) => form.setContact(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              ช่องทางเสริม
            </label>
            <input
              id="extraContact"
              className={getInputClass(form.extraContact, false)}
              placeholder="เช่น Group LINE ของรายวิชา"
              value={form.extraContact}
              onChange={(e) => form.setExtraContact(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[5px] col-span-1 sm:col-span-2">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              3. จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะแนวทางวิชาการแก่นักศึกษา
            </label>
            <textarea
              id="consultHours"
              rows={2}
              className={getInputClass(form.consultHours, false)}
              placeholder="เช่น ให้คำปรึกษาตามความต้องการของนักศึกษา นัดหมายผ่าน LINE หรือ MS Teams"
              value={form.consultHours}
              onChange={(e) => form.setConsultHours(e.target.value)}
            />
          </div>

          <div className="col-span-1 sm:col-span-2 pt-[6px]">
            <h3 className="text-[13px] font-semibold text-[#1b3860] m-0">
              4. วัน เวลา และสถานที่เรียน
            </h3>
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              กลุ่มเรียน <span className="text-red-500">*</span>
            </label>
            <input
              id="group"
              className={getInputClass(form.group)}
              placeholder="เช่น Section 650601"
              value={form.group}
              onChange={(e) => form.setGroup(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              วัน (Day) <span className="text-red-500">*</span>
            </label>
            <select
              id="studyDay"
              className={getInputClass(form.studyDay)}
              value={form.studyDay}
              onChange={(e) => form.setStudyDay(e.target.value)}
            >
              <option value="" disabled>-- กรุณาเลือกวัน --</option>
              <option value="วันจันทร์">วันจันทร์</option>
              <option value="วันอังคาร">วันอังคาร</option>
              <option value="วันพุธ">วันพุธ</option>
              <option value="วันพฤหัสบดี">วันพฤหัสบดี</option>
              <option value="วันศุกร์">วันศุกร์</option>
              <option value="วันเสาร์">วันเสาร์</option>
              <option value="วันอาทิตย์">วันอาทิตย์</option>
            </select>
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              เวลา (Time) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-[10px]">
              <input
                type="time"
                step={300}
                id="studyTime"
                className={getInputClass(form.studyTime.split(" - ")[0] || "")}
                value={form.studyTime.split(" - ")[0] || ""}
                onChange={(e) => {
                  const end = form.studyTime.split(" - ")[1] || "";
                  form.setStudyTime(`${e.target.value} - ${end}`);
                }}
              />
              <span className="text-gray-500 font-semibold">-</span>
              <input
                type="time"
                step={300}
                className={getInputClass(form.studyTime.split(" - ")[1] || "")}
                value={form.studyTime.split(" - ")[1] || ""}
                onChange={(e) => {
                  const start = form.studyTime.split(" - ")[0] || "";
                  form.setStudyTime(`${start} - ${e.target.value}`);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              สถานที่เรียน (Location) <span className="text-red-500">*</span>
            </label>
            <input
              id="studyLocation"
              className={getInputClass(form.studyLocation)}
              placeholder="เช่น ห้อง SC3 – M08"
              value={form.studyLocation}
              onChange={(e) => form.setStudyLocation(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[5px] col-span-1 sm:col-span-2">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              5. คำอธิบายรายวิชา (ภาษาไทย) <span className="text-red-500">*</span>
            </label>
            <textarea
              id="descTh"
              rows={4}
              className={getInputClass(form.descTh)}
              placeholder="หลักการและแนวคิดเกี่ยวกับการประเมินวัฏจักรชีวิตของผลิตภัณฑ์ (LCA) ..."
              value={form.descTh}
              onChange={(e) => form.setDescTh(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px] col-span-1 sm:col-span-2">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              Course Description (English) <span className="text-red-500">*</span>
            </label>
            <textarea
              id="descEn"
              rows={4}
              className={getInputClass(form.descEn)}
              placeholder="Principle and concept of life cycle assessment (LCA), green input, ..."
              value={form.descEn}
              onChange={(e) => form.setDescEn(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              6. วันเดือนปีที่ปรับปรุงเค้าโครงรายวิชา
            </label>
            <input
              id="updateDate"
              className={getInputClass(form.updateDate, false)}
              placeholder="เช่น มกราคม พ.ศ. 2569"
              value={form.updateDate}
              onChange={(e) => form.setUpdateDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormShell>
  );
}
