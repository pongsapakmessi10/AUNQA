"use client";

import { useState } from "react";
import { Plus, Minus, BookOpen, CheckCircle, Search, ClipboardList, X } from "lucide-react";

export default function AddCoursePage() {
  // Mock Data: Available Courses
  const allCourses = [
    { id: 1, code: "BEB 300", name: "Instrumental Analysis", credits: 4, section: "A1", instructor: "Dr. Somchai", schedule: "จ. 09:30-12:30", limit: 40, enrolled: 35 },
    { id: 2, code: "BEB 341", name: "Mathematics for Biochemical Industry", credits: 2, section: "A2", instructor: "Dr. Somsri", schedule: "อ. 13:30-15:30", limit: 40, enrolled: 40 },
    { id: 3, code: "BEB 342", name: "Chemical and Biochemical Reactor Design", credits: 3, section: "B1", instructor: "Dr. Mana", schedule: "พ. 09:30-12:30", limit: 30, enrolled: 12 },
    { id: 4, code: "BEB 360", name: "Introduction to Biofuel and Biochemical Industry", credits: 2, section: "B2", instructor: "Dr. Piti", schedule: "พฤ. 09:30-11:30", limit: 50, enrolled: 25 },
    { id: 5, code: "BEBxxx", name: "Required course (CWIE or Research)", credits: 1, section: "C1", instructor: "Aj. Chujai", schedule: "ศ. 13:30-16:30", limit: 100, enrolled: 98 },
    { id: 6, code: "BEB 396", name: "Pre-Cooperative Education (Track 1)", credits: 1, section: "A1", instructor: "Aj. John", schedule: "จ. 13:30-16:30", limit: 30, enrolled: 15 },
    { id: 7, code: "BEB 386", name: "Research Methodology (Track 2)", credits: 1, section: "A2", instructor: "Dr. Wasan", schedule: "อ. 09:30-12:30", limit: 30, enrolled: 5 },
    { id: 8, code: "BEBxxx", name: "Elective course", credits: 3, section: "B1", instructor: "Dr. Nisa", schedule: "พ. 13:30-16:30", limit: 30, enrolled: 20 },
    { id: 9, code: "TU106", name: "Creativity and Communication", credits: 3, section: "C2", instructor: "Aj. Suda", schedule: "พฤ. 13:30-16:30", limit: 100, enrolled: 50 },
  ];

  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleCourse = (course: any) => {
    const isSelected = selectedCourses.some((c) => c.id === course.id);
    if (isSelected) {
      setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRemoveCourse = (id: number) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
  };

  const filteredCourses = allCourses.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6 bg-gray-50/50 min-h-screen">
      {/* Formal Header */}
      <div className="bg-white p-5 md:px-8 md:py-6 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#d5ae52] mb-1">คณะวิทยาศาสตร์และเทคโนโลยี</p>
          <h1 className="text-2xl font-bold text-[#1b3860]">ลงทะเบียนเรียน (Course Enrollment)</h1>
          <p className="text-sm text-gray-500 mt-1">ระบบลงทะเบียนเรียนสำหรับภาคการศึกษาปัจจุบัน</p>
        </div>
      </div>

      <div className="flex flex-col space-y-8">

        {/* Top Section: Search & Available Courses */}
        <div className="w-full">
          <section className="bg-white p-5 md:p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 pb-3">
              <BookOpen className="w-5 h-5 text-[#d5ae52]" />
              <h3 className="text-lg font-bold text-[#1b3860]">รายวิชาที่เปิดสอน (Available Courses)</h3>
            </div>

            {/* Formal Filter Bar */}
            <div className="bg-gray-50 px-6 py-4 rounded border border-gray-200 mb-6 flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1 max-w-sm relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">ค้นหารหัส หรือ ชื่อวิชา</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#1b3860] absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ระบุคำค้นหา..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1b3860] focus:border-[#1b3860] w-full bg-white text-[#1b3860] font-medium"
                  />
                </div>
              </div>
              <button className="px-6 py-2 bg-[#1b3860] text-white font-bold text-sm rounded transition hover:bg-[#142946] shadow-sm">
                ค้นหา
              </button>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden space-y-3 mt-4">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  const isSelected = selectedCourses.some((c) => c.id === course.id);
                  return (
                    <div key={course.id} className={`border rounded-lg p-4 shadow-sm flex flex-col relative overflow-hidden transition-all ${isSelected ? 'bg-blue-50 border-[#1b3860]' : 'bg-white border-gray-200'}`}>
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isSelected ? 'bg-[#1b3860]' : 'bg-gray-300'}`}></div>
                      <div className="flex justify-between items-start mb-2 pl-2">
                        <div className="flex flex-col pr-8">
                          <span className="font-bold text-[#1b3860] text-sm">{course.code}</span>
                          <span className="font-medium text-[#1b3860] text-sm leading-snug mt-1">{course.name}</span>
                        </div>
                        <div className="absolute right-4 top-4">
                          <label className="relative inline-flex items-center justify-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={isSelected} onChange={() => handleToggleCourse(course)} />
                            <div className={`w-6 h-6 border-2 rounded transition flex items-center justify-center ${isSelected ? 'bg-[#1b3860] border-[#1b3860]' : 'border-gray-300 bg-gray-50 peer-focus:ring-2 peer-focus:ring-[#1b3860]'}`}>
                              {isSelected && (
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="pl-2 mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1.5 text-xs text-gray-600">
                        <div><span className="font-semibold text-gray-500">อาจารย์ผู้สอน:</span> {course.instructor}</div>
                        <div className="flex justify-between">
                          <span><span className="font-semibold text-gray-500">หน่วยกิต:</span> {course.credits}</span>
                          <span><span className="font-semibold text-gray-500">กลุ่มเรียน:</span> {course.section}</span>
                        </div>
                        <div><span className="font-semibold text-gray-500">เวลาเรียน:</span> {course.schedule}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">ไม่มีข้อมูลรายวิชาที่ค้นหา</div>
              )}
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#1b3860]">
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm whitespace-nowrap w-32">รหัสวิชา</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm w-full">ชื่อวิชา / อาจารย์ผู้สอน</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm whitespace-nowrap text-center">หน่วยกิต</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm whitespace-nowrap text-center">กลุ่มเรียน</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm whitespace-nowrap">เวลาเรียน</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm text-center w-16">เลือก</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => {
                    const isSelected = selectedCourses.some((c) => c.id === course.id);

                    return (
                      <tr key={course.id} className={`border-b border-gray-100 transition ${isSelected ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}>
                        <td className="py-3 px-4 font-semibold text-[#1b3860] text-sm whitespace-nowrap">{course.code}</td>
                        <td className="py-3 px-4 text-[#1b3860] font-medium text-sm">
                          {course.name}
                          <div className="text-xs text-gray-500 font-normal mt-0.5">{course.instructor}</div>
                        </td>
                        <td className="py-3 px-4 text-center text-gray-700 text-sm">{course.credits}</td>
                        <td className="py-3 px-4 text-center text-gray-700 text-sm">{course.section}</td>
                        <td className="py-3 px-4 text-gray-700 text-sm whitespace-nowrap">{course.schedule}</td>
                        <td className="py-3 px-4 text-center">
                          <label className="relative inline-flex items-center justify-center cursor-pointer w-full">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={isSelected}
                              onChange={() => handleToggleCourse(course)}
                            />
                            <div className={`w-5 h-5 border-2 rounded transition flex items-center justify-center ${isSelected ? 'bg-[#1b3860] border-[#1b3860]' : 'border-gray-300 bg-white peer-focus:ring-2 peer-focus:ring-[#1b3860]'}`}>
                              {isSelected && (
                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredCourses.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500 text-sm">
                        ไม่มีข้อมูลรายวิชาที่ค้นหา
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Bottom Section: Selected Courses Summary */}
        <div className="w-full">
          <section className="bg-white p-5 md:p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-[#d5ae52]" />
                <h3 className="text-lg font-bold text-[#1b3860]">สรุปรายวิชาที่เลือก (Selected Courses)</h3>
              </div>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden space-y-3 mt-4">
              {selectedCourses.length > 0 ? (
                selectedCourses.map((course) => (
                  <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#d5ae52]"></div>
                    <div className="flex justify-between items-start mb-2 pl-2">
                      <div className="flex flex-col pr-2">
                        <span className="font-bold text-[#1b3860] text-sm">{course.code}</span>
                        <span className="font-medium text-[#1b3860] text-sm leading-snug mt-1">{course.name}</span>
                      </div>
                    </div>
                    <div className="pl-2 mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                      <div className="flex space-x-4">
                        <span><span className="font-semibold text-gray-500">หน่วยกิต:</span> {course.credits}</span>
                        <span><span className="font-semibold text-gray-500">กลุ่ม:</span> {course.section}</span>
                      </div>
                      <button onClick={() => handleRemoveCourse(course.id)} className="text-red-500 font-bold hover:text-red-700 transition px-2.5 py-1 bg-red-50 rounded shadow-sm">
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm flex flex-col items-center">
                  <CheckCircle className="w-8 h-8 mb-2 opacity-20" />
                  <p>ยังไม่มีรายวิชาที่เลือกลงทะเบียน</p>
                </div>
              )}
              
              {selectedCourses.length > 0 && (
                <div className="mt-4 bg-[#1b3860] text-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                  <span className="text-sm font-medium text-white/80">รวมจำนวนหน่วยกิต</span>
                  <span className="text-xl font-bold text-[#d5ae52]">{totalCredits}</span>
                </div>
              )}
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#1b3860]">
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm whitespace-nowrap w-32">รหัสวิชา</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm w-full">ชื่อวิชา</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm text-center whitespace-nowrap w-24">หน่วยกิต</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm text-center whitespace-nowrap w-24">กลุ่มเรียน</th>
                    <th className="py-3 px-4 text-[#1b3860] font-bold text-sm text-center whitespace-nowrap w-24">ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCourses.length > 0 ? (
                    selectedCourses.map((course) => (
                      <tr key={course.id} className="border-b border-gray-100 transition hover:bg-gray-50/50">
                        <td className="py-3 px-4 font-semibold text-[#1b3860] text-sm whitespace-nowrap">{course.code}</td>
                        <td className="py-3 px-4 text-gray-700 text-sm font-medium">{course.name}</td>
                        <td className="py-3 px-4 text-gray-700 text-sm text-center">{course.credits}</td>
                        <td className="py-3 px-4 text-gray-700 text-sm text-center">{course.section}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className="cursor-pointer text-red-500 hover:text-red-700 font-bold text-xs  hover:decoration-red-500 transition"
                          >
                            ยกเลิก
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 text-sm">
                        <div className="flex flex-col items-center justify-center">
                          <CheckCircle className="w-8 h-8 mb-2 opacity-20" />
                          <p>ยังไม่มีรายวิชาที่เลือกลงทะเบียน</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
                {selectedCourses.length > 0 && (
                  <tfoot>
                    <tr className="border-t-2 border-[#1b3860] bg-gray-50/50">
                      <td colSpan={2} className="py-3 px-4 text-right font-bold text-[#1b3860] text-sm uppercase tracking-wide">
                        รวมจำนวนหน่วยกิต (Total Credits)
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-[#1b3860] text-base">
                        {totalCredits}
                      </td>
                      <td colSpan={2} className="py-3 px-4">
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
            
            {selectedCourses.length > 0 && (
              <div className="mt-6 flex justify-end border-t border-gray-100 pt-6">
                <button 
                  className="px-8 py-2.5 bg-[#1b3860] text-white text-sm font-bold rounded shadow-sm hover:bg-[#142946] transition cursor-pointer flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>ยืนยันการลงทะเบียน (Confirm Registration)</span>
                </button>
              </div>
            )}
          </section>
        </div>

      </div>
    </div>
  );
}
