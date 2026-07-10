"use client";

import { useState } from "react";
import { BookOpen, Plus, X, Layers, ChevronRight, Pencil, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function PLOPage() {
  const [categories, setCategories] = useState([
    { id: "Knowledge", shortId: "K", name: "Knowledge (K)", desc: "หมวดความรู้", count: 2 },
    { id: "Skill", shortId: "S", name: "Skill (S)", desc: "หมวดทักษะ", count: 6 },
    { id: "Ethic", shortId: "E", name: "Ethic (E)", desc: "หมวดจริยธรรม", count: 4 },
    { id: "Characteristic", shortId: "C", name: "Characteristic (C)", desc: "หมวดคุณลักษณะบุคคล", count: 3 }
  ]);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const [newCatId, setNewCatId] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatId.trim() || !newCatName.trim()) return;

    if (isEditMode && editingCategoryId) {
      setCategories(categories.map(cat =>
        cat.id === editingCategoryId
          ? { ...cat, shortId: newCatId.trim().toUpperCase(), name: newCatName.trim(), desc: newCatDesc.trim() }
          : cat
      ));
    } else {
      setCategories([...categories, {
        id: newCatName.trim(), // URL will use the full name
        shortId: newCatId.trim().toUpperCase(),
        name: newCatName.trim(),
        desc: newCatDesc.trim(),
        count: 0
      }]);
    }
    closeCategoryModal();
  };


  const openEditModal = (cat: any) => {
    setIsEditMode(true);
    setEditingCategoryId(cat.id);
    setNewCatId(cat.shortId);
    setNewCatName(cat.name);
    setNewCatDesc(cat.desc);
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setNewCatId("");
    setNewCatName("");
    setNewCatDesc("");
  };

  const confirmDelete = () => {
    if (deletingCategoryId) {
      setCategories(categories.filter(cat => cat.id !== deletingCategoryId));
    }
    setIsDeleteModalOpen(false);
    setDeletingCategoryId(null);
  };

  const totalPlos = categories.reduce((sum, cat) => sum + cat.count, 0);

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
                {totalPlos} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการข้อมูลผลการเรียนรู้ระดับหลักสูตร</p>
          </div>
        </div>
      </div>

      {/* Categories Grid View (Uniform / Corporate Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
          >
            {/* Card Header */}
            <div className="p-6 bg-gradient-to-r from-[#1b3860] to-[#142946] flex justify-between items-start relative overflow-hidden">
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>

              <div className="flex-1 mr-3 relative z-10">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-white text-[#1b3860] text-sm font-extrabold rounded-md shadow-sm">
                    {cat.shortId}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide drop-shadow-sm" title={cat.name}>
                  {cat.name}
                </h3>
              </div>
              <div className="relative z-10 flex flex-col items-end">
                <span className="px-3 py-1 bg-[#1b3860]/50 text-white text-xs font-bold rounded-full whitespace-nowrap border border-white/20 shadow-inner">
                  {cat.count} รายการ
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col border-t-4 border-[#d5ae52]">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">รายละเอียดหมวดหมู่</p>
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 font-medium">{cat.desc || "ไม่มีข้อมูลคำอธิบายเพิ่มเติม"}</p>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
              <Link
                href={`/admin/curriculum/plo/${cat.id}`}
                className="group/link flex items-center space-x-1.5 text-sm font-bold text-[#1b3860] hover:text-[#d5ae52] transition-colors"
              >
                <span>จัดการข้อมูล SPLO</span>
                <ChevronRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Category Creation Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1b3860]">
                {isEditMode ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}
              </h2>
              <button
                onClick={closeCategoryModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-5 space-y-4">
              <div>
                <label htmlFor="catId" className="block text-sm font-bold text-gray-700 mb-1.5">
                  รหัสหมวดหมู่ย่อ (ตัวอักษร)
                </label>
                <input
                  type="text"
                  id="catId"
                  value={newCatId}
                  onChange={(e) => setNewCatId(e.target.value)}
                  placeholder="เช่น IT, MGT"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b3860] focus:border-[#1b3860] outline-none transition-all text-sm uppercase"
                  required
                />
              </div>

              <div>
                <label htmlFor="catName" className="block text-sm font-bold text-gray-700 mb-1.5">
                  ชื่อหมวดหมู่ (เต็ม)
                </label>
                <input
                  type="text"
                  id="catName"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="เช่น IT Skills"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b3860] focus:border-[#1b3860] outline-none transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="catDesc" className="block text-sm font-bold text-gray-700 mb-1.5">
                  คำอธิบาย (ถ้ามี)
                </label>
                <textarea
                  id="catDesc"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="คำอธิบายรายละเอียดหมวดหมู่"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b3860] focus:border-[#1b3860] outline-none transition-all text-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeCategoryModal}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1b3860] hover:bg-[#142946] rounded-lg transition-colors shadow-sm"
                >
                  {isEditMode ? "บันทึกข้อมูล" : "สร้างหมวดหมู่"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200 border border-red-100">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">ยืนยันการลบหมวดหมู่?</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                การลบหมวดหมู่นี้จะทำให้ข้อมูล SPLO ทั้งหมดที่อยู่ภายใต้หมวดหมู่นี้ถูกลบไปด้วย คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?
              </p>

              <div className="pt-6 flex justify-center space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-sm shadow-red-500/30"
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
