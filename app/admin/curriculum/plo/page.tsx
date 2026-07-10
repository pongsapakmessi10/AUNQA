"use client";

import { useState } from "react";
import { BookOpen, Pencil, Copy, Plus, X, Layers, AlertTriangle } from "lucide-react";

export default function PLOPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      detail: "วิเคราะห์และออกแบบระบบสารสนเทศตามความต้องการทางธุรกิจได้",
    },
    {
      id: 2,
      detail: "สามารถทำงานร่วมกันเป็นทีมได้อย่างมีประสิทธิภาพ",
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDetail, setNewDetail] = useState("");

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
              <h1 className="text-2xl font-bold text-[#1b3860]">จัดการ PLO</h1>
              <span className="bg-[#1b3860]/10 text-[#1b3860] text-sm font-bold px-2.5 py-0.5 rounded-full">
                {items.length} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการข้อมูล PLO</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1b3860] hover:bg-[#142946] text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-sm font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มข้อมูล PLO</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm w-full">ข้อมูล PLO</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">Sub PLO</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">แก้ไข</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">ทำสำเนา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="text-[#1b3860] text-sm">{item.detail}</p>
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <button
                      className="px-3 py-1.5 text-xs font-medium text-[#1b3860] bg-[#1b3860]/10 hover:bg-[#1b3860]/20 rounded-md transition-colors inline-flex justify-center items-center space-x-1 whitespace-nowrap"
                      title="จัดการ Sub PLO"
                    >
                      <Layers className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">Sub PLO</span>
                    </button>
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
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    ไม่มีข้อมูล PLO
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
              <h2 className="text-xl font-bold text-[#1b3860]">เพิ่มข้อมูล PLO</h2>
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
                  รายละเอียดข้อมูล PLO
                </label>
                <textarea
                  id="detail"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  placeholder="กรอกข้อมูล PLO"
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
