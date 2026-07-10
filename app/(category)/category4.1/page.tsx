"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormShell from "../../components/FormShell";
import { useFormContext, EvaluationConfig, EvaluationSubItem, IS_DEV_MODE } from "../../FormContext";

function EvaluationSummaryTable({ form, showErrors }: { form: any, showErrors?: boolean }) {
    const allItems = [
        { id: "midterm", groupName: "สอบกลางภาค (2 ชั่วโมง)", method: "", proportion: form.gradingPattern === "1" ? "25" : "30" },
        { id: "final", groupName: "สอบปลายภาค (3 ชั่วโมง)", method: "", proportion: form.gradingPattern === "1" ? "35" : "30" },
        ...form.evaluationData.quiz.items.map((i: EvaluationSubItem) => ({ ...i, groupName: "แบบทดสอบย่อย" })),
        ...form.evaluationData.homework.items.map((i: EvaluationSubItem) => ({ ...i, groupName: "การบ้าน" })),
        ...form.evaluationData.activity.items.map((i: EvaluationSubItem) => ({ ...i, groupName: "กิจกรรมในชั้นเรียน" }))
    ];

    const rowCount = allItems.length;
    let order = [...form.summaryRowOrder];
    if (order.length !== rowCount) {
        order = Array(rowCount).fill("");
    }

    const rows = Array(rowCount).fill(null).map((_, index) => {
        const selectedId = order[index] || "";
        const selectedItem = allItems.find(i => i.id === selectedId);
        return { index, selectedId, selectedItem };
    });

    const totalProportion = rows.reduce((sum, row) => {
        if (row.selectedItem) {
            return sum + (parseFloat(row.selectedItem.proportion) || 0);
        }
        return sum;
    }, 0);

    return (
        <div className="mt-[32px] pt-[24px] border-t border-gray-200">
            <h3 className="text-[15px] font-bold text-[#1b3860] mb-[16px]">
                สรุปแผนการประเมินผลการเรียนรู้
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px] border border-gray-200 rounded-[8px] overflow-hidden">
                    <thead>
                        <tr className="bg-[#1b3860] text-white">
                            <th className="px-[12px] py-[10px] text-left w-[25%] border-r border-[#2a4d7d]">กิจกรรมการประเมินผลการเรียนรู้</th>
                            <th className="px-[12px] py-[10px] text-center w-[10%] border-r border-[#2a4d7d]">ร้อยละของคะแนน</th>
                            <th className="px-[12px] py-[10px] text-center w-[20%] border-r border-[#2a4d7d]">ช่วงเวลาประเมิน</th>
                            <th className="px-[12px] py-[10px] text-center w-[25%] border-r border-[#2a4d7d]">CLOS</th>
                            <th className="px-[12px] py-[10px] text-center w-[20%]">หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(({ index, selectedId, selectedItem }) => {
                            const summary = selectedItem
                                ? (form.evaluationSummaries[selectedItem.id] || { id: selectedItem.id, evalTime: "", selectedClos: [], note: "" })
                                : null;

                            const updateSummary = (field: string, value: any) => {
                                if (!selectedItem) return;
                                form.setEvaluationSummaries({
                                    ...form.evaluationSummaries,
                                    [selectedItem.id]: { ...summary, [field]: value }
                                });
                            };

                            const toggleClo = (cloId: string) => {
                                if (!summary) return;
                                const newClos = summary.selectedClos.includes(cloId)
                                    ? summary.selectedClos.filter((c: string) => c !== cloId)
                                    : [...summary.selectedClos, cloId];
                                updateSummary("selectedClos", newClos);
                            };

                            return (
                                <tr key={`row-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-[12px] py-[10px] border-b border-r border-gray-200">
                                        <select
                                            className={`w-full border rounded-[6px] px-[4px] py-[6px] text-[13px] outline-none transition-colors ${showErrors && !selectedId
                                                ? "border-yellow-500 bg-yellow-50 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 text-yellow-700"
                                                : "border-gray-300 focus:border-gray-400"
                                                }`}
                                            value={selectedId || ""}
                                            onChange={(e) => {
                                                const newOrder = [...order];
                                                newOrder[index] = e.target.value;
                                                form.setSummaryRowOrder(newOrder);
                                            }}
                                        >
                                            <option value="">-- เลือกกิจกรรม --</option>
                                            {allItems.map(opt => {
                                                const isSelectedElsewhere = order.some((id, i) => i !== index && id === opt.id);
                                                if (isSelectedElsewhere) return null;
                                                return (
                                                    <option key={opt.id} value={opt.id}>
                                                        {opt.groupName} - {opt.method}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </td>
                                    <td className="px-[12px] py-[10px] border-b border-r border-gray-200 text-center font-semibold text-[#1b3860]">
                                        {selectedItem ? `${selectedItem.proportion}%` : "-"}
                                    </td>
                                    <td className="px-[12px] py-[10px] border-b border-r border-gray-200 align-top">
                                        <input
                                            className={`w-full border rounded-[6px] px-[8px] py-[6px] text-[13px] outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${showErrors && summary && !summary.evalTime.trim()
                                                ? "border-yellow-500 bg-yellow-50 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20"
                                                : "border-gray-300 focus:border-gray-400"
                                                }`}
                                            placeholder="เช่น สัปดาห์ที่ 5"
                                            value={summary ? summary.evalTime : ""}
                                            onChange={(e) => updateSummary("evalTime", e.target.value)}
                                            disabled={!selectedItem}
                                        />
                                    </td>
                                    <td className="px-[12px] py-[10px] border-b border-r border-gray-200 align-top">
                                        <div className="flex flex-wrap gap-[8px] justify-center">
                                            {form.plos.map((plo: any) => (
                                                <label key={plo.id} className={`flex items-center gap-[4px] cursor-pointer hover:text-[#d5ae52] ${!selectedItem ? 'opacity-50 cursor-not-allowed text-gray-700' :
                                                    (showErrors && summary && summary.selectedClos.length === 0 ? 'text-yellow-600 font-semibold' : 'text-gray-700')
                                                    }`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={summary ? summary.selectedClos.includes(plo.id) : false}
                                                        onChange={() => toggleClo(plo.id)}
                                                        className="accent-[#d5ae52] w-[14px] h-[14px] cursor-pointer"
                                                        disabled={!selectedItem}
                                                    />
                                                    CLO {plo.clo}
                                                </label>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-[12px] py-[10px] border-b border-gray-200 align-top">
                                        <textarea
                                            rows={2}
                                            className="w-full border border-gray-300 rounded-[6px] px-[8px] py-[6px] text-[13px] outline-none focus:border-gray-400 resize-y disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="หมายเหตุ"
                                            value={summary ? summary.note : ""}
                                            onChange={(e) => updateSummary("note", e.target.value)}
                                            disabled={!selectedItem}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                        <tr className="bg-[#f8f9fa] border-t-2 border-[#1b3860]">
                            <td className="px-[12px] py-[10px] border-b border-r border-gray-200 text-right font-bold text-[#1b3860]">
                                รวม
                            </td>
                            <td className="px-[12px] py-[10px] border-b border-r border-gray-200 text-center font-bold text-[#1b3860]">
                                {totalProportion}%
                            </td>
                            <td colSpan={3} className="px-[12px] py-[10px] border-b border-gray-200 bg-[#f8f9fa]"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ConfigurableEvaluationItem({
    title,
    targetPercent,
    config,
    onChange,
    showErrors,
}: {
    title: string;
    targetPercent: number;
    config: EvaluationConfig;
    onChange: (newConfig: EvaluationConfig) => void;
    showErrors?: boolean;
}) {
    const currentTotal = config.items.reduce(
        (sum, item) => sum + (parseFloat(item.proportion) || 0),
        0
    );
    const isValid = config.items.length === 0 || currentTotal === targetPercent;

    const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countStr = e.target.value;
        const num = parseInt(countStr) || 0;
        const newItems = [...config.items];
        if (num > newItems.length) {
            for (let i = newItems.length; i < num; i++) {
                newItems.push({
                    id: Date.now().toString() + i,
                    method: "",
                    proportion: "",
                });
            }
        } else {
            newItems.splice(num);
        }
        onChange({ ...config, count: countStr, items: newItems });
    };

    const handleItemChange = (
        index: number,
        field: "method" | "proportion",
        value: string
    ) => {
        const newItems = [...config.items];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange({ ...config, items: newItems });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[8px] p-[16px] mb-[16px] shadow-sm">
            <div className="flex justify-between items-center mb-[12px]">
                <h4 className="text-[14px] font-bold text-[#1b3860]">
                    {title} ({targetPercent}%)
                </h4>
                <div className="flex items-center gap-[8px]">
                    <label className="text-[13px] text-gray-600 font-semibold">
                        จำนวนครั้ง:
                    </label>
                    <select
                        className="border border-gray-200 rounded-[6px] px-[8px] py-[4px] text-[13px] outline-none focus:border-gray-400 bg-gray-50"
                        value={config.count}
                        onChange={handleCountChange}
                    >
                        <option value="">0</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => onChange({ count: "", items: [] })}
                        className="ml-[4px] text-[12px] text-[#d5ae52] hover:text-red-700 bg-white hover:bg-yellow-200 cursor-pointer px-[8px] py-[4px] rounded-[4px] transition-colors border border-red-100"
                    >
                        รีเซ็ต
                    </button>
                </div>
            </div>

            {config.items.length > 0 && (
                <div className="mt-[12px]">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-[13px] border border-gray-200 rounded-[8px] overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-[8px] py-[8px] border-b border-gray-200 text-center font-semibold text-[#1b3860] w-[60px]">
                                        ครั้งที่
                                    </th>
                                    <th className="px-[8px] py-[8px] border-b border-gray-200 text-left font-semibold text-[#1b3860]">
                                        วิธีการประเมินผล
                                    </th>
                                    <th className="px-[8px] py-[8px] border-b border-gray-200 text-center font-semibold text-[#1b3860] w-[140px]">
                                        สัดส่วน (%)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {config.items.map((item, index) => (
                                    <tr key={item.id} className="bg-white">
                                        <td className="px-[8px] py-[6px] border-b border-gray-200 text-center font-medium text-gray-600">
                                            {index + 1}
                                        </td>
                                        <td className="px-[8px] py-[6px] border-b border-gray-200">
                                            <input
                                                className={`w-full border rounded-[4px] px-[8px] py-[6px] outline-none transition-colors ${showErrors && !item.method.trim()
                                                    ? "border-yellow-500 bg-yellow-50 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20"
                                                    : "border-gray-200 focus:border-gray-400 focus:bg-white bg-gray-50 text-gray-700"
                                                    }`}
                                                placeholder="ระบุวิธีการ..."
                                                value={item.method}
                                                onChange={(e) =>
                                                    handleItemChange(index, "method", e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="px-[8px] py-[6px] border-b border-gray-200 text-center">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                className={`w-full border rounded-[4px] px-[8px] py-[6px] outline-none text-center transition-colors ${!isValid
                                                    ? "border-yellow-500 bg-yellow-50 focus:border-yellow-500 text-yellow-700 focus:ring focus:ring-yellow-500/20"
                                                    : "border-gray-200 bg-gray-50 text-gray-700 focus:bg-white focus:border-gray-400"
                                                    }`}
                                                value={item.proportion}
                                                onChange={(e) =>
                                                    handleItemChange(index, "proportion", e.target.value)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {!isValid && (
                        <p className="text-yellow-600 text-[12px] mt-[8px] font-medium flex items-center justify-end gap-[4px]">
                            สัดส่วนรวมต้องเท่ากับ {targetPercent}% (ปัจจุบันรวม {currentTotal}%)
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Category4Page() {
    const router = useRouter();
    const form = useFormContext();
    const [showDetails, setShowDetails] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [pendingPattern, setPendingPattern] = useState("");
    const [showConfirmChange, setShowConfirmChange] = useState(false);

    const quizTarget = form.gradingPattern === "1" ? 20 : 10;
    const hwTarget = form.gradingPattern === "1" ? 10 : 15;
    const activityTarget = form.gradingPattern === "1" ? 10 : 15;

    const isEvalValid = () => {
        const isItemsValid = (config: EvaluationConfig, target: number) => {
            const num = parseInt(config.count) || 0;
            if (num === 0) return false;
            if (config.items.length !== num) return false;
            const sum = config.items.reduce((acc, item) => acc + (parseFloat(item.proportion) || 0), 0);
            if (sum !== target) return false;
            if (config.items.some(item => !item.method.trim())) return false;
            return true;
        };
        return isItemsValid(form.evaluationData.quiz, quizTarget) &&
            isItemsValid(form.evaluationData.homework, hwTarget) &&
            isItemsValid(form.evaluationData.activity, activityTarget);
    };

    const handlePrev = () => {
        router.push("/category3");
    };

    const handleNext = () => {
        if (IS_DEV_MODE) {
            router.push("/category5");
            return;
        }

        if (!form.gradingPattern) {
            setErrorMsg("กรุณาเลือกรูปแบบการประเมินผล");
            setShowErrorPopup(true);
            setShowErrors(true);
            return;
        }
        if (!isConfirmed) {
            setErrorMsg("กรุณากรอกรายละเอียดการประเมินผลให้ครบถ้วนและกดยืนยัน (ปุ่มสีทอง)");
            setShowErrorPopup(true);
            setShowErrors(true);
            return;
        }

        const rowCount = form.evaluationData.quiz.items.length + form.evaluationData.homework.items.length + form.evaluationData.activity.items.length + 2;
        if (form.summaryRowOrder.length !== rowCount || form.summaryRowOrder.includes("")) {
            setErrorMsg("กรุณาเลือกกิจกรรมในตารางสรุปแผนการประเมินผลให้ครบทุกช่อง");
            setShowErrorPopup(true);
            setShowErrors(true);
            return;
        }

        const hasEmptySummary = form.summaryRowOrder.some(id => {
            const summary = form.evaluationSummaries[id];
            return !summary || !summary.evalTime.trim() || summary.selectedClos.length === 0;
        });

        if (hasEmptySummary) {
            setErrorMsg("กรุณากรอกช่วงเวลาประเมินและเลือก CLO ให้ครบทุกแถวในตารางสรุป (หมายเหตุ: จะกรอกหรือไม่ก็ได้)");
            setShowErrorPopup(true);
            setShowErrors(true);
            return;
        }

        router.push("/category5");
    };

    return (
        <FormShell onPrev={handlePrev} onNext={handleNext}>
            {/* หมวดที่ 4 */}
            <div className="py-[26px] px-[36px] border-t border-gray-200">
                <div className="flex items-center gap-[10px] m-0 mb-[18px]">
                    <span className="bg-[#d5ae52] text-white font-bold text-[13px] px-[12px] py-[5px] rounded-full">
                        หมวดที่ 4
                    </span>
                    <h2 className="text-[16px] m-0 font-bold text-[#1b3860]">
                        การประเมินผลการเรียนรู้
                    </h2>
                </div>

                <div className="w-full my-[20px] mb-[10px]">
                    <div className="mb-[20px]">
                        <label className="font-semibold text-[13px] text-[#1b3860] block mb-[10px]">
                            เลือกรูปแบบการประเมินผล
                        </label>
                        <div className="flex items-center gap-[20px]">
                            <label className="flex items-center gap-[6px] text-[13px] text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gradingPattern"
                                    value="1"
                                    checked={form.gradingPattern === "1"}
                                    onChange={(e) => {
                                        if (showDetails) {
                                            setPendingPattern(e.target.value);
                                            setShowConfirmChange(true);
                                        } else {
                                            form.setGradingPattern(e.target.value);
                                            setShowDetails(false);
                                            setIsConfirmed(false);
                                        }
                                    }}
                                    className="accent-[#d5ae52] w-[15px] h-[15px] cursor-pointer"
                                />
                                รูปแบบที่ 1
                            </label>
                            <label className="flex items-center gap-[6px] text-[13px] text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gradingPattern"
                                    value="2"
                                    checked={form.gradingPattern === "2"}
                                    onChange={(e) => {
                                        if (showDetails) {
                                            setPendingPattern(e.target.value);
                                            setShowConfirmChange(true);
                                        } else {
                                            form.setGradingPattern(e.target.value);
                                            setShowDetails(false);
                                            setIsConfirmed(false);
                                        }
                                    }}
                                    className="accent-[#d5ae52] w-[15px] h-[15px] cursor-pointer"
                                />
                                รูปแบบที่ 2
                            </label>
                        </div>
                    </div>

                    {form.gradingPattern && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                                {/* Column 1 */}
                                <div className="bg-gray-50 border border-gray-200 rounded-[8px] p-[16px]">
                                    <h3 className="text-[14px] font-bold text-[#1b3860] mb-[12px]">
                                        การแบ่งค่าน้ำหนักของคะแนน
                                    </h3>
                                    <ul className="text-[13px] text-gray-700 space-y-[8px] list-none p-0 m-0">
                                        <li className="flex justify-between">
                                            <span>1) คะแนนเข้าชั้นเรียน</span>
                                            <span className="font-semibold">10%</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>2) มีการส่งแผนการปฏิบัติการ (Lab Plan)</span>
                                            <span className="font-semibold">10%</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>3) วัดทักษะการใช้เครื่องมือในขณะปฏิบัติงาน</span>
                                            <span className="font-semibold">20%</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>4) Quiz แบบทดสอบย่อยภายในกิจกรรม </span>
                                            <span className="font-semibold">20%</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>5) Report ส่งงานมีคุณภาพและตรงต่อเวลา</span>
                                            <span className="font-semibold">40%</span>
                                        </li>
                                        <li className="flex justify-between pt-[8px] border-t border-gray-200 mt-[8px]">
                                            <span className="font-bold text-[#1b3860]">รวม</span>
                                            <span className="font-bold text-[#1b3860]">100%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Column 2 */}
                                <div className="bg-gray-50 border border-gray-200 rounded-[8px] p-[16px]">
                                    <h3 className="text-[14px] font-bold text-[#1b3860] mb-[12px]">
                                        เกณฑ์การตัดเกรด
                                    </h3>
                                    <div className="grid grid-cols-2 gap-[10px] text-[13px]">
                                        {form.gradingPattern === "1" ? (
                                            <>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">A</span>
                                                    <span className="text-gray-700 font-medium">80</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">C</span>
                                                    <span className="text-gray-700 font-medium">55</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">B+</span>
                                                    <span className="text-gray-700 font-medium">75</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">D+</span>
                                                    <span className="text-gray-700 font-medium">50</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">B</span>
                                                    <span className="text-gray-700 font-medium">70</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">D</span>
                                                    <span className="text-gray-700 font-medium">40</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">C+</span>
                                                    <span className="text-gray-700 font-medium">65</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-black text-[14px]">F</span>
                                                    <span className="text-yellow-600 font-medium">&lt;39</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">A</span>
                                                    <span className="text-gray-700 font-medium">80</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">C</span>
                                                    <span className="text-gray-700 font-medium">60</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">B+</span>
                                                    <span className="text-gray-700 font-medium">75</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">D+</span>
                                                    <span className="text-gray-700 font-medium">55</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">B</span>
                                                    <span className="text-gray-700 font-medium">70</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">D</span>
                                                    <span className="text-gray-700 font-medium">50</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-[#1b3860] text-[14px]">C+</span>
                                                    <span className="text-gray-700 font-medium">65</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-[12px] py-[8px] rounded-[6px] border border-gray-200 shadow-sm">
                                                    <span className="font-bold text-black text-[14px]">F</span>
                                                    <span className="text-yellow-600 font-medium">&lt;49</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {form.gradingPattern && !showDetails && (
                                <div className="flex justify-end mt-[16px]">
                                    <button
                                        className="bg-[#1b3860] text-white px-[18px] py-[8px] rounded-[6px] text-[13px] font-bold hover:bg-[#142946] transition-colors shadow-sm"
                                        onClick={() => setShowDetails(true)}
                                    >
                                        ตกลง
                                    </button>
                                </div>
                            )}

                            {/* Dynamic Evaluation Configuration Section */}
                            {showDetails && (
                                <div className="mt-[32px] pt-[24px] border-t border-gray-200">
                                    <h3 className="text-[15px] font-bold text-[#1b3860] mb-[16px]">
                                        รายละเอียดการประเมินผล
                                    </h3>
                                    <ConfigurableEvaluationItem
                                        title="3) แบบทดสอบย่อย"
                                        targetPercent={quizTarget}
                                        config={form.evaluationData.quiz}
                                        onChange={(cfg) =>
                                            form.setEvaluationData({ ...form.evaluationData, quiz: cfg })
                                        }
                                        showErrors={showErrors}
                                    />
                                    <ConfigurableEvaluationItem
                                        title="4) การบ้าน"
                                        targetPercent={hwTarget}
                                        config={form.evaluationData.homework}
                                        onChange={(cfg) =>
                                            form.setEvaluationData({ ...form.evaluationData, homework: cfg })
                                        }
                                        showErrors={showErrors}
                                    />
                                    <ConfigurableEvaluationItem
                                        title="5) กิจกรรมในชั้นเรียน"
                                        targetPercent={activityTarget}
                                        config={form.evaluationData.activity}
                                        onChange={(cfg) =>
                                            form.setEvaluationData({ ...form.evaluationData, activity: cfg })
                                        }
                                        showErrors={showErrors}
                                    />

                                    {isEvalValid() && !isConfirmed && (
                                        <div className="flex justify-center mt-[24px]">
                                            <button
                                                className="bg-[#d5ae52] text-white px-[24px] py-[10px] rounded-[6px] text-[14px] font-bold hover:bg-[#c29c45] shadow-sm transition-colors"
                                                onClick={() => setIsConfirmed(true)}
                                            >
                                                ตกลง (ยืนยันรายละเอียด)
                                            </button>
                                        </div>
                                    )}

                                    {isConfirmed && (
                                        <EvaluationSummaryTable form={form} showErrors={showErrors} />
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {showErrorPopup && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[12px] shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
                        <div className="bg-red-500 px-6 py-4 flex items-center justify-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h3 className="text-[16px] font-bold text-white m-0 tracking-wide">แจ้งเตือน</h3>
                        </div>
                        <div className="p-[24px] text-center">
                            <p className="text-[14px] text-gray-700 font-medium mb-[24px] leading-relaxed">
                                {errorMsg}
                            </p>
                            <button
                                onClick={() => setShowErrorPopup(false)}
                                className="w-full bg-[#1b3860] hover:bg-[#142946] text-white font-bold py-[10px] px-[16px] rounded-[6px] transition-colors shadow-sm"
                            >
                                ตกลง
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmChange && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[12px] shadow-xl w-full max-w-sm overflow-hidden border border-gray-100">
                        <div className="bg-yellow-500 px-6 py-4 flex items-center justify-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h3 className="text-[16px] font-bold text-white m-0 tracking-wide">แจ้งเตือน</h3>
                        </div>
                        <div className="p-[24px] text-center">
                            <p className="text-[14px] text-gray-700 font-medium mb-[24px] leading-relaxed">
                                ข้อมูลที่กรอกไว้จะหายทั้งหมด ต้องการเปลี่ยนรูปแบบการประเมินผลหรือไม่?
                            </p>
                            <div className="flex gap-[12px]">
                                <button
                                    onClick={() => {
                                        setShowConfirmChange(false);
                                        setPendingPattern("");
                                    }}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-[10px] px-[16px] rounded-[6px] transition-colors"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    onClick={() => {
                                        form.setGradingPattern(pendingPattern);
                                        setShowDetails(false);
                                        setIsConfirmed(false);
                                        setShowErrors(false);
                                        setShowConfirmChange(false);
                                        setPendingPattern("");
                                    }}
                                    className="flex-1 bg-[#1b3860] hover:bg-[#142946] text-white font-bold py-[10px] px-[16px] rounded-[6px] transition-colors shadow-sm"
                                >
                                    ยืนยัน
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </FormShell>
    );
}
