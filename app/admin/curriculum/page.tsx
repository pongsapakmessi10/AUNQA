"use client";

import { useState } from "react";
import { BookOpen, Pencil, Copy, Plus, X } from "lucide-react";

export default function CurriculumPage() {
  const [curriculums, setCurriculums] = useState([
    {
      id: 1,
      year: "2565",
      note: "รออนุมัติหลักสูตรปรับปรุงใหม่จากสภามหาวิทยาลัย",
    },
    {
      id: 2,
      year: "2560",
      note: "เปิดสอนตามปกติ มีการปรับปรุงเนื้อหารายวิชาบางส่วน",
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newYear, setNewYear] = useState("");
  const [newNote, setNewNote] = useState("");

  const handleAddCurriculum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newYear.trim() || !newNote.trim()) return;
    
    const newItem = {
      id: curriculums.length > 0 ? Math.max(...curriculums.map(c => c.id)) + 1 : 1,
      year: newYear,
      note: newNote,
    };
    
    setCurriculums([newItem, ...curriculums]);
    setIsModalOpen(false);
    setNewYear("");
    setNewNote("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewYear("");
    setNewNote("");
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#1b3860]/10 rounded-lg">
            <BookOpen className="w-6 h-6 text-[#1b3860]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-[#1b3860]">จัดการหลักสูตร</h1>
              <span className="bg-[#1b3860]/10 text-[#1b3860] text-sm font-bold px-2.5 py-0.5 rounded-full">
                {curriculums.length} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการข้อมูลหลักสูตรที่เปิดสอนในแต่ละปีการศึกษา</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1b3860] hover:bg-[#142946] text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-sm font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มจำนวนวิชา</span>
        </button>
      </div>

      {/* Curriculum Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap">ปี</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm w-full">หมายเหตุ</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">แก้ไข</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">ทำสำเนา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {curriculums.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6">
                    <span className="inline-block bg-[#d5ae52]/10 text-[#a38234] font-bold text-xs px-3 py-1.5 rounded-full border border-[#d5ae52]/20 whitespace-nowrap">
                      {item.year}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-[#1b3860] text-sm">{item.note}</p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      className="p-2 text-gray-400 hover:text-[#1b3860] hover:bg-gray-100 rounded-md transition-colors inline-flex justify-center items-center"
                      title="แก้ไข"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      className="p-2 text-gray-400 hover:text-[#1b3860] hover:bg-gray-100 rounded-md transition-colors inline-flex justify-center items-center"
                      title="ทำสำเนา"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {curriculums.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    ไม่มีข้อมูลหลักสูตร
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1b3860]">เพิ่มจำนวนวิชา</h2>
              <button 
                onClick={closeModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddCurriculum} className="p-5 space-y-4">
              <div>
                <label htmlFor="year" className="block text-sm font-bold text-gray-700 mb-1.5">
                  ปีการศึกษา
                </label>
                <input
                  type="text"
                  id="year"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="เช่น 2567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="note" className="block text-sm font-bold text-gray-700 mb-1.5">
                  หมายเหตุ
                </label>
                <textarea
                  id="note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="กรอกหมายเหตุหรือคำอธิบาย"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm resize-none"
                  required
                ></textarea>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1b3860] hover:bg-[#142946] rounded-lg transition-colors shadow-sm"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
