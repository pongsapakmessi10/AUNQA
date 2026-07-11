"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext, IS_DEV_MODE } from "../../../FormContext";
import FormShell from "../../../components/FormShell";

export default function Category1Page() {
    const router = useRouter();
    const form = useFormContext();
    const [showErrors, setShowErrors] = useState(false);

    const handleNext = () => {
        if (IS_DEV_MODE || form.isCategory1Valid()) {
            router.push("/admin");
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

    const handleAddStudyPlan = () => {
        form.setStudyPlans([...form.studyPlans, ""]);
    };

    const handleRemoveStudyPlan = (index: number) => {
        const newPlans = form.studyPlans.filter((_, i) => i !== index);
        form.setStudyPlans(newPlans);
    };

    const handleStudyPlanChange = (index: number, value: string) => {
        const newPlans = [...form.studyPlans];
        newPlans[index] = value;
        form.setStudyPlans(newPlans);
    };

    const getInputClass = (value: string, isRequired: boolean = true, customPadding: string = "px-[11px] py-[9px]") => {
        const isError = isRequired && showErrors && value.trim() === "";
        const baseClass = `font-inherit text-[14px] border rounded-[8px] ${customPadding} bg-gray-50 text-gray-700 resize-y focus:outline-none print:border-transparent print:shadow-none print:bg-transparent transition-colors duration-200`;
        return `${baseClass} ${isError
            ? "border-yellow-500 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 bg-yellow-50"
            : "border-gray-200 focus:border-[#d5ae52] focus:ring focus:ring-[#d5ae52]/20 focus:bg-white"
            }`;
    };

    useEffect(() => {
        const buttons = document.querySelectorAll("button");
        buttons.forEach((btn) => {
            if (btn.textContent?.trim() === "ถัดไป ➡") {
                btn.textContent = "ตกลง";
            }
        });
    });

    return (
        <FormShell onNext={handleNext} isCategory1Valid={form.isCategory1Valid()}>
            <fieldset disabled className="border-none p-0 m-0 min-w-0">
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

                        <div className="flex flex-col gap-[12px] col-span-1 sm:col-span-2 bg-gray-50 border border-gray-200 rounded-[8px] py-[16px] px-[18px]">
                            <div className="flex justify-between items-center">
                                <label className="text-[13px] font-semibold text-[#1b3860]">
                                    แผนการเรียน (Study Plan)
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddStudyPlan}
                                    className="flex items-center gap-[4px] bg-[#1b3860] hover:bg-[#142946] text-white text-[12px] px-[10px] py-[4px] rounded-[6px] transition-colors hidden"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    เพิ่มแผน
                                </button>
                            </div>

                            <div className="flex flex-col gap-[10px]">
                                {form.studyPlans.map((plan, index) => (
                                    <div key={index} className="flex items-center gap-[10px]">
                                        <div className="flex-1">
                                            <select
                                                className={`${getInputClass(plan, false)} w-full cursor-pointer`}
                                                value={plan}
                                                onChange={(e) => handleStudyPlanChange(index, e.target.value)}
                                            >
                                                <option value="">-- เลือกแผนการเรียน --</option>
                                                <option value="แผน ก แบบ ก1">แผน ก แบบ ก1</option>
                                                <option value="แผน ก แบบ ก2">แผน ก แบบ ก2</option>
                                                <option value="แผน ข">แผน ข</option>
                                                <option value="แบบ 1.1">แบบ 1.1</option>
                                                <option value="แบบ 1.2">แบบ 1.2</option>
                                                <option value="แบบ 2.1">แบบ 2.1</option>
                                                <option value="แบบ 2.2">แบบ 2.2</option>
                                            </select>
                                        </div>
                                        {form.studyPlans.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveStudyPlan(index)}
                                                className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-[8px] rounded-[6px] transition-colors flex-shrink-0 hidden"
                                                title="ลบแผนการเรียน"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
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
                                        className="flex items-center gap-[6px] text-[13px] text-gray-700 cursor-pointer opacity-80"
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
                                ประเภทของรูปแบบการสอน
                            </label>
                            <div className="flex flex-wrap gap-y-[10px] gap-x-[18px] bg-gray-50 border border-gray-200 rounded-[8px] py-[12px] px-[14px]">
                                {[
                                    { id: "1", label: "1. วิชาบรรยาย" },
                                    { id: "2", label: "2. ปฏิบัติการ" },
                                    { id: "3", label: "3. วิชาบรรยายและปฏิบัติการ" },
                                ].map((t) => (
                                    <label
                                        key={t.id}
                                        className="flex items-center gap-[6px] text-[13px] text-gray-700 cursor-pointer opacity-80"
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
                                หมวดหมู่ระดับการเรียนรู้ <span className="text-[12px] font-normal text-gray-500 ml-[4px]">(สามารถเลือกได้มากกว่า 1 ช่อง)</span>
                            </label>
                            <div className="flex flex-wrap gap-y-[10px] gap-x-[18px] bg-gray-50 border border-gray-200 rounded-[8px] py-[12px] px-[14px]">
                                {[
                                    { id: "1", label: "1. I (Introduce)" },
                                    { id: "2", label: "2. R (Reinforce)" },
                                    { id: "3", label: "3. P (Practice)" },
                                    { id: "4", label: "4. M (Mastery)" },
                                ].map((t) => (
                                    <label
                                        key={t.id}
                                        className="flex items-center gap-[6px] text-[13px] text-gray-700 cursor-pointer opacity-80"
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
                                2. คำอธิบายรายวิชา (ภาษาไทย) <span className="text-red-500">*</span>
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
                    </div>
                </div>
            </fieldset>
        </FormShell>
    );
}
