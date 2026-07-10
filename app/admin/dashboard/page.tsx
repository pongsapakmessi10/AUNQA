"use client";

import { Users, BookOpen, Settings, ShieldCheck, Database, Calendar, Target, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [selectedTerm, setSelectedTerm] = useState("2/2566");

  const stats = [
    { name: "จำนวนนักศึกษาทั้งหมด", value: "2,543", icon: Users, color: "text-[#1b3860]", bg: "bg-[#1b3860]/10" },
    { name: "จำนวนอาจารย์ทั้งหมด", value: "142", icon: ShieldCheck, color: "text-[#d5ae52]", bg: "bg-[#d5ae52]/10" },
    { name: "รายวิชาที่เปิดสอน", value: "324", icon: BookOpen, color: "text-green-600", bg: "bg-green-100" },
    { name: "ฐานข้อมูลระบบ", value: "ปกติ", icon: Database, color: "text-blue-600", bg: "bg-blue-100" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">

      {/* Header Info */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1b3860]">สวัสดี, ผู้ดูแลระบบ 👋</h1>
          <p className="text-gray-500 mt-1">ยินดีต้อนรับสู่ระบบสำหรับผู้ดูแล ภาคการศึกษาที่ {selectedTerm}</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
              <div className={`p-4 rounded-full ${stat.bg}`}>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                <p className="text-2xl font-bold text-[#1b3860]">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities Placeholder */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full">
          <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 pb-3">
            <Settings className="w-5 h-5 text-[#d5ae52]" />
            <h3 className="text-lg font-bold text-[#1b3860]">กิจกรรมล่าสุดในระบบ (System Logs)</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-bold text-[#1b3860]">เพิ่มผู้ใช้งานใหม่</p>
                <p className="text-xs text-gray-500">Admin เพิ่มผู้ใช้งาน 'teacher_01'</p>
              </div>
              <span className="text-xs text-gray-400">10 นาทีที่แล้ว</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-bold text-[#1b3860]">สำรองข้อมูล</p>
                <p className="text-xs text-gray-500">ระบบทำการสำรองข้อมูลอัตโนมัติ</p>
              </div>
              <span className="text-xs text-gray-400">2 ชั่วโมงที่แล้ว</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-bold text-[#1b3860]">อัพเดทรายวิชา</p>
                <p className="text-xs text-gray-500">มีการนำเข้าข้อมูลรายวิชาใหม่ 50 รายการ</p>
              </div>
              <span className="text-xs text-gray-400">เมื่อวานนี้</span>
            </div>
          </div>
        </div>

        {/* System Status Placeholder */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full">
          <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 pb-3">
            <Database className="w-5 h-5 text-[#d5ae52]" />
            <h3 className="text-lg font-bold text-[#1b3860]">สถานะระบบ (System Status)</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">CPU Usage</span>
                <span className="text-sm font-medium text-gray-700">24%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#1b3860] h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Memory Usage</span>
                <span className="text-sm font-medium text-gray-700">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#d5ae52] h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Storage Capacity</span>
                <span className="text-sm font-medium text-gray-700">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PLO Progress */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full">
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 pb-3">
          <Target className="w-5 h-5 text-[#d5ae52]" />
          <h3 className="text-lg font-bold text-[#1b3860]">ความคืบหน้าข้อมูล PLO (นักศึกษาทั้งหมด)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-green-50 border border-green-100">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">บรรลุเป้าหมาย</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-green-700">1,245</p>
                <p className="text-sm text-green-600">คน</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">เป็นไปตามแผน</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-blue-700">982</p>
                <p className="text-sm text-blue-600">คน</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-lg bg-red-50 border border-red-100">
            <div className="p-3 bg-red-100 text-red-600 rounded-full">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-red-700 font-medium">ไม่เป็นไปตามแผน</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-red-700">316</p>
                <p className="text-sm text-red-600">คน</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Summary */}
        <div className="mt-6">
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span className="text-green-700">49% บรรลุ</span>
            <span className="text-blue-700">38% เป็นไปตามแผน</span>
            <span className="text-red-700">13% ไม่ตามแผน</span>
          </div>
          <div className="w-full h-3 flex rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: '49%' }}></div>
            <div className="bg-blue-400 h-full" style={{ width: '38%' }}></div>
            <div className="bg-red-400 h-full" style={{ width: '13%' }}></div>
          </div>
        </div>

        {/* Year Level Breakdown */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h4 className="text-sm font-bold text-[#1b3860] mb-4">ข้อมูลแยกตามชั้นปี</h4>
          <div className="space-y-4">
            {[
              { year: "ชั้นปีที่ 1", total: 800, achieved: 300, onTrack: 400, offTrack: 100, achievedPct: 37.5, onTrackPct: 50, offTrackPct: 12.5 },
              { year: "ชั้นปีที่ 2", total: 700, achieved: 400, onTrack: 200, offTrack: 100, achievedPct: 57.1, onTrackPct: 28.6, offTrackPct: 14.3 },
              { year: "ชั้นปีที่ 3", total: 600, achieved: 300, onTrack: 250, offTrack: 50, achievedPct: 50, onTrackPct: 41.7, offTrackPct: 8.3 },
              { year: "ชั้นปีที่ 4", total: 443, achieved: 245, onTrack: 132, offTrack: 66, achievedPct: 55.3, onTrackPct: 29.8, offTrackPct: 14.9 },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="w-24 text-sm font-bold text-gray-700">{item.year}</div>
                <div className="flex-1">
                  <div className="w-full h-2 flex rounded-full overflow-hidden bg-gray-100">
                    <div className="bg-green-500 h-full" title={`บรรลุเป้าหมาย: ${item.achieved}`} style={{ width: `${item.achievedPct}%` }}></div>
                    <div className="bg-blue-400 h-full" title={`เป็นไปตามแผน: ${item.onTrack}`} style={{ width: `${item.onTrackPct}%` }}></div>
                    <div className="bg-red-400 h-full" title={`ไม่เป็นไปตามแผน: ${item.offTrack}`} style={{ width: `${item.offTrackPct}%` }}></div>
                  </div>
                </div>
                <div className="flex space-x-3 text-xs w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-green-600 font-medium" title="บรรลุเป้าหมาย">{item.achieved}</span>
                  <span className="text-blue-600 font-medium" title="เป็นไปตามแผน">{item.onTrack}</span>
                  <span className="text-red-600 font-medium" title="ไม่เป็นไปตามแผน">{item.offTrack}</span>
                  <span className="text-gray-400" title="นักศึกษาทั้งหมดในชั้นปี">/ {item.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
