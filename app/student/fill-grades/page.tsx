"use client";

import { useState } from "react";
import { BookOpen, CheckCircle, Save } from "lucide-react";

export default function FillGradesPage() {
  // Mock Data: Registered Courses awaiting grades
  const [courses, setCourses] = useState([
    { id: 1, code: "BEB 200", name: "Inorganic Chemistry for Biochemical Industry", credits: 4, grade: "" },
    { id: 2, code: "BEB 221", name: "Industrial Microbiology and Fermentation Technology", credits: 4, grade: "" },
    { id: 3, code: "BEB 242", name: "Unit Operation in Biochemical Industry II", credits: 3, grade: "" },
    { id: 4, code: "BEB 243", name: "Unit Operation Laboratory in Biochemical Industry", credits: 1, grade: "" },
    { id: 5, code: "TU103", name: "Life and Sustainability", credits: 3, grade: "" },
    { id: 6, code: "XXxxx", name: "Free elective course", credits: 3, grade: "" },
    { id: 7, code: "BEB 290", name: "Industrial Training", credits: 1, grade: "" },
  ]);

  const handleGradeChange = (id: number, newGrade: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, grade: newGrade } : c));
  };

  const isAllFilled = courses.every(c => c.grade !== "");

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6 bg-gray-50/50 min-h-screen">
      {/* Formal Header */}
      <div className="bg-white p-5 md:px-8 md:py-6 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#d5ae52] mb-1">คณะวิทยาศาสตร์และเทคโนโลยี</p>
          <h1 className="text-2xl font-bold text-[#1b3860]">บันทึกผลการเรียน (Submit Grades)</h1>
          <p className="text-sm text-gray-500 mt-1">บันทึกหรืออัปเดตผลการเรียนประจำภาคการศึกษาล่าสุด</p>
        </div>
      </div>

      <div className="bg-white p-5 md:p-8 rounded-lg border border-gray-200 shadow-sm w-full">
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 pb-3">
          <BookOpen className="w-5 h-5 text-[#d5ae52]" />
          <h3 className="text-lg font-bold text-[#1b3860]">รายวิชาที่ลงทะเบียน (Registered Courses)</h3>
        </div>

        {/* Mobile View (Cards) */}
        <div className="md:hidden space-y-3 mt-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#d5ae52]"></div>
              <div className="flex justify-between items-start mb-3 pl-2">
                <div className="flex flex-col pr-2">
                  <span className="font-bold text-[#1b3860] text-sm">{course.code}</span>
                  <span className="font-medium text-[#1b3860] text-sm leading-snug mt-1">{course.name}</span>
                </div>
              </div>
              <div className="pl-2 mt-2 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-semibold">หน่วยกิต: {course.credits}</span>
                <div className="relative w-28">
                  <select
                    value={course.grade}
                    onChange={(e) => handleGradeChange(course.id, e.target.value)}
                    className={`w-full py-1.5 pl-3 pr-8 border rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#1b3860] focus:border-[#1b3860] transition appearance-none cursor-pointer
                      ${course.grade === '' ? 'border-gray-300 text-gray-400' : 'border-[#1b3860] text-[#1b3860] bg-[#1b3860]/5'}
                    `}
                  >
                    <option value="" disabled>- เลือก -</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                    <option value="S">S</option>
                    <option value="U">U</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#1b3860]">
                <th className="py-3 px-4 text-[#1b3860] font-bold text-sm whitespace-nowrap w-32">รหัสวิชา</th>
                <th className="py-3 px-4 text-[#1b3860] font-bold text-sm w-full">ชื่อวิชา</th>
                <th className="py-3 px-4 text-[#1b3860] font-bold text-sm text-center whitespace-nowrap w-24">หน่วยกิต</th>
                <th className="py-3 px-4 text-[#1b3860] font-bold text-sm text-center whitespace-nowrap w-40">เกรดที่ได้</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                  <td className="py-3 px-4 font-semibold text-[#1b3860] text-sm whitespace-nowrap">{course.code}</td>
                  <td className="py-3 px-4 text-[#1b3860] text-sm font-medium">{course.name}</td>
                  <td className="py-3 px-4 text-gray-700 text-sm text-center">{course.credits}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="relative w-32 mx-auto">
                      <select
                        value={course.grade}
                        onChange={(e) => handleGradeChange(course.id, e.target.value)}
                        className={`w-full p-2 pl-3 pr-8 border rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#1b3860] focus:border-[#1b3860] transition appearance-none cursor-pointer
                          ${course.grade === '' ? 'border-gray-300 text-gray-400' : 'border-[#1b3860] text-[#1b3860] bg-[#1b3860]/5'}
                        `}
                      >
                        <option value="" disabled>- เลือก -</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                        <option value="S">S</option>
                        <option value="U">U</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
          <button 
            disabled={!isAllFilled}
            className={`px-8 py-2.5 text-sm font-bold rounded shadow-sm transition flex items-center space-x-2
              ${isAllFilled 
                ? 'bg-[#1b3860] text-white hover:bg-[#142946] cursor-pointer' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              }
            `}
          >
            <Save className="w-4 h-4" />
            <span>บันทึกผลการเรียน (Save Grades)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
