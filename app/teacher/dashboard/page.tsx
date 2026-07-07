"use client";

import { Users, BookOpen, Clock, Calendar, CheckCircle, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function TeacherDashboard() {


  const days = [
    { name: "วันจันทร์", bg: "bg-white", text: "text-[#1b3860]" },
    { name: "วันอังคาร", bg: "bg-white", text: "text-[#1b3860]" },
    { name: "วันพุธ", bg: "bg-white", text: "text-[#1b3860]" },
    { name: "วันพฤหัสบดี", bg: "bg-white", text: "text-[#1b3860]" },
    { name: "วันศุกร์", bg: "bg-white", text: "text-[#1b3860]" },
    { name: "วันเสาร์", bg: "bg-white", text: "text-[#1b3860]" },
    { name: "วันอาทิตย์", bg: "bg-white", text: "text-[#1b3860]" },
  ];

  const [selectedTerm, setSelectedTerm] = useState("2/2566");

  const weeklySchedule = [
    // 2/2566
    { term: "2/2566", day: "วันจันทร์", start: "08:00", end: "11:00", course: "1600211 (A1)", room: "อาคาร 3 ห้องเรียน 321" },
    { term: "2/2566", day: "วันจันทร์", start: "11:00", end: "14:00", course: "1600101 (C1)", room: "อาคาร 32 ห้องเรียน 32405" },
    { term: "2/2566", day: "วันอังคาร", start: "08:00", end: "11:00", course: "4123212 (A1)", room: "อาคาร 11 ห้องเรียน 11407" },
    { term: "2/2566", day: "วันอังคาร", start: "13:00", end: "17:00", course: "4123214 (A1)", room: "อาคาร - ห้องเรียน โรงแรมสวนดุสิต ชั้น 5 Lab1" },
    { term: "2/2566", day: "วันพฤหัสบดี", start: "08:00", end: "12:00", course: "4122215 (A1)", room: "อาคาร 11 ห้องเรียน 11408" },
    { term: "2/2566", day: "วันศุกร์", start: "08:00", end: "12:00", course: "4122625 (A1)", room: "อาคาร 11 ห้องเรียน 11407" },
    // 1/2566
    { term: "1/2566", day: "วันจันทร์", start: "09:00", end: "12:00", course: "TU 103 Life and Sustainability", room: "Room 305" },
    { term: "1/2566", day: "วันพุธ", start: "13:00", end: "16:00", course: "BEB 240 Basic Principle in Eng Calc", room: "Room 201" },
    { term: "1/2566", day: "วันศุกร์", start: "09:00", end: "12:00", course: "BEB 341 Math for Biochemical Ind", room: "Room 201" },
  ];

  const filteredSchedule = weeklySchedule.filter(cls => cls.term === selectedTerm);

  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 to 21

  const timeToCol = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return 2 + ((h - 8) * 2) + (m >= 30 ? 1 : 0);
  };


  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">

      {/* Header Info */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1b3860]">สวัสดี, อ.ดร. อาจารย์ใจดี 👋</h1>
          <p className="text-gray-500 mt-1">ยินดีต้อนรับสู่ระบบสำหรับอาจารย์ ภาคการศึกษาที่ {selectedTerm}</p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-500">ปีการศึกษา:</span>
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="bg-transparent text-[#1b3860] font-bold text-sm outline-none cursor-pointer pr-2"
          >
            <option value="2/2566">2/2566</option>
            <option value="1/2566">1/2566</option>
            <option value="2/2565">2/2565</option>
            <option value="1/2565">1/2565</option>
          </select>
        </div>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timetable Schedule */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-3 flex flex-col w-full">
          <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 pb-3">
            <Clock className="w-5 h-5 text-[#d5ae52]" />
            <h3 className="text-lg font-bold text-[#1b3860]">ตารางเรียน/ตารางสอน (Timetable)</h3>
          </div>

          <div className="w-full overflow-x-auto pb-4">
            <div
              className="grid border-t border-l border-gray-200 bg-white"
              style={{ gridTemplateColumns: "100px repeat(28, minmax(40px, 1fr))", minWidth: "1000px" }}
            >
              {/* Header Row */}
              <div className="border-r border-b border-gray-200 bg-gray-50 flex items-center justify-center font-bold"></div>
              {hours.map((h, i) => (
                <div
                  key={i}
                  className="border-r border-b border-gray-200 flex flex-col items-center justify-center py-2 bg-gray-50 text-[10px] sm:text-xs text-[#1b3860] font-bold tracking-tighter"
                  style={{ gridColumn: `span 2` }}
                >
                  <span>{String(h).padStart(2, '0')}:00-{String(h + 1).padStart(2, '0')}:00</span>
                </div>
              ))}

              {/* Grid Body */}
              {days.map((day, dIdx) => (
                <div key={day.name} className="contents">
                  {/* Day Label Cell */}
                  <div
                    className={`border-r border-b border-gray-200 flex items-center justify-center py-3 font-bold text-xs sm:text-sm ${day.bg} ${day.text}`}
                    style={{ gridColumn: "1", gridRow: `${dIdx + 2}` }}
                  >
                    {day.name}
                  </div>

                  {/* Empty slots for the row to draw grid lines */}
                  {Array.from({ length: 28 }).map((_, cIdx) => (
                    <div
                      key={cIdx}
                      className={`border-b border-gray-100 bg-white ${cIdx % 2 === 1 ? 'border-r border-gray-200' : 'border-r border-gray-100 border-dashed'}`}
                      style={{ gridColumn: `${cIdx + 2}`, gridRow: `${dIdx + 2}` }}
                    ></div>
                  ))}

                  {/* Render Classes for this day */}
                  {filteredSchedule.filter(cls => cls.day === day.name).map((cls, cIdx) => {
                    const startCol = timeToCol(cls.start);
                    const endCol = timeToCol(cls.end);
                    return (
                      <div
                        key={cIdx}
                        className="bg-white border border-gray-200 border-l-4 border-l-[#1b3860] flex flex-col items-center justify-center p-1 sm:p-2 text-center z-10 hover:bg-gray-50 hover:border-l-[#d5ae52] cursor-pointer transition shadow-sm hover:shadow-md group rounded-r-md"
                        style={{
                          gridColumn: `${startCol} / ${endCol}`,
                          gridRow: `${dIdx + 2}`,
                          marginTop: "2px",
                          marginBottom: "2px",
                          marginLeft: "2px",
                          marginRight: "2px"
                        }}
                      >
                        <p className="font-bold text-[#1b3860] text-[10px] sm:text-xs line-clamp-1 group-hover:text-[#d5ae52] transition-colors">{cls.course}</p>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 line-clamp-1">{cls.room}</p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
