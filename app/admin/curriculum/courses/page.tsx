"use client";

import { useState } from "react";
import { BookOpen, Pencil, Trash2, Plus, X } from "lucide-react";

export default function CoursesPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      detail: "CS101 - Introduction to Computer Science",
    },
    {
      id: 2,
      detail: "CS201 - Data Structures and Algorithms",
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDetail, setNewDetail] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDetail.trim()) return;

    const newItem = {
      id: items.length > 0 ? Math.max(...items.map(c => c.id)) + 1 : 1,
      detail: newDetail,
    };

    setItems([newItem, ...items]);
    setIsModalOpen(false);
    setNewDetail("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewDetail("");
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setItems(items.filter(item => item.id !== deleteId));
      setDeleteId(null);
    }
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
              <h1 className="text-2xl font-bold text-[#1b3860]">จัดการรายวิชา</h1>
              <span className="bg-[#1b3860]/10 text-[#1b3860] text-sm font-bold px-2.5 py-0.5 rounded-full">
                {items.length} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการข้อมูลรายวิชา</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1b3860] hover:bg-[#142946] text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-sm font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มข้อมูลรายวิชา</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm w-full">ข้อมูลรายวิชา</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">แก้ไข</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">ลบ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="text-[#1b3860] text-sm">{item.detail}</p>
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
                      onClick={() => setDeleteId(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      title="ลบ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    ไม่มีข้อมูลรายวิชา
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
              <h2 className="text-xl font-bold text-[#1b3860]">เพิ่มข้อมูลรายวิชา</h2>
              <button
                onClick={closeModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="p-5 space-y-4">
              <div>
                <label htmlFor="detail" className="block text-sm font-bold text-gray-700 mb-1.5">
                  รายละเอียดข้อมูลรายวิชา
                </label>
                <textarea
                  id="detail"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  placeholder="กรอกชื่อ/รหัสรายวิชา"
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

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 mx-auto">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">ยืนยันการลบข้อมูลรายวิชา</h3>
              <p className="text-center text-red-600 font-medium mb-1">
                ระวัง! การลบข้อมูลนี้จะส่งผลกระทบต่อข้อมูลส่วนอื่น
              </p>
              <p className="text-center text-gray-500 text-sm mb-6">
                หากลบแล้ว ข้อมูลที่เชื่อมโยงกับรายวิชานี้ (เช่น ตารางความสัมพันธ์) จะหายไปหรือไม่สมบูรณ์ คุณแน่ใจหรือไม่ว่าต้องการดำเนินการลบทิ้ง?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                >
                  ยืนยันการลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
