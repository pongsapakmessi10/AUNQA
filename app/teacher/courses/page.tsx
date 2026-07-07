"use client";

import { BookOpen, Users, Clock, FileText, ChevronRight, Calendar, Layers, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TeacherCourses() {
  const [selectedYear, setSelectedYear] = useState("ปีการศึกษา 2566");
  const [selectedLevel, setSelectedLevel] = useState("ทุกระดับชั้นปี");
  const [selectedRole, setSelectedRole] = useState("ทั้งหมด");

  const courses = [
    { code: "BEB 240", name: "Basic Principle in Eng Calc", credits: 3, students: 45, term: "2/2566", status: "Active", level: "ชั้นปีที่ 2", role: "ผู้สอน", pendingRequests: 2 },
    { code: "BEB 341", name: "Math for Biochemical Ind", credits: 3, students: 38, term: "2/2566", status: "Active", level: "ชั้นปีที่ 3", role: "ผู้รับผิดชอบ", pendingRequests: 0 },
    { code: "TU 103", name: "Life and Sustainability", credits: 2, students: 62, term: "2/2566", status: "Active", level: "ชั้นปีที่ 1", role: "ผู้สอน", pendingRequests: 5 },
    { code: "BEB 220", name: "Biochemistry", credits: 3, students: 40, term: "1/2566", status: "Completed", level: "ชั้นปีที่ 2", role: "ผู้รับผิดชอบ", pendingRequests: 0 },
    { code: "BEB 496", name: "Cooperative Education", credits: 6, students: 20, term: "2/2566", status: "Active", level: "ชั้นปีที่ 4", role: "ผู้รับผิดชอบ", pendingRequests: 1 },
    { code: "SC 113", name: "General Biology", credits: 3, students: 120, term: "1/2565", status: "Completed", level: "ชั้นปีที่ 1", role: "ผู้สอน", pendingRequests: 0 },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchYear = selectedYear === "ทั้งหมด" || course.term.includes(selectedYear.replace("ปีการศึกษา ", ""));
    const matchLevel = selectedLevel === "ทุกระดับชั้นปี" || course.level === selectedLevel;
    const matchRole = selectedRole === "ทั้งหมด" || course.role === selectedRole;
    return matchYear && matchLevel && matchRole;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <BookOpen className="w-6 h-6 text-[#1b3860]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1b3860]">รายวิชาที่สอน (My Courses)</h1>
            <p className="text-gray-500 mt-1">จัดการข้อมูลรายวิชาและนักศึกษาที่อยู่ในความดูแล</p>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Academic Year */}
          <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus-within:ring-1 focus-within:ring-[#d5ae52] focus-within:border-[#d5ae52] transition-all">
            <Calendar className="w-4 h-4 text-[#1b3860]" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent outline-none text-[#1b3860] font-semibold text-sm cursor-pointer w-full"
            >
              <option>ปีการศึกษา 2566</option>
              <option>ปีการศึกษา 2565</option>
              <option>ทั้งหมด</option>
            </select>
          </div>

          {/* Year Level */}
          <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus-within:ring-1 focus-within:ring-[#d5ae52] focus-within:border-[#d5ae52] transition-all">
            <Layers className="w-4 h-4 text-[#1b3860]" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-transparent outline-none text-[#1b3860] font-semibold text-sm cursor-pointer w-full"
            >
              <option>ทุกระดับชั้นปี</option>
              <option>ชั้นปีที่ 1</option>
              <option>ชั้นปีที่ 2</option>
              <option>ชั้นปีที่ 3</option>
              <option>ชั้นปีที่ 4</option>
            </select>
          </div>

          {/* Instructor */}
          <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus-within:ring-1 focus-within:ring-[#d5ae52] focus-within:border-[#d5ae52] transition-all">
            <User className="w-4 h-4 text-[#1b3860]" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-transparent outline-none text-[#1b3860] font-semibold text-sm cursor-pointer w-full"
            >
              <option>ทั้งหมด</option>
              <option>ผู้สอน</option>
              <option>ผู้รับผิดชอบ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? filteredCourses.map((course, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
            {/* Card Header */}
            <div className="p-5 bg-[#1b3860] flex justify-between items-start rounded-t-xl">
              <div className="flex-1 mr-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-block px-2.5 py-1 bg-white text-[#1b3860] text-xs font-extrabold rounded-md shadow-sm">
                    {course.code}
                  </span>
                  {course.pendingRequests > 0 && (
                    <div
                      className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm animate-pulse"
                      title={`มีคำขอเข้าร่วมรายวิชาใหม่ ${course.pendingRequests} รายการ`}
                    >
                      {course.pendingRequests}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white line-clamp-1 drop-shadow-sm" title={course.name}>
                  {course.name}
                </h3>
              </div>
              {course.status === "Active" ? (
                <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-sm">
                  กำลังสอน
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-white/20 text-white text-xs font-bold rounded-full whitespace-nowrap border border-white/30">
                  สิ้นสุดแล้ว
                </span>
              )}
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">{course.students} นศ.</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">{course.credits} หน่วยกิต</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">เทอม {course.term}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">ส่งเกรดแล้ว 0%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">{course.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">{course.role}</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
              <Link
                href={`/teacher/courses/${course.code.replace(' ', '')}`}
                className="w-full flex items-center justify-between text-sm font-bold text-[#1b3860] hover:text-[#d5ae52] transition-colors"
              >
                <span>จัดการรายวิชา</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
          </div>
        )}
      </div>

    </div>
  );
}
