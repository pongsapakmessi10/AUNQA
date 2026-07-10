"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext, IS_DEV_MODE } from "../../FormContext";
import FormShell from "../../components/FormShell";

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
        { id: "creditLecture", value: form.creditLecture },
        { id: "creditLab", value: form.creditLab },
        { id: "creditSelfStudy", value: form.creditSelfStudy },
        { id: "termSemester", value: form.termSemester },
        { id: "termYear", value: form.termYear },
        { id: "group", value: form.group },
        { id: "studyDay", value: form.studyDay },
        { id: "studyTime", value: form.studyTime },
        { id: "studyLocation", value: form.studyLocation },
        { id: "rp-title", value: form.responsiblePerson.title },
        { id: "rp-firstName", value: form.responsiblePerson.firstName },
        { id: "rp-lastName", value: form.responsiblePerson.lastName },
        { id: "rp-contact", value: form.responsiblePerson.contact },
        ...form.instructorsList.flatMap((inst, idx) => [
          { id: `inst-${idx}-title`, value: inst.title },
          { id: `inst-${idx}-firstName`, value: inst.firstName },
          { id: `inst-${idx}-lastName`, value: inst.lastName },
          { id: `inst-${idx}-contact`, value: inst.contact },
        ]),
        { id: "consultHours", value: form.consultHours },
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

  const getInputClass = (value: string, isRequired: boolean = true, customPadding: string = "px-[11px] py-[9px]") => {
    const isError = isRequired && showErrors && value.trim() === "";
    const baseClass = `font-inherit text-[14px] border rounded-[8px] ${customPadding} bg-gray-50 text-gray-700 resize-y focus:outline-none print:border-transparent print:shadow-none print:bg-transparent transition-colors duration-200`;
    return `${baseClass} ${isError
        ? "border-yellow-500 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 bg-yellow-50"
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
          <div className="flex flex-col gap-[5px] h-full">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              จำนวนหน่วยกิต <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mt-auto">
              <div className="flex flex-col justify-end gap-[5px] h-full">
                <label className="text-[12px] text-gray-600">ชั่วโมงบรรยาย (Lecture)</label>
                <input
                  id="creditLecture"
                  className={getInputClass(form.creditLecture)}
                  placeholder="เช่น 3"
                  value={form.creditLecture}
                  onChange={(e) => form.setCreditLecture(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-end gap-[5px] h-full">
                <label className="text-[12px] text-gray-600">ชั่วโมงปฏิบัติการ (Lab/Practical)</label>
                <input
                  id="creditLab"
                  className={getInputClass(form.creditLab)}
                  placeholder="เช่น 0"
                  value={form.creditLab}
                  onChange={(e) => form.setCreditLab(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-end gap-[5px] h-full">
                <label className="text-[12px] text-gray-600">ชั่วโมงศึกษาด้วยตนเอง (Self-study)</label>
                <input
                  id="creditSelfStudy"
                  className={getInputClass(form.creditSelfStudy)}
                  placeholder="เช่น 6"
                  value={form.creditSelfStudy}
                  onChange={(e) => form.setCreditSelfStudy(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px] h-full">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              ภาค/ปีการศึกษา <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col justify-end gap-[5px] mt-auto">
              <label className="text-[12px] text-gray-600">ปีการศึกษา (Academic Year)</label>
              <input
                id="termYear"
                className={getInputClass(form.termYear)}
                placeholder="เช่น 2568"
                value={form.termYear}
                onChange={(e) => form.setTermYear(e.target.value)}
              />
            </div>
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



          <div className="flex flex-col gap-[12px] col-span-1 sm:col-span-2">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              2. ผู้รับผิดชอบรายวิชา / อาจารย์ผู้สอน พร้อมข้อมูลการติดต่อ <span className="text-red-500">*</span>
            </label>

            {/* Responsible Person */}
            <div className="bg-gray-50 border border-gray-200 rounded-[8px] p-[16px]">
              <h3 className="text-[14px] font-bold text-[#1b3860] mb-[12px]">ผู้รับผิดชอบรายวิชา <span className="text-red-500">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-[12px]">
                <div className="sm:col-span-2">
                  <label className="text-[12px] text-gray-600 block mb-[4px]">คำนำหน้าชื่อ <span className="text-red-500">*</span></label>
                  <input
                    id="rp-title"
                    className={getInputClass(form.responsiblePerson.title, true, "w-full px-[8px] py-[6px] h-[34px]")}
                    placeholder="เช่น ผศ."
                    value={form.responsiblePerson.title}
                    onChange={(e) => form.setResponsiblePerson({ ...form.responsiblePerson, title: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[12px] text-gray-600 block mb-[4px]">ชื่อ <span className="text-red-500">*</span></label>
                  <input
                    id="rp-firstName"
                    className={getInputClass(form.responsiblePerson.firstName, true, "w-full px-[8px] py-[6px] h-[34px]")}
                    placeholder="ชื่อ"
                    value={form.responsiblePerson.firstName}
                    onChange={(e) => form.setResponsiblePerson({ ...form.responsiblePerson, firstName: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[12px] text-gray-600 block mb-[4px]">สกุล <span className="text-red-500">*</span></label>
                  <input
                    id="rp-lastName"
                    className={getInputClass(form.responsiblePerson.lastName, true, "w-full px-[8px] py-[6px] h-[34px]")}
                    placeholder="สกุล"
                    value={form.responsiblePerson.lastName}
                    onChange={(e) => form.setResponsiblePerson({ ...form.responsiblePerson, lastName: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="text-[12px] text-gray-600 block mb-[4px]">ช่องทางการติดต่อปรึกษา <span className="text-red-500">*</span></label>
                  <input
                    id="rp-contact"
                    className={getInputClass(form.responsiblePerson.contact, true, "w-full px-[8px] py-[6px] h-[34px]")}
                    placeholder="เช่น MS Teams / Email"
                    value={form.responsiblePerson.contact}
                    onChange={(e) => form.setResponsiblePerson({ ...form.responsiblePerson, contact: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Instructors List */}
            <div className="bg-gray-50 border border-gray-200 rounded-[8px] p-[16px]">
              <h3 className="text-[14px] font-bold text-[#1b3860] mb-[16px]">อาจารย์ผู้สอน</h3>

              {form.instructorsList.length === 0 ? (
                <p className="text-[13px] text-gray-500 italic text-center py-[10px]">ไม่มีอาจารย์ผู้สอนเพิ่มเติม</p>
              ) : (
                <div className="flex flex-col gap-[16px]">
                  {form.instructorsList.map((inst, index) => (
                    <div key={inst.id} className="relative grid grid-cols-1 sm:grid-cols-12 gap-[12px] pb-[16px] border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="sm:col-span-2">
                        <label className="text-[12px] text-gray-600 block mb-[4px]">คำนำหน้าชื่อ <span className="text-red-500">*</span></label>
                        <input
                          id={`inst-${index}-title`}
                          className={getInputClass(inst.title, true, "w-full px-[8px] py-[6px] h-[34px]")}
                          placeholder="เช่น ผศ."
                          value={inst.title}
                          onChange={(e) => {
                            const newList = [...form.instructorsList];
                            newList[index].title = e.target.value;
                            form.setInstructorsList(newList);
                          }}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[12px] text-gray-600 block mb-[4px]">ชื่อ <span className="text-red-500">*</span></label>
                        <input
                          id={`inst-${index}-firstName`}
                          className={getInputClass(inst.firstName, true, "w-full px-[8px] py-[6px] h-[34px]")}
                          placeholder="ชื่อ"
                          value={inst.firstName}
                          onChange={(e) => {
                            const newList = [...form.instructorsList];
                            newList[index].firstName = e.target.value;
                            form.setInstructorsList(newList);
                          }}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[12px] text-gray-600 block mb-[4px]">สกุล <span className="text-red-500">*</span></label>
                        <input
                          id={`inst-${index}-lastName`}
                          className={getInputClass(inst.lastName, true, "w-full px-[8px] py-[6px] h-[34px]")}
                          placeholder="สกุล"
                          value={inst.lastName}
                          onChange={(e) => {
                            const newList = [...form.instructorsList];
                            newList[index].lastName = e.target.value;
                            form.setInstructorsList(newList);
                          }}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[12px] text-gray-600 block mb-[4px]">ช่องทางการติดต่อปรึกษา <span className="text-red-500">*</span></label>
                        <input
                          id={`inst-${index}-contact`}
                          className={getInputClass(inst.contact, true, "w-full px-[8px] py-[6px] h-[34px]")}
                          placeholder="เช่น MS Teams / Email"
                          value={inst.contact}
                          onChange={(e) => {
                            const newList = [...form.instructorsList];
                            newList[index].contact = e.target.value;
                            form.setInstructorsList(newList);
                          }}
                        />
                      </div>
                      <div className="sm:col-span-1 flex items-end justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            const newList = form.instructorsList.filter((_, i) => i !== index);
                            form.setInstructorsList(newList);
                          }}
                          className="text-red-500 hover:text-red-700 p-[6px] mb-[3px] rounded-full hover:bg-red-50 transition-colors flex items-center justify-center"
                          title="ลบผู้สอน"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-[16px]">
                <button
                  type="button"
                  onClick={() => {
                    form.setInstructorsList([
                      ...form.instructorsList,
                      { id: Date.now().toString(), title: "", firstName: "", lastName: "", contact: "" }
                    ]);
                  }}
                  className="text-[12px] bg-[#1b3860] text-white px-[12px] py-[6px] rounded-[4px] hover:bg-[#142946] transition-colors"
                >
                  + เพิ่มอาจารย์ผู้สอน
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[5px] col-span-1 sm:col-span-2">
            <label className="text-[13px] font-semibold text-[#1b3860]">
              3. จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะแนวทางวิชาการแก่นักศึกษา <span className="text-red-500">*</span>
            </label>
            <textarea
              id="consultHours"
              rows={2}
              className={getInputClass(form.consultHours, true)}
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
