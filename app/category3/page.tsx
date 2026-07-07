"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormShell from "../components/FormShell";

interface LessonPlanItem {
  id: string;
  isExam?: boolean;
  examName?: string;
  weekDate: string;
  topic: string;
  teachingMethod: string;
  teamLocation: string;
  hours: string;
  instructor: string;
}

export default function Category3Page() {
  const router = useRouter();

  const [weeksBefore, setWeeksBefore] = useState<number | string>("");
  const [weeksAfter, setWeeksAfter] = useState<number | string>("");

  const [lessonPlans, setLessonPlans] = useState<LessonPlanItem[]>([]);

  const [instructors, setInstructors] = useState<string[]>([
    "อ.สุวดี",
    "อ.ใจดี",
    "อ.สมชาย",
  ]);

  const [teachingGuidelines, setTeachingGuidelines] = useState("");
  const [materials, setMaterials] = useState("");

  // State สำหรับข้อความหมายเหตุใต้ตาราง
  const [tableRemark, setTableRemark] = useState(
    "หมายเหตุ : 1. ในกรณีที่ตรงกับวันหยุดจะนัดวันสอนเพิ่มเติมภายหลัง และ 2. รูปแบบการสอน/กิจกรรม : ปฏิบัติการ กิจกรรมกลุ่ม อภิปราย มอบหมายงาน"
  );

  // State สำหรับแจ้งเตือนตอนสร้างตารางใหม่
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);

  const handleGenerateClick = () => {
    if (hasGeneratedOnce) {
      setShowConfirmPopup(true);
    } else {
      generateTable();
      setHasGeneratedOnce(true);
    }
  };

  const confirmGenerateTable = () => {
    generateTable();
    setShowConfirmPopup(false);
  };

  const generateTable = () => {
    const newPlans: LessonPlanItem[] = [];
    let currentWeek = 1;

    const beforeCount = Number(weeksBefore) || 0;
    const afterCount = Number(weeksAfter) || 0;

    for (let i = 0; i < beforeCount; i++) {
      newPlans.push({
        id: `w-${currentWeek}-${Date.now()}`,
        isExam: false,
        weekDate: `${currentWeek}`,
        topic: "",
        teachingMethod: "",
        teamLocation: "",
        hours: "3",
        instructor: "",
      });
      currentWeek++;
    }

    newPlans.push({
      id: `midterm-${Date.now()}`,
      isExam: true,
      examName: "ช่วงสอบกลางภาค",
      weekDate: "", topic: "", teachingMethod: "", teamLocation: "", hours: "", instructor: ""
    });

    for (let i = 0; i < afterCount; i++) {
      newPlans.push({
        id: `w-${currentWeek}-${Date.now()}`,
        isExam: false,
        weekDate: `${currentWeek}`,
        topic: "",
        teachingMethod: "",
        teamLocation: "",
        hours: "3",
        instructor: "",
      });
      currentWeek++;
    }

    newPlans.push({
      id: `final-${Date.now()}`,
      isExam: true,
      examName: "ช่วงสอบปลายภาค",
      weekDate: "", topic: "", teachingMethod: "", teamLocation: "", hours: "", instructor: ""
    });

    setLessonPlans(newPlans);
  };

  // ฟังก์ชันตัวช่วยสำหรับจัดเรียงเลขสัปดาห์ใหม่
  const reindexWeeks = (plans: LessonPlanItem[]) => {
    let nonExamWeekCounter = 1;
    return plans.map((item) => {
      if (item.isExam) return item;

      let currentWeekDate = item.weekDate.trim();
      // ถ้ายืนยันว่าเป็นตัวเลขล้วน หรือเป็นช่องว่าง (เช่น แถวที่เพิ่งเพิ่มมาใหม่) ให้เปลี่ยนเลขใหม่ตามลำดับ
      if (/^\d+$/.test(currentWeekDate) || currentWeekDate === "") {
        currentWeekDate = nonExamWeekCounter.toString();
      }
      nonExamWeekCounter++;
      return { ...item, weekDate: currentWeekDate };
    });
  };

  // ฟังก์ชันเพิ่มแถวใหม่แทรกก่อนช่วงสอบ
  const addManualRow = (insertIndex: number) => {
    const newRow: LessonPlanItem = {
      id: `manual-${Date.now()}`,
      isExam: false,
      weekDate: "", // จะถูกรันเลขใหม่อัตโนมัติในฟังก์ชัน reindexWeeks
      topic: "",
      teachingMethod: "",
      teamLocation: "",
      hours: "3",
      instructor: "",
    };
    const newPlans = [...lessonPlans];
    newPlans.splice(insertIndex, 0, newRow); // แทรกแถวใหม่เข้าไป
    setLessonPlans(reindexWeeks(newPlans)); // จัดเรียงเลขใหม่ทันที
  };

  useEffect(() => {
    if (lessonPlans.length === 0) {
      generateTable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update input numbers when lessonPlans changes (e.g., from add/remove rows)
  useEffect(() => {
    if (lessonPlans.length > 0) {
      let before = 0;
      let after = 0;
      let examCount = 0;

      for (const item of lessonPlans) {
        if (item.isExam) {
          examCount++;
          continue;
        }
        if (examCount === 0) {
          before++;
        } else if (examCount === 1) {
          after++;
        }
      }
      setWeeksBefore(before);
      setWeeksAfter(after);
    }
  }, [lessonPlans]);

  useEffect(() => {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((t) => {
      t.style.height = "auto";
      t.style.height = `${t.scrollHeight}px`;
    });
  });

  const handlePrev = () => router.push("/category2");
  const handleNext = () => router.push("/category4");

  const updateLesson = (id: string, field: keyof LessonPlanItem, value: string) => {
    setLessonPlans(
      lessonPlans.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // ฟังก์ชันลบแถว + จัดเรียงเลขสัปดาห์ใหม่
  const removeLessonRow = (id: string) => {
    const filteredPlans = lessonPlans.filter((item) => item.id !== id);
    setLessonPlans(reindexWeeks(filteredPlans));
  };

  const totalHours = lessonPlans.reduce((sum, item) => {
    if (!item.isExam && item.hours) {
      return sum + (Number(item.hours) || 0);
    }
    return sum;
  }, 0);

  const thClass = "bg-[#1b3860] text-white font-bold px-[8px] py-[10px] border-b-2 border-[#142946] text-center align-middle";
  const tdClass = "px-[8px] py-[6px] border-b border-gray-200 align-top";
  const inputClass = "w-full border border-transparent bg-transparent font-inherit text-[13px] text-gray-700 px-[6px] py-[6px] rounded-[6px] focus:outline-none focus:border-[#d5ae52] focus:bg-white print:border-transparent print:bg-transparent transition-colors duration-200";

  return (
    <FormShell onPrev={handlePrev} onNext={handleNext}>
      <div className="py-[16px] md:py-[26px] px-[16px] md:px-[36px] border-t border-gray-200">

        <div className="flex items-center gap-[10px] m-0 mb-[18px]">
          <span className="bg-[#d5ae52] text-white font-bold text-[13px] px-[12px] py-[5px] rounded-full">
            หมวดที่ 3
          </span>
          <h2 className="text-[16px] m-0 font-bold text-[#1b3860]">
            การดำเนินการและแผนการสอน
          </h2>
        </div>

        {/* 1. รูปแบบ แนวทาง และกิจกรรมการสอน */}
        <div className="w-full mb-[24px]">
          <label className="font-semibold text-[14px] text-[#1b3860] block mb-[8px]">
            1. รูปแบบ แนวทาง และกิจกรรมการสอน
          </label>
          <textarea
            rows={4}
            className="font-inherit text-[14px] border border-gray-200 rounded-[8px] px-[11px] py-[9px] bg-gray-50 text-gray-700 w-full focus:outline-none focus:border-[#d5ae52] focus:bg-white transition-colors duration-200"
            placeholder="เช่น การสอบ, การทำรายงาน, บรรยาย, ยกตัวอย่างกรณีศึกษา..."
            value={teachingGuidelines}
            onChange={(e) => setTeachingGuidelines(e.target.value)}
          />
        </div>

        {/* 2. หัวข้อการเรียนการสอน / แผนการสอน */}
        <div className="w-full mb-[14px]">
          <label className="font-semibold text-[14px] text-[#1b3860] block mb-[8px]">
            2. หัวข้อการเรียนการสอน / แผนการสอน
          </label>

          {/* ปรับ UI ส่วนตั้งค่าให้เรียงต่อกันตามรูป รองรับขนาดหน้าจอเล็ก */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-end gap-4 print:hidden bg-[#f4f7fb] p-4 rounded-lg border border-blue-100 mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
              <label className="text-[13px] text-[#1b3860] font-medium">สัปดาห์ก่อนสอบกลางภาค:</label>
              <input
                type="text"
                className="w-full sm:w-[100px] px-2 py-1.5 rounded border border-gray-300 text-sm focus:outline-none focus:border-[#d5ae52]"
                value={weeksBefore}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setWeeksBefore(val === "" ? "" : Number(val));
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
              <label className="text-[13px] text-[#1b3860] font-medium">สัปดาห์หลังสอบกลางภาค:</label>
              <input
                type="text"
                className="w-full sm:w-[100px] px-2 py-1.5 rounded border border-gray-300 text-sm focus:outline-none focus:border-[#d5ae52]"
                value={weeksAfter}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setWeeksAfter(val === "" ? "" : Number(val));
                }}
              />
            </div>

            <button
              onClick={handleGenerateClick}
              className="w-full mt-x-5 sm:w-auto bg-[#d5ae52] text-white font-medium text-[13px] px-5 py-[7px] rounded hover:bg-[#c29c45] transition-colors shadow-sm h-[32px] sm:mb-[1px] mt-2 sm:mt-0 sm:ml-2"
            >
              สร้างตารางอัตโนมัติ
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mb-[4px]">
          <table className="w-full border-collapse text-[13px] border border-gray-200 rounded-[8px] overflow-hidden">
            <thead>
              <tr>
                <th className={`${thClass} min-w-[120px] sm:min-w-[110px] sm:w-[110px]`}>สัปดาห์ที่ /<br />วันที่สอน</th>
                <th className={`${thClass} min-w-[250px] sm:min-w-[200px]`}>หัวข้อ</th>
                <th className={`${thClass} min-w-[180px] sm:min-w-[150px] sm:w-[150px]`}>รูปแบบการสอน/<br />กิจกรรม</th>
                <th className={`${thClass} min-w-[180px] sm:min-w-[150px] sm:w-[150px]`}>สถานที่ / ทีม</th>
                <th className={`${thClass} min-w-[80px] sm:min-w-[70px] sm:w-[70px]`}>ชั่วโมง</th>
                <th className={`${thClass} min-w-[150px] sm:min-w-[100px] sm:w-[100px]`}>ผู้สอน</th>
                <th className={`${thClass} min-w-[50px] sm:min-w-[40px] sm:w-[40px]`}></th>
              </tr>
            </thead>
            <tbody>
              {lessonPlans.map((item, index) => {
                // หากถึงแถวที่เป็นการสอบ ให้แทรกปุ่มเพิ่มแถวไว้ด้านบนก่อน
                if (item.isExam) {
                  return (
                    <React.Fragment key={item.id}>
                      {/* ปุ่มเพิ่มแถวก่อนถึงช่วงสอบ */}
                      <tr className="bg-white print:hidden">
                        <td colSpan={7} className="px-[12px] py-[12px] border-b border-gray-200">
                          <button
                            onClick={() => addManualRow(index)}
                            className="inline-flex items-center gap-[6px] bg-white border border-dashed border-[#c29c45] text-[#c29c45] font-semibold text-[13px] px-[14px] py-[6px] rounded-[6px] cursor-pointer hover:bg-amber-50 transition-colors duration-200"
                          >
                            + เพิ่มแถว
                          </button>
                        </td>
                      </tr>
                      {/* แถวช่วงสอบ */}
                      <tr className="bg-gray-200">
                        <td colSpan={7} className="px-[12px] py-[10px] border-b border-gray-300 text-left font-bold text-gray-700">
                          <input
                            className="bg-transparent border-none font-inherit text-[13px] font-bold outline-none w-full sm:w-[300px]"
                            value={item.examName}
                            onChange={(e) => updateLesson(item.id, "examName", e.target.value)}
                            placeholder="ระบุชื่อการสอบ..."
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                }

                // แถวสัปดาห์ปกติ
                return (
                  <tr key={item.id} className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className={tdClass}>
                      <input
                        className={`${inputClass} text-center font-medium`}
                        value={item.weekDate}
                        placeholder="เช่น 1"
                        onChange={(e) => updateLesson(item.id, "weekDate", e.target.value)}
                      />
                    </td>
                    <td className={tdClass}>
                      <textarea
                        rows={1}
                        className={`${inputClass} min-h-[38px] overflow-hidden`}
                        value={item.topic}
                        placeholder="ระบุหัวข้อ..."
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                        onChange={(e) => updateLesson(item.id, "topic", e.target.value)}
                      />
                    </td>
                    <td className={tdClass}>
                      <textarea
                        rows={1}
                        className={`${inputClass} min-h-[38px] overflow-hidden`}
                        value={item.teachingMethod}
                        placeholder="เช่น บรรยาย..."
                        onChange={(e) => updateLesson(item.id, "teachingMethod", e.target.value)}
                      />
                    </td>
                    <td className={tdClass}>
                      <textarea
                        rows={1}
                        className={`${inputClass} min-h-[38px] overflow-hidden text-blue-700`}
                        value={item.teamLocation}
                        placeholder="เช่น ทีม A..."
                        onChange={(e) => updateLesson(item.id, "teamLocation", e.target.value)}
                      />
                    </td>
                    <td className={tdClass}>
                      <input
                        type="number" min="0" max="10"
                        className={`${inputClass} text-center`}
                        value={item.hours}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "") {
                            updateLesson(item.id, "hours", "");
                          } else {
                            let num = Number(val);
                            if (num > 10) num = 10;
                            if (num < 0) num = 0;
                            updateLesson(item.id, "hours", num.toString());
                          }
                        }}
                      />
                    </td>
                    <td className={tdClass}>
                      <select
                        className={`${inputClass} appearance-none cursor-pointer border-gray-300 border text-center`}
                        value={item.instructor}
                        onChange={(e) => updateLesson(item.id, "instructor", e.target.value)}
                      >
                        <option value="" disabled>เลือกผู้สอน</option>
                        {instructors.map((instructor, idx) => (
                          <option key={idx} value={instructor}>{instructor}</option>
                        ))}
                      </select>
                    </td>
                    <td className={`${tdClass} text-center align-middle`}>
                      <button
                        className="border-none bg-none cursor-pointer text-gray-400 text-[16px] px-[6px] py-[2px] rounded-[6px] hover:text-red-600 print:hidden transition-colors"
                        onClick={() => removeLessonRow(item.id)} title="ลบแถว"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}

              <tr className="bg-gray-100 font-bold text-[#1b3860]">
                <td colSpan={4} className={`${tdClass} text-center align-middle`}>
                  รวมจำนวนชั่วโมงตลอดภาคการศึกษา
                </td>
                <td className={`${tdClass} text-center align-middle text-[14px]`}>
                  {totalHours}
                </td>
                <td colSpan={2} className={tdClass}></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* หมายเหตุใต้ตาราง */}
        <div className="w-full mb-[24px]">
          <div className="flex flex-col border border-blue-300 bg-blue-50/50 rounded-[8px] p-[12px] hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white transition-colors">
            <span className="text-[11px] text-blue-600 mb-[6px] font-medium flex items-center gap-1">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
              หมายเหตุ (สามารถคลิกเพื่อแก้ไขข้อความได้)
            </span>
            <textarea
              rows={2}
              className="w-full text-[12px] text-gray-700 bg-transparent border-none outline-none resize-none overflow-hidden"
              value={tableRemark}
              onChange={(e) => setTableRemark(e.target.value)}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </div>
        </div>

        {/* 3. ทรัพยากรและเอกสารประกอบการเรียนการสอน */}
        <div className="w-full mt-[12px] mb-[10px]">
          <label className="font-semibold text-[14px] text-[#1b3860] block mb-[8px]">
            3. ทรัพยากรและเอกสารประกอบการเรียนการสอน
          </label>
          <textarea
            rows={3}
            className="font-inherit text-[14px] border border-gray-200 rounded-[8px] px-[11px] py-[9px] bg-gray-50 text-gray-700 w-full focus:outline-none focus:border-[#d5ae52] focus:bg-white transition-colors duration-200"
            placeholder="เอกสารประกอบการบรรยาย, หนังสืออ้างอิง, เว็บไซต์..."
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
          />
        </div>

      </div>

      {/* Modal ยืนยันการสร้างตารางใหม่ */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-2">ยืนยันการสร้างตารางใหม่</h3>
            <p className="text-gray-600 text-[14px] mb-6">
              หากคุณกด &quot;ดำเนินการสร้างใหม่&quot; ข้อมูลที่อยู่ภายในตารางปัจจุบันจะถูกลบทั้งหมด<br /><br />
              คุณต้องการดำเนินการต่อหรือไม่?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium text-[13px] transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmGenerateTable}
                className="px-4 py-2 rounded-md bg-[#d5ae52] text-white hover:bg-[#c29c45] font-medium text-[13px] transition-colors shadow-sm"
              >
                ดำเนินการสร้างใหม่
              </button>
            </div>
          </div>
        </div>
      )}

    </FormShell>
  );
}