"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Target, Pencil, Trash2, X } from "lucide-react";
import { useParams } from "next/navigation";

const MOCK_CLOS = [
  { 
    id: 1, 
    code: "CLO1", 
    detailTh: "อธิบายหลักการวิทยาศาสตร์และคณิตศาสตร์",
    detailEn: "Describe the principles of Science and Mathematics.",
    bloomLevel: "Understand"
  },
  { 
    id: 2, 
    code: "CLO2", 
    detailTh: "ประยุกต์ใช้ทฤษฎีเพื่อแก้ปัญหาซับซ้อน",
    detailEn: "Apply theories to solve complex problems.",
    bloomLevel: "Apply"
  },
  { 
    id: 3, 
    code: "CLO3", 
    detailTh: "วิเคราะห์และสังเคราะห์ข้อมูลทางเทคนิค",
    detailEn: "Analyze and synthesize technical data.",
    bloomLevel: "Analyze"
  },
];

const BLOOM_LEVELS = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];

export default function CLOManagementPage() {
  const params = useParams();
  const courseId = params.courseId;

  const [clos, setClos] = useState(MOCK_CLOS);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    code: "",
    detailTh: "",
    detailEn: "",
    bloomLevel: "Understand"
  });

  const openCreateModal = () => {
    setEditId(null);
    setFormData({
      code: `CLO${clos.length > 0 ? Math.max(...clos.map(c => parseInt(c.code.replace('CLO', '')) || 0)) + 1 : 1}`,
      detailTh: "",
      detailEn: "",
      bloomLevel: "Understand"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (clo: any) => {
    setEditId(clo.id);
    setFormData({ ...clo });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      setClos(clos.map(c => c.id === editId ? { ...formData, id: editId } : c));
    } else {
      const nextId = clos.length > 0 ? Math.max(...clos.map(c => c.id)) + 1 : 1;
      setClos([...clos, { ...formData, id: nextId }]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setClos(clos.filter(c => c.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">
      {/* Back Button */}
      <Link href={`/admin/curriculum/courses/${courseId}`} className="inline-flex items-center space-x-2 text-[#1b3860] hover:text-[#d5ae52] font-semibold text-sm transition-colors mb-4">
        <ChevronLeft className="w-4 h-4" />
        <span>กลับไปหน้าจัดการ SPLO</span>
      </Link>

      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#1b3860]/10 rounded-lg">
            <Target className="w-6 h-6 text-[#1b3860]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-[#1b3860]">จัดการ CLO (Course Learning Outcomes)</h1>
              <span className="bg-[#1b3860]/10 text-[#1b3860] text-sm font-bold px-2.5 py-0.5 rounded-full">
                {clos.length} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการผลลัพธ์การเรียนรู้ระดับรายวิชา</p>
          </div>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#1b3860] hover:bg-[#142946] text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-sm font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>สร้าง CLO</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-[#1b3860]/20">
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap w-32">รหัส CLO</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm w-1/3">รายละเอียด (Description)</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm">Bloom's Taxonomy</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clos.map((clo) => (
                <tr key={clo.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6 align-top">
                    <span className="font-bold text-[#1b3860] text-base">{clo.code}</span>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <div className="space-y-1">
                      <div className="text-gray-900 font-medium text-sm">{clo.detailTh}</div>
                      <div className="text-gray-500 text-sm">{clo.detailEn}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#d5ae52]/20 text-[#a38234]">
                      {clo.bloomLevel}
                    </span>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(clo)}
                        className="p-1.5 text-gray-500 hover:text-[#1b3860] hover:bg-gray-200 rounded-md transition-colors inline-flex justify-center items-center"
                        title="แก้ไข"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(clo.id)}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="ลบ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {clos.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    ไม่มีข้อมูล CLO กด "สร้าง CLO" เพื่อเพิ่มข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1b3860]">{editId ? "แก้ไขข้อมูล CLO" : "สร้างข้อมูล CLO"}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    รหัส CLO <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b3860]/20 focus:border-[#1b3860] transition-colors"
                    placeholder="เช่น CLO1"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    ระดับการเรียนรู้ (Bloom's Taxonomy) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.bloomLevel}
                    onChange={(e) => setFormData({ ...formData, bloomLevel: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b3860]/20 focus:border-[#1b3860] transition-colors bg-white"
                  >
                    {BLOOM_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  คำอธิบายภาษาไทย <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.detailTh}
                  onChange={(e) => setFormData({ ...formData, detailTh: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b3860]/20 focus:border-[#1b3860] transition-colors resize-none"
                  placeholder="รายละเอียดเป้าหมายการเรียนรู้..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  คำอธิบายภาษาอังกฤษ <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.detailEn}
                  onChange={(e) => setFormData({ ...formData, detailEn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b3860]/20 focus:border-[#1b3860] transition-colors resize-none"
                  placeholder="Course Learning Outcome description..."
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ยืนยันการลบข้อมูล</h3>
              <p className="text-sm text-gray-500 mb-6">
                คุณแน่ใจหรือไม่ว่าต้องการลบ CLO นี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
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
