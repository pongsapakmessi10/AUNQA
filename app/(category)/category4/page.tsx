"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormShell from "../../components/FormShell";
import { useFormContext, EvaluationConfig, EvaluationSubItem, IS_DEV_MODE } from "../../FormContext";
import { EvaluationSummaryTable } from "./components/EvaluationSummaryTable";
import { ConfigurableEvaluationItem } from "./components/ConfigurableEvaluationItem";

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
                      <span>1) สอบกลางภาค (2 ชั่วโมง)</span>
                      <span className="font-semibold">25%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>2) สอบปลายภาค (3 ชั่วโมง)</span>
                      <span className="font-semibold">35%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>3) แบบทดสอบย่อย</span>
                      <span className="font-semibold">{quizTarget}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>4) การบ้าน</span>
                      <span className="font-semibold">{hwTarget}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>5) กิจกรรมในชั้นเรียน</span>
                      <span className="font-semibold">{activityTarget}%</span>
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
