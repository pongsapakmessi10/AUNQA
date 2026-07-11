"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext, IS_DEV_MODE } from "../../../FormContext";
import FormShell from "../../../components/FormShell";

export default function Category1Page() {
    const router = useRouter();
    const form = useFormContext();
    const [showErrors, setShowErrors] = useState(false);

    const handleNext = () => {
        if (IS_DEV_MODE || form.isCategory1Valid()) {
            router.push("/admin/selectsubject2");
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

                    <div className="col-span-1 sm:col-span-2 grid grid-cols-1 lg:grid-cols-4 gap-y-[14px] gap-x-[24px]">

                        {/* จำนวนหน่วยกิต: ให้กินพื้นที่ 3 ส่วน (lg:col-span-3) */}
                        <div className="flex flex-col gap-[5px] h-full lg:col-span-3">
                            <label className="text-[13px] font-semibold text-[#1b3860]">
                                จำนวนหน่วยกิต <span className="text-red-500">*</span>
                            </label>
                            {/* เปลี่ยนเป็น md:grid-cols-4 เพื่อให้เรียง 4 ช่องพอดี */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] mt-auto">
                                <div className="flex flex-col justify-end gap-[5px] h-full">
                                    <label className="text-[12px] text-gray-600">
                                        <span className="block">จำนวนหน่วยกิต</span>
                                        <span className="block">(Credit)</span>
                                    </label>
                                    <input
                                        id="creditTotal"
                                        className={getInputClass(form.creditTotal)}
                                        placeholder="เช่น 10"
                                        value={form.creditTotal}
                                        onChange={(e) => form.setCreditTotal(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col justify-end gap-[5px] h-full">
                                    <label className="text-[12px] text-gray-600">
                                        <span className="block">ชั่วโมงบรรยาย</span>
                                        <span className="block">(Lecture)</span>
                                    </label>
                                    <input
                                        id="creditLecture"
                                        className={getInputClass(form.creditLecture)}
                                        placeholder="เช่น 3"
                                        value={form.creditLecture}
                                        onChange={(e) => form.setCreditLecture(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col justify-end gap-[5px] h-full">
                                    <label className="text-[12px] text-gray-600">
                                        <span className="block">ชั่วโมงปฏิบัติการ</span>
                                        <span className="block">(Lab/Practical)</span>
                                    </label>
                                    <input
                                        id="creditLab"
                                        className={getInputClass(form.creditLab)}
                                        placeholder="เช่น 0"
                                        value={form.creditLab}
                                        onChange={(e) => form.setCreditLab(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col justify-end gap-[5px] h-full">
                                    <label className="text-[12px] text-gray-600">
                                        <span className="block">ชั่วโมงศึกษาด้วยตนเอง</span>
                                        <span className="block">(Self-study)</span>
                                    </label>
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

                        {/* ภาค/ปีการศึกษา: ให้กินพื้นที่ 1 ส่วน (lg:col-span-1) ทำให้ขนาดดูสมส่วนขึ้น */}
                        <div className="flex flex-col gap-[5px] h-full lg:col-span-1">
                            <label className="text-[13px] font-semibold text-[#1b3860]">
                                ภาค/ปีการศึกษา <span className="text-red-500">*</span>
                            </label>
                            <label className="text-[12px] text-gray-600">
                                <span className="block">ปีการศึกษา</span>
                                <span className="block">(Academic Year)</span>
                            </label>
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
                                    type="radio"
                                    name="courseCategory"
                                    className="accent-[#d5ae52] w-[15px] h-[15px] cursor-pointer"
                                    checked={!!form.courseTypes[t.id]}
                                    onChange={(e) => {
                                        const newTypes = { ...form.courseTypes };
                                        ["1", "2.1", "2.2", "2.3", "2.4", "3"].forEach(k => newTypes[k] = false);
                                        newTypes[t.id] = e.target.checked;
                                        form.setCourseTypes(newTypes);
                                    }}
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
                            { id: "format-1", label: "1. วิชาบรรยาย" },
                            { id: "format-2", label: "2. ปฏิบัติการ" },
                            { id: "format-3", label: "3. วิชาบรรยายและปฏิบัติการ" },
                        ].map((t) => (
                            <label
                                key={t.id}
                                className="flex items-center gap-[6px] text-[13px] text-gray-700 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="courseFormat"
                                    className="accent-[#d5ae52] w-[15px] h-[15px] cursor-pointer"
                                    checked={!!form.courseTypes[t.id]}
                                    onChange={(e) => {
                                        const newTypes = { ...form.courseTypes };
                                        ["format-1", "format-2", "format-3"].forEach(k => newTypes[k] = false);
                                        newTypes[t.id] = e.target.checked;
                                        form.setCourseTypes(newTypes);
                                    }}
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
                            { id: "level-1", label: "1. I (Introduce)" },
                            { id: "level-2", label: "2. R (Reinforce)" },
                            { id: "level-3", label: "3. P (Practice)" },
                            { id: "level-4", label: "4. M (Mastery)" },
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
        </FormShell>
    );
}
