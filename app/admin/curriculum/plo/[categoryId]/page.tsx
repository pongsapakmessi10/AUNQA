"use client";

import { useState } from "react";
import { BookOpen, Pencil, Copy, Plus, X, Layers, AlertTriangle, ChevronLeft, Trash2, FileText, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SPLOPage() {
  const params = useParams();
  const selectedCategory = decodeURIComponent(params.categoryId as string);

  // Mock Categories (Read-only for name display)
  const categories = [
    { id: "Knowledge", shortId: "K", name: "Knowledge (K)" },
    { id: "Skill", shortId: "S", name: "Skill (S)" },
    { id: "Ethic", shortId: "E", name: "Ethic (E)" },
    { id: "Characteristic", shortId: "C", name: "Characteristic (C)" }
  ];

  const categoryName = categories.find(c => c.id === selectedCategory)?.name || selectedCategory;

  const [ploData, setPloData] = useState<Record<string, any[]>>({
    Knowledge: [
      { 
        id: 1, 
        code: "K1", 
        detail: "Explain SciMath", 
        detailTh: "อธิบายหลักการพื้นฐานและทฤษฎีทางวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีที่จำเป็นและเพียงพอสำหรับการประยุกต์ใช้ในรายวิชาแกน",
        detailEn: "Explain the fundamental principles and theories in science, mathematics, and technology necessary and sufficient for application in the core courses of each curriculum and/or for further graduate studies.",
        subPlos: [{ id: "s1", code: "SPLO1.1" }] 
      },
      { 
        id: 2, 
        code: "K2", 
        detail: "Integrate SciMath", 
        detailTh: "บูรณาการความรู้ทางวิทยาศาสตร์",
        detailEn: "Integrate scientific knowledge",
        subPlos: [{ id: "s2", code: "SPLO1.2" }] 
      }
    ],
    Skill: [
      { id: 3, code: "S1", detail: "PerformSciMath", subPlos: [] },
      { id: 4, code: "S2", detail: "Select SciMath", subPlos: [] },
      { id: 5, code: "S3", detail: "Use language", subPlos: [] },
      { id: 6, code: "S4", detail: "AnalyzeSyn", subPlos: [] },
      { id: 7, code: "S5", detail: "SciThink", subPlos: [] },
      { id: 8, code: "S6", detail: "Digital", subPlos: [] }
    ],
    Ethic: [
      { id: 9, code: "E1", detail: "Honesty", subPlos: [] },
      { id: 10, code: "E2", detail: "Public Mind", subPlos: [] },
      { id: 11, code: "E3", detail: "Prof.Ethics", subPlos: [] },
    ],
    Characteristic: [
      { id: 12, code: "C1", detail: "Responsibility", subPlos: [] },
      { id: 13, code: "C2", detail: "Communication", subPlos: [] },
      { id: 14, code: "C3", detail: "Team", subPlos: [] },
      { id: 15, code: "C4", detail: "Logic, solve", subPlos: [] }
    ]
  });

  // PLO Item State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Inline Edit State
  const [inlineEditingId, setInlineEditingId] = useState<number | null>(null);
  const [inlineEditCode, setInlineEditCode] = useState("");
  const [inlineEditDetail, setInlineEditDetail] = useState("");
  const [inlineEditSubCode, setInlineEditSubCode] = useState("");

  const [newCode, setNewCode] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newSubCode, setNewSubCode] = useState("");
  const [newDetailTh, setNewDetailTh] = useState("");
  const [newDetailEn, setNewDetailEn] = useState("");

  // Detail Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [editDetailTh, setEditDetailTh] = useState("");
  const [editDetailEn, setEditDetailEn] = useState("");

  // Warning Modal State
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  // Helper to update main ploData
  const updatePloItem = (updatedItem: any) => {
    const catData = ploData[selectedCategory];
    setPloData({
      ...ploData,
      [selectedCategory]: catData.map(item => item.id === updatedItem.id ? updatedItem : item)
    });
  };

  // Detail Modal Handlers
  const openDetailModal = (item: any) => {
    setActiveItem(item);
    setEditDetailTh(item.detailTh || "");
    setEditDetailEn(item.detailEn || "");
    setIsEditingDetail(false);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setActiveItem(null);
    setIsEditingDetail(false);
  };

  const saveDetailEdit = () => {
    const updatedItem = {
      ...activeItem,
      detailTh: editDetailTh,
      detailEn: editDetailEn
    };
    updatePloItem(updatedItem);
    setActiveItem(updatedItem);
    setIsEditingDetail(false);
  };

  const handleCreateClick = () => {
    setNewCode("");
    setNewDetail("");
    setNewSubCode("");
    setNewDetailTh("");
    setNewDetailEn("");
    setIsModalOpen(true);
  };

  const handleInlineEditClick = (item: any) => {
    setInlineEditingId(item.id);
    setInlineEditCode(item.code);
    setInlineEditDetail(item.detail);
    setInlineEditSubCode(item.subPlos && item.subPlos.length > 0 ? item.subPlos[0].code : "");
  };

  const cancelInlineEdit = () => {
    setInlineEditingId(null);
    setInlineEditCode("");
    setInlineEditDetail("");
    setInlineEditSubCode("");
  };

  const handleInlineSaveClick = () => {
    if (!inlineEditCode.trim() || !inlineEditDetail.trim()) return;
    setIsWarningOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDetail.trim() || !newCode.trim() || !newSubCode.trim() || !selectedCategory) return;

    const catData = ploData[selectedCategory] || [];
    const newItem = {
      id: Date.now(),
      code: newCode,
      detail: newDetail,
      detailTh: newDetailTh,
      detailEn: newDetailEn,
      subPlos: newSubCode.trim() ? [{ id: "sub_" + Date.now(), code: newSubCode.trim(), detail: "-" }] : []
    };

    setPloData({
      ...ploData,
      [selectedCategory]: [...catData, newItem]
    });
    closeModal();
  };

  const confirmEdit = () => {
    if (!selectedCategory || inlineEditingId === null) return;
    const catData = ploData[selectedCategory];

    setPloData({
      ...ploData,
      [selectedCategory]: catData.map(item => {
        if (item.id === inlineEditingId) {
          let updatedSubPlos = [...(item.subPlos || [])];
          if (inlineEditSubCode.trim()) {
            if (updatedSubPlos.length > 0) {
              updatedSubPlos[0] = { ...updatedSubPlos[0], code: inlineEditSubCode.trim() };
            } else {
              updatedSubPlos.push({ id: "sub_" + Date.now(), code: inlineEditSubCode.trim(), detail: "-" });
            }
          } else {
            if (updatedSubPlos.length > 0) {
              updatedSubPlos.shift();
            }
          }
          return { ...item, code: inlineEditCode, detail: inlineEditDetail, subPlos: updatedSubPlos };
        }
        return item;
      })
    });

    setIsWarningOpen(false);
    cancelInlineEdit();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCode("");
    setNewDetail("");
    setNewSubCode("");
    setNewDetailTh("");
    setNewDetailEn("");
  };

  const currentData = ploData[selectedCategory] || [];

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
              <h1 className="text-2xl font-bold text-[#1b3860]">จัดการ SPLO</h1>
              <span className="bg-[#1b3860]/10 text-[#1b3860] text-sm font-bold px-2.5 py-0.5 rounded-full">
                {currentData.length} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการข้อมูล SPLO สำหรับหมวด {categoryName}</p>
          </div>
        </div>
        <button
          onClick={handleCreateClick}
          className="bg-[#1b3860] hover:bg-[#142946] text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-sm font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มข้อมูล SPLO</span>
        </button>
      </div>

      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <Link
          href="/admin/curriculum/plo"
          className="flex items-center space-x-2 text-gray-500 hover:text-[#1b3860] transition-colors text-sm font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm w-fit"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>กลับไปหน้าหมวดหมู่</span>
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
            <Layers className="w-5 h-5 text-[#1b3860]" />
            <h3 className="font-bold text-[#1b3860] text-lg">
              {categoryName}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 font-bold text-[#1b3860] text-sm w-full">ข้อมูล PLO</th>
                  <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">รายละเอียด</th>
                  <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">แก้ไข</th>
                  <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">ทำสำเนา</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.map((item) => {
                  const isEditingThisRow = inlineEditingId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-4 px-6">
                        {isEditingThisRow ? (
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs font-bold text-gray-500 mb-1 block">รหัส PLO (ตัวย่อ)</label>
                              <input
                                value={inlineEditCode}
                                onChange={(e) => setInlineEditCode(e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#d5ae52] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5ae52] text-sm font-bold text-[#d5ae52]"
                                placeholder="เช่น K1"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 mb-1 block">ชื่อ / รายละเอียดสั้นๆ</label>
                              <input
                                value={inlineEditDetail}
                                onChange={(e) => setInlineEditDetail(e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#d5ae52] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5ae52] text-sm text-[#1b3860]"
                                placeholder="เช่น Explain SciMath"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 mb-1 block">รหัส Sub PLO (เริ่มต้น)</label>
                              <input
                                value={inlineEditSubCode}
                                onChange={(e) => setInlineEditSubCode(e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#d5ae52] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d5ae52] text-sm text-[#1b3860]"
                                placeholder="เช่น SPLO1.1"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start space-x-3">
                            <span className="font-bold text-[#d5ae52] whitespace-nowrap">{item.code}</span>
                            <div>
                              <p className="text-[#1b3860] text-sm font-medium">{item.detail}</p>
                              {item.subPlos && item.subPlos.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {item.subPlos.map((sub: any) => (
                                    <div key={sub.id} className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded w-fit">
                                      <span className="font-bold">{sub.code}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <button
                          onClick={() => openDetailModal(item)}
                          className="px-4 py-2 text-xs font-medium text-[#1b3860] bg-[#1b3860]/10 hover:bg-[#1b3860]/20 rounded-lg transition-colors inline-flex justify-center items-center space-x-1 whitespace-nowrap"
                          title="ดูรายละเอียด"
                        >
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span>ดูรายละเอียด</span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {isEditingThisRow ? (
                          <div className="flex flex-col space-y-2 items-center">
                            <button
                              onClick={handleInlineSaveClick}
                              className="px-4 py-1.5 bg-[#1b3860] hover:bg-[#142946] text-white text-xs font-bold rounded-md shadow-sm transition-colors w-full"
                            >
                              บันทึก
                            </button>
                            <button
                              onClick={cancelInlineEdit}
                              className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-md transition-colors w-full border border-gray-200"
                            >
                              ยกเลิก
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleInlineEditClick(item)}
                            className="p-2 text-gray-400 hover:text-[#1b3860] hover:bg-gray-100 rounded-md transition-colors inline-flex justify-center items-center"
                            title="แก้ไข"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <button
                          className="p-2 text-gray-400 hover:text-[#1b3860] hover:bg-gray-100 rounded-md transition-colors inline-flex justify-center items-center disabled:opacity-50"
                          title="ทำสำเนา"
                          disabled={isEditingThisRow}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      ไม่มีข้อมูล SPLO ในหมวดหมู่นี้
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PLO Item Modal (Create/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1b3860]">
                เพิ่มข้อมูลผลการเรียนรู้ (PLO)
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">หมวดหมู่ปัจจุบัน</span>
                <span className="text-sm font-medium text-[#1b3860]">
                  {categoryName}
                </span>
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-bold text-gray-700 mb-1.5">
                  รหัส PLO (ตัวย่อ)
                </label>
                <input
                  type="text"
                  id="code"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="เช่น K1, S2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="detail" className="block text-sm font-bold text-gray-700 mb-1.5">
                  ชื่อ / รายละเอียดสั้นๆ
                </label>
                <input
                  type="text"
                  id="detail"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  placeholder="เช่น Explain SciMath"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="detailTh" className="block text-sm font-bold text-gray-700 mb-1.5">
                  รายละเอียด (ภาษาไทย) <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>
                </label>
                <textarea
                  id="detailTh"
                  value={newDetailTh}
                  onChange={(e) => setNewDetailTh(e.target.value)}
                  placeholder="อธิบายหลักการพื้นฐาน..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm resize-none"
                ></textarea>
              </div>

              <div>
                <label htmlFor="detailEn" className="block text-sm font-bold text-gray-700 mb-1.5">
                  รายละเอียด (ภาษาอังกฤษ) <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>
                </label>
                <textarea
                  id="detailEn"
                  value={newDetailEn}
                  onChange={(e) => setNewDetailEn(e.target.value)}
                  placeholder="Explain the fundamental principles..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm resize-none"
                ></textarea>
              </div>

              <div>
                <label htmlFor="subCode" className="block text-sm font-bold text-gray-700 mb-1.5">
                  รหัส Sub PLO (เริ่มต้น)
                </label>
                <input
                  type="text"
                  id="subCode"
                  value={newSubCode}
                  onChange={(e) => setNewSubCode(e.target.value)}
                  placeholder="เช่น SPLO1.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                  required
                />
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

      {/* Warning Impact Modal */}
      {isWarningOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300 border border-orange-100">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">ยืนยันการแก้ไข SPLO?</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                SPLO ข้อนี้ถูกเชื่อมโยงกับ <span className="font-bold text-gray-700">YLO จำนวน 4 ข้อ</span> และ <span className="font-bold text-gray-700">รายวิชา จำนวน 12 วิชา</span> การแก้ไขเนื้อหาอาจส่งผลต่อความสอดคล้องของหลักสูตรโดยรวม
              </p>

              <div className="pt-6 flex justify-center space-x-3">
                <button
                  onClick={() => setIsWarningOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ยกเลิกการแก้ไข
                </button>
                <button
                  onClick={confirmEdit}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors shadow-sm shadow-orange-500/30"
                >
                  ยืนยันบันทึกข้อมูล
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && activeItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#d5ae52]/20 rounded-lg">
                  <FileText className="w-5 h-5 text-[#d5ae52]" />
                </div>
                <h2 className="text-xl font-bold text-[#1b3860]">
                  รายละเอียดคำอธิบาย
                </h2>
              </div>
              <button 
                onClick={closeDetailModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="bg-[#1b3860]/5 p-4 rounded-xl border border-[#1b3860]/10 flex items-center space-x-3">
                <span className="font-bold text-[#d5ae52] text-lg">{activeItem.code}</span>
                <span className="text-[#1b3860] font-medium">{activeItem.detail}</span>
              </div>

              {/* THAI Field */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">รายละเอียด (ภาษาไทย)</label>
                {isEditingDetail ? (
                  <textarea 
                    value={editDetailTh}
                    onChange={(e) => setEditDetailTh(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#d5ae52] rounded-lg focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm text-gray-800 leading-relaxed"
                  />
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-800 leading-relaxed min-h-[4rem]">
                    {activeItem.detailTh || "-"}
                  </div>
                )}
              </div>

              {/* EN Field */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">รายละเอียด (ภาษาอังกฤษ)</label>
                {isEditingDetail ? (
                  <textarea 
                    value={editDetailEn}
                    onChange={(e) => setEditDetailEn(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#d5ae52] rounded-lg focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm text-gray-800 leading-relaxed"
                  />
                ) : (
                  <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-50 text-sm text-gray-800 leading-relaxed min-h-[4rem]">
                    {activeItem.detailEn || "-"}
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
              {isEditingDetail ? (
                <>
                  <button
                    onClick={() => setIsEditingDetail(false)}
                    className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={saveDetailEdit}
                    className="px-5 py-2 text-sm font-bold text-white bg-[#1b3860] hover:bg-[#142946] rounded-lg transition-colors shadow-sm flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>บันทึกการแก้ไข</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditingDetail(true)}
                  className="px-5 py-2 text-sm font-bold text-[#1b3860] bg-white border border-[#1b3860] hover:bg-[#1b3860]/5 rounded-lg transition-colors shadow-sm flex items-center space-x-2"
                >
                  <Pencil className="w-4 h-4" />
                  <span>แก้ไขข้อมูล</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
