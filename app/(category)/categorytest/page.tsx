"use client";

import React, { useState } from "react";

// Mock Data
const CLOs = [
  { id: 1, text: "อธิบายหลักการและทฤษฎี..." },
  { id: 2, text: "สามารถใช้เครื่องมือวิทยาศาสตร์..." },
  { id: 3, text: "ประยุกต์ใช้เทคนิคปฏิบัติการ..." },
  { id: 4, text: "มีความรับผิดชอบต่อหน้าที่และทำงานร่วมกับผู้อื่นได้..." },
];

const METHODS = [
  { id: "plan", label: "คะแนนเข้าชั้นเรียน/ตั้งใจเรียน/แต่งกายเหมาะสมตามหลัก 10%" },
  { id: "quiz", label: "มีการส่งแผนการปฏิบัติการ 10%" },
  { id: "report", label: "วัดทักษะการใช้เครื่องมือในขณะปฏิบัติงาน/การทำงานร่วมกัน 20%" },
  { id: "skill", label: "แบบทดสอบย่อยภายในกิจกรรม 20%" },
  { id: "quality", label: "ส่งงานมีคุณภาพและตรงต่อเวลา 40%" },
];

const WEEKS = Array.from({ length: 15 }, (_, i) => i + 1);

export default function CategoryTestPage() {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-[12px] shadow-sm border border-gray-200 mb-6">
          <h1 className="text-[24px] font-bold text-[#1b3860] mb-2">
            UX Prototypes: หมวดที่ 4.1 (ปฏิบัติการ)
          </h1>
          <div className="w-24 h-1 bg-[#d5ae52] rounded-full mb-6"></div>
          
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-[12px] shadow-sm border border-gray-200 min-h-[600px]">
          <Idea1CLOCentric />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Idea 1: CLO-Centric
// -------------------------------------------------------------
function Idea1CLOCentric() {
  const [selectedWeeksByClo, setSelectedWeeksByClo] = useState<Record<number, number[]>>({
    1: [3, 4, 5, 6],
    2: [],
    3: [],
    4: []
  });

  const handleToggleWeek = (cloId: number, week: number) => {
    const isTaken = Object.entries(selectedWeeksByClo).some(
      ([id, weeks]) => parseInt(id) !== cloId && weeks.includes(week)
    );
    if (isTaken) return;

    setSelectedWeeksByClo(prev => {
      const current = prev[cloId] || [];
      const newWeeks = current.includes(week) 
        ? current.filter(w => w !== week)
        : [...current, week];
      return { ...prev, [cloId]: newWeeks };
    });
  };

  const [instructorsByClo, setInstructorsByClo] = useState<Record<number, string[]>>({
    1: ["รศ.ดร.สุวดี / อ.ดร.เจนจิรา"],
    2: [""],
    3: [""],
    4: [""]
  });

  const handleAddInstructor = (cloId: number) => {
    setInstructorsByClo(prev => {
      const current = prev[cloId] || [];
      return { ...prev, [cloId]: [...current, ""] };
    });
  };

  const handleInstructorChange = (cloId: number, index: number, value: string) => {
    setInstructorsByClo(prev => {
      const current = [...(prev[cloId] || [])];
      current[index] = value;
      return { ...prev, [cloId]: current };
    });
  };
  
  const handleRemoveInstructor = (cloId: number, index: number) => {
    setInstructorsByClo(prev => {
      const current = [...(prev[cloId] || [])];
      current.splice(index, 1);
      if (current.length === 0) current.push(""); 
      return { ...prev, [cloId]: current };
    });
  };

  const [proportionsByClo, setProportionsByClo] = useState<Record<number, string>>({
    1: "30",
    2: "30",
    3: "30",
    4: "10"
  });

  const handleProportionChange = (cloId: number, val: string) => {
    setProportionsByClo(prev => ({ ...prev, [cloId]: val }));
  };

  const totalProportion = Object.values(proportionsByClo).reduce((acc, val) => {
    const num = parseFloat(val);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const [selectedMethodsByClo, setSelectedMethodsByClo] = useState<Record<number, string[]>>({
    1: METHODS.map(m => m.label),
    2: METHODS.map(m => m.label),
    3: METHODS.map(m => m.label),
    4: METHODS.map(m => m.label),
  });

  const handleToggleMethod = (cloId: number, methodLabel: string) => {
    setSelectedMethodsByClo(prev => {
      const current = prev[cloId] || [];
      return {
        ...prev,
        [cloId]: current.includes(methodLabel)
          ? current.filter(m => m !== methodLabel)
          : [...current, methodLabel]
      };
    });
  };

  const [showSection4, setShowSection4] = useState(false);

  const hasInstructors = CLOs.every(clo => {
    const insts = instructorsByClo[clo.id] || [];
    return insts.some(i => i.trim() !== "");
  });

  const isFormValid = totalProportion === 100 && hasInstructors;

  return (
    <div className="animate-in fade-in duration-300 space-y-12">
      {/* Section 1 */}
      <div>
        <h2 className="text-[18px] font-bold text-[#1b3860] mb-6">Section 1 - รูปแบบการประเมินผล</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ข้อมูลการประเมินผล */}
          <div className="bg-white p-5 border border-gray-200 rounded-[8px] shadow-sm">
            <h3 className="text-[14px] font-bold text-[#1b3860] mb-4 border-b pb-2">วิธีการประเมินผลและสัดส่วนคะแนน</h3>
            <ul className="space-y-3 text-[13px] text-gray-700">
              <li className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span>1. คะแนนเข้าชั้นเรียน/ตั้งใจเรียน/แต่งกายเหมาะสมตามหลัก Safety</span>
                <span className="font-bold text-black">10%</span>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>2. มีการส่งแผนการปฏิบัติการ (Lab Plan)</span>
                <span className="font-bold text-black">10%</span>
              </li>
              <li className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span>3. วัดทักษะการใช้เครื่องมือในขณะปฏิบัติงาน/การทำงานร่วมกัน</span>
                <span className="font-bold text-black">20%</span>
              </li>
              <li className="flex justify-between items-center p-2">
                <span>4. Quiz แบบทดสอบย่อยภายในกิจกรรม</span>
                <span className="font-bold text-black">20%</span>
              </li>
              <li className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span>5. Report ส่งงานมีคุณภาพและตรงต่อเวลา</span>
                <span className="font-bold text-black">40%</span>
              </li>
            </ul>
          </div>

          {/* เกณฑ์การให้คะแนน */}
          <div className="bg-white p-5 border border-gray-200 rounded-[8px] shadow-sm">
            <h3 className="text-[14px] font-bold text-[#1b3860] mb-4 border-b pb-2">เกณฑ์การให้คะแนน</h3>
            <table className="w-full text-[13px] text-gray-700 text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 rounded-tl">เกรด</th>
                  <th className="py-2 px-4 rounded-tr">คะแนน</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { grade: 'A', score: '80' },
                  { grade: 'B+', score: '75' },
                  { grade: 'B', score: '70' },
                  { grade: 'C+', score: '65' },
                  { grade: 'C', score: '55' },
                  { grade: 'D+', score: '50' },
                  { grade: 'D', score: '40' },
                  { grade: 'F', score: '< 39' }
                ].map((item, idx) => (
                  <tr key={item.grade} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-4 border-b border-gray-100 font-bold text-[#1b3860]">{item.grade}</td>
                    <td className={`py-2 px-4 border-b border-gray-100 ${item.grade === 'F' ? 'text-[#d5ae52] font-bold' : ''}`}>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <h2 className="text-[18px] font-bold text-[#1b3860] mb-6">Section 2 - รายละเอียดการประเมินผล</h2>
        <div className="bg-white p-5 border border-gray-200 rounded-[8px] shadow-sm space-y-4">
          
          {/* Item 1 */}
          <div className="bg-gray-50 p-4 rounded-[6px]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#1b3860]">1. เข้าปฏิบัติการ</span>
              <span className="font-bold text-[#1b3860]">10%</span>
            </div>
            <div className="flex flex-col border border-gray-200 bg-gray-50 rounded-[8px] p-[12px] hover:border-gray-300 focus-within:border-gray-400 focus-within:bg-white transition-colors">
              <span className="text-[11px] text-yellow-600 mb-[6px] font-medium flex items-center gap-1"><svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path></svg>สามารถคลิกเพื่อแก้ไขข้อความได้</span>
              <textarea 
                defaultValue="แต่งกายตามข้อปฏิบัติด้านความปลอดภัย ส่งแผนการทดลอง และอยู่ในห้องปฏิบัติการตลอดการทดลอง"
                onInput={(e) => {
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                className="w-full text-[13px] text-gray-700 bg-transparent border-none outline-none resize-none overflow-hidden p-0"
              />
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-4 border border-gray-100 rounded-[6px]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#1b3860]">2. รายงาน</span>
              <span className="font-bold text-[#1b3860]">30%</span>
            </div>
            <div className="flex flex-col border border-gray-200 bg-gray-50 rounded-[8px] p-[12px] hover:border-gray-300 focus-within:border-gray-400 focus-within:bg-white transition-colors">
              <span className="text-[11px] text-yellow-600 mb-[6px] font-medium flex items-center gap-1"><svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path></svg>สามารถคลิกเพื่อแก้ไขข้อความได้</span>
              <textarea 
                defaultValue="ส่งรายงานก่อนเวลา 9:30 น. ในสัปดาห์การทดลองถัดไป แลปสุดท้ายส่งที่ C107"
                onInput={(e) => {
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                className="w-full text-[13px] text-gray-700 bg-transparent border-none outline-none resize-none overflow-hidden p-0"
              />
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-gray-50 p-4 rounded-[6px]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#1b3860]">3. แบบทดสอบย่อย</span>
              <span className="font-bold text-[#1b3860]">30%</span>
            </div>
            <div className="flex flex-col border border-gray-200 bg-gray-50 rounded-[8px] p-[12px] hover:border-gray-300 focus-within:border-gray-400 focus-within:bg-white transition-colors">
              <span className="text-[11px] text-yellow-600 mb-[6px] font-medium flex items-center gap-1"><svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path></svg>สามารถคลิกเพื่อแก้ไขข้อความได้</span>
              <textarea 
                defaultValue="เมื่อมาของแต่ละปฏิบัติการ เวลา 9:30–9:40 น. ณ ห้องบรรยายก่อนปฏิบัติการ"
                onInput={(e) => {
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                className="w-full text-[13px] text-gray-700 bg-transparent border-none outline-none resize-none overflow-hidden p-0"
              />
            </div>
          </div>

          {/* Item 4 */}
          <div className="bg-white p-4 border border-gray-100 rounded-[6px]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#1b3860]">4. แบบประเมินการปฏิบัติ</span>
              <span className="font-bold text-[#1b3860]">30%</span>
            </div>
            <div className="flex flex-col border border-gray-200 bg-gray-50 rounded-[8px] p-[12px] hover:border-gray-300 focus-within:border-gray-400 focus-within:bg-white transition-colors">
              <span className="text-[11px] text-yellow-600 mb-[6px] font-medium flex items-center gap-1"><svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path></svg>สามารถคลิกเพื่อแก้ไขข้อความได้</span>
              <textarea 
                defaultValue="ประเมินพฤติกรรมในการเรียนและสอบความเข้าใจหลังปฏิบัติการ"
                onInput={(e) => {
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                className="w-full text-[13px] text-gray-700 bg-transparent border-none outline-none resize-none overflow-hidden p-0"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Section 3 */}
      <div>
        <div className="mb-6">
          <h2 className="text-[18px] font-bold text-[#1b3860]">Section 3 - เลือกสัปดาห์การประเมินผลการเรียนรู้</h2>
        </div>

      <div className="space-y-6">
        {CLOs.map((clo) => (
          <div key={clo.id} className="border border-gray-200 rounded-[8px] overflow-hidden">
            {/* Card Header */}
            <div className="bg-[#1b3860] text-white px-4 py-3 flex items-center justify-between">
              <span className="font-bold text-[14px]">CLO {clo.id}: {clo.text}</span>
            </div>
            
            {/* Card Body */}
            <div className="p-4 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* วิธีการประเมิน */}
                <div>
                  <label className="block text-[13px] font-bold text-[#1b3860] mb-2">วิธีการประเมินผลผู้เรียน</label>
                  <div className="space-y-2">
                    {METHODS.map(m => (
                      <label key={m.id} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-[#d5ae52]" 
                          checked={(selectedMethodsByClo[clo.id] || []).includes(m.label)}
                          onChange={() => handleToggleMethod(clo.id, m.label)}
                        />
                        <span className="text-[13px] text-gray-700 group-hover:text-[#d5ae52] transition-colors">{m.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* สัปดาห์ & คะแนน & ผู้สอน */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1b3860] mb-2">สัปดาห์ที่ประเมิน (เลือกได้หลายสัปดาห์)</label>
                    <div className="flex flex-wrap gap-1.5">
                      {WEEKS.map(w => {
                        const isSelectedByMe = (selectedWeeksByClo[clo.id] || []).includes(w);
                        const isTakenByOther = Object.entries(selectedWeeksByClo).some(
                          ([id, weeks]) => parseInt(id) !== clo.id && weeks.includes(w)
                        );
                        
                        let buttonClasses = "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 cursor-pointer";
                        if (isSelectedByMe) {
                          buttonClasses = "bg-[#d5ae52] text-white shadow-sm ring-2 ring-[#d5ae52] ring-offset-1 cursor-pointer";
                        } else if (isTakenByOther) {
                          buttonClasses = "bg-gray-100 text-gray-300 border border-gray-100 cursor-not-allowed opacity-70";
                        }

                        return (
                          <button 
                            key={w} 
                            onClick={() => handleToggleWeek(clo.id, w)}
                            disabled={isTakenByOther}
                            className={`w-8 h-8 rounded-[6px] text-[12px] font-semibold transition-all duration-300 ${buttonClasses}`}
                          >
                            {w}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-[13px] font-bold text-[#1b3860] mb-2">สัดส่วน (%)</label>
                      <input 
                        type="number" 
                        value={proportionsByClo[clo.id] || ""}
                        onChange={(e) => handleProportionChange(clo.id, e.target.value)}
                        className="w-full border border-gray-300 rounded-[6px] px-3 py-2 text-[13px] text-center focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all"
                      />
                    </div>
                    <div className="flex-[2]">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[13px] font-bold text-[#1b3860]">ผู้สอน</label>
                        <button 
                          onClick={() => handleAddInstructor(clo.id)}
                          className="text-[12px] text-[#d5ae52] hover:text-[#c29c45] font-bold flex items-center transition-colors"
                        >
                          + เพิ่มผู้สอน
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(instructorsByClo[clo.id] || [""]).map((inst, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={inst}
                                onChange={(e) => handleInstructorChange(clo.id, idx, e.target.value)}
                                placeholder="ระบุชื่อผู้สอน"
                                className="flex-1 border border-gray-300 rounded-[6px] px-3 py-2 text-[13px] focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all"
                              />
                              {(instructorsByClo[clo.id] || []).length > 1 && (
                                <button 
                                  onClick={() => handleRemoveInstructor(clo.id, idx)}
                                  className="text-gray-400 hover:text-red-500 transition-colors px-1"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                            {inst.trim() === "" && (
                              <span className="text-[11px] text-[#d5ae52]">กรุณากรอกชื่อผู้สอน</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
             
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-[#f8f9fa] border-t-2 border-[#1b3860] flex justify-between items-center rounded-b-[8px]">
        <span className="font-bold text-[#1b3860]">รวมสัดส่วนการประเมินทั้งหมด</span>
        <span className={`font-bold text-[18px] ${totalProportion === 100 ? 'text-green-600' : totalProportion > 100 ? 'text-red-500' : 'text-[#1b3860]'}`}>
          {totalProportion}%
        </span>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => setShowSection4(true)}
          disabled={!isFormValid}
          className={`px-6 py-3 rounded-[8px] font-bold transition-all cursor-pointer duration-300 ${
            isFormValid 
              ? "bg-[#1b3860] text-white shadow-md hover:bg-[#142946]" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          สร้างตาราง
        </button>
      </div>

      {/* Section 4 */}
      {showSection4 && (
        <div className="mt-12 animate-in slide-in-from-bottom-4 duration-500 border-t-2 border-gray-200 pt-12">
          <h2 className="text-[18px] font-bold text-[#1b3860] mb-6">Section 4 - ตารางประเมินการเรียนรู้</h2>
          <div className="overflow-x-auto rounded-[8px] shadow-sm border border-gray-200">
            <table className="w-full border-collapse bg-white text-[13px]">
              <thead>
                <tr className="bg-[#1b3860] text-white text-left">
                  <th className="p-3 border border-gray-300 w-16 text-center font-bold">CLOs</th>
                  <th className="p-3 border border-gray-300 font-bold">วิธีการประเมินผลผู้เรียน</th>
                  <th className="p-3 border border-gray-300 font-bold">สัปดาห์ที่ประเมิน</th>
                  <th className="p-3 border border-gray-300 text-right w-32 font-bold">สัดส่วนของการประเมิน</th>
                  <th className="p-3 border border-gray-300 font-bold">ผู้สอน</th>
                </tr>
              </thead>
              <tbody>
                {CLOs.map(clo => (
                  <tr key={clo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 align-top text-center font-bold text-[#1b3860] border border-gray-200">{clo.id}</td>
                    <td className="p-4 align-top border border-gray-200">
                      <ul className="list-disc pl-4 space-y-1 text-gray-700">
                        {(selectedMethodsByClo[clo.id] || []).map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 align-top text-gray-700 font-medium border border-gray-200">
                      {(selectedWeeksByClo[clo.id] || []).sort((a,b) => a-b).join(', ')}
                    </td>
                    <td className="p-4 align-top text-right font-bold text-[#d5ae52] border border-gray-200">
                      {proportionsByClo[clo.id] || 0}%
                    </td>
                    <td className="p-4 align-top text-gray-700 border border-gray-200">
                      {(instructorsByClo[clo.id] || []).filter(i => i.trim() !== "").join(' / ')}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold text-[#1b3860]">
                  <td className="p-4 border border-gray-200 text-center" colSpan={3}>รวม</td>
                  <td className="p-4 border border-gray-200 text-right">{totalProportion}%</td>
                  <td className="p-4 border border-gray-200"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}



// -------------------------------------------------------------
// Idea 3: Matrix Grid

