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
      { id: 3, code: "S1", detail: "PerformSciMath", subPlos: [{ id: "s2_1", code: "SPLO2.1" }] },
      { id: 4, code: "S2", detail: "Select SciMath", subPlos: [{ id: "s2_2", code: "SPLO2.2" }] },
      { id: 5, code: "S3", detail: "Use language", subPlos: [{ id: "s2_3", code: "SPLO2.3" }] },
      { id: 6, code: "S4", detail: "AnalyzeSyn", subPlos: [{ id: "s2_4", code: "SPLO2.4" }] },
      { id: 7, code: "S5", detail: "SciThink", subPlos: [{ id: "s2_5", code: "SPLO2.5" }] },
      { id: 8, code: "S6", detail: "Digital", subPlos: [{ id: "s2_6", code: "SPLO2.6" }] }
    ],
    Ethic: [
      { id: 9, code: "E1", detail: "Honesty", subPlos: [{ id: "s3_1", code: "SPLO3.1" }] },
      { id: 10, code: "E2", detail: "Public Mind", subPlos: [{ id: "s3_2", code: "SPLO3.2" }] },
      { id: 11, code: "E3", detail: "Prof.Ethics", subPlos: [{ id: "s3_3", code: "SPLO3.3" }] },
    ],
    Characteristic: [
      { id: 12, code: "C1", detail: "Responsibility", subPlos: [{ id: "s4_1", code: "SPLO4.1" }] },
      { id: 13, code: "C2", detail: "Communication", subPlos: [{ id: "s4_2", code: "SPLO4.2" }] },
      { id: 14, code: "C3", detail: "Team", subPlos: [{ id: "s4_3", code: "SPLO4.3" }] },
      { id: 15, code: "C4", detail: "Logic, solve", subPlos: [{ id: "s4_4", code: "SPLO4.4" }] }
    ]
  });

  // PLO Item State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  // Inline Edit State
  const [inlineEditingId, setInlineEditingId] = useState<number | null>(null);
  const [inlineEditCode, setInlineEditCode] = useState("");
  const [inlineEditDetail, setInlineEditDetail] = useState("");
  const [inlineEditSubCode, setInlineEditSubCode] = useState("");

  // Modal State
  const [newCode, setNewCode] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newSubCode, setNewSubCode] = useState("");
  const [newDetailTh, setNewDetailTh] = useState("");
  const [newDetailEn, setNewDetailEn] = useState("");

  const getCategoryNumber = (catId: string) => {
    switch (catId) {
      case "Knowledge": return "1";
      case "Skill": return "2";
      case "Ethic": return "3";
      case "Characteristic": return "4";
      default: return "1";
    }
  };

  const getCodePrefix = (catId: string) => {
    switch (catId) {
      case "Knowledge": return "K";
      case "Skill": return "S";
      case "Ethic": return "E";
      case "Characteristic": return "C";
      default: return "";
    }
  };

  const getShortCode = (catId: string, subCode: string) => {
    if (!subCode) return "-";
    const parts = subCode.split(".");
    const suffix = parts.length > 1 ? parts[1] : subCode;
    return `${getCodePrefix(catId)}${suffix}`;
  };

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

  const confirmDelete = () => {
    if (deleteId !== null) {
      const catData = ploData[selectedCategory];
      setPloData({
        ...ploData,
        [selectedCategory]: catData.filter(item => item.id !== deleteId)
      });
      setDeleteId(null);
    }
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
    setInlineEditDetail(item.detail);

    let subCodeVal = "";
    if (item.subPlos && item.subPlos.length > 0) {
      const fullCode = item.subPlos[0].code;
      const match = fullCode.match(/(\d+\.\d+)$/);
      if (match) subCodeVal = match[1];
      else subCodeVal = fullCode.replace(/SPLO\s*/, "");
    }
    setInlineEditSubCode(subCodeVal);
  };

  const cancelInlineEdit = () => {
    setInlineEditingId(null);
    setInlineEditCode("");
    setInlineEditDetail("");
    setInlineEditSubCode("");
  };

  const handleInlineSaveClick = () => {
    if (!inlineEditDetail.trim()) return;
    setIsWarningOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDetail.trim() || !newSubCode.trim() || !selectedCategory) return;

    const catData = ploData[selectedCategory] || [];
    const newItem = {
      id: Date.now(),
      code: getShortCode(selectedCategory, newSubCode.trim()),
      detail: newDetail,
      detailTh: newDetailTh,
      detailEn: newDetailEn,
      subPlos: newSubCode.trim() ? [{ id: "sub_" + Date.now(), code: `SPLO${newSubCode.trim()}`, detail: "-" }] : []
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
            const fullCode = `SPLO${inlineEditSubCode.trim()}`;
            if (updatedSubPlos.length > 0) {
              updatedSubPlos[0] = { ...updatedSubPlos[0], code: fullCode };
            } else {
              updatedSubPlos.push({ id: "sub_" + Date.now(), code: fullCode, detail: "-" });
            }
          } else {
            if (updatedSubPlos.length > 0) {
              updatedSubPlos.shift();
            }
          }

          return { ...item, code: getShortCode(selectedCategory, inlineEditSubCode.trim()), detail: inlineEditDetail, subPlos: updatedSubPlos };
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

  const currentData = (ploData[selectedCategory] || []).slice().sort((a, b) => {
    const numA = parseInt(a.code.match(/\d+/)?.[0] || "0", 10);
    const numB = parseInt(b.code.match(/\d+/)?.[0] || "0", 10);
    return numA - numB;
  });

  const isOptionDisabled = (val: string, currentEditingId?: number | null) => {
    const shortCode = getShortCode(selectedCategory, val);
    return currentData.some(item => item.code === shortCode && item.id !== currentEditingId);
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
                  <th className="py-4 px-6 font-bold text-[#1b3860] text-sm w-full">ข้อมูล SPLO</th>
                  <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">รายละเอียด</th>
                  <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">แก้ไข</th>
                  <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">ลบ</th>
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
                              <label className="text-xs font-bold text-gray-500 mb-1 block">ตัวย่อ SPLO</label>
                              <div className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-gray-500 text-sm font-medium">
                                {getShortCode(selectedCategory, inlineEditSubCode)}
                              </div>
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
                              <label className="text-xs font-bold text-gray-500 mb-1 block">รหัส SPLO</label>
                              <div className="flex border border-[#d5ae52] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#d5ae52] transition-all">
                                <span className="bg-gray-100 px-2 py-1.5 text-xs font-bold text-gray-600 border-r border-gray-300 select-none flex items-center">
                                  SPLO
                                </span>
                                <select
                                  value={inlineEditSubCode}
                                  onChange={(e) => setInlineEditSubCode(e.target.value)}
                                  className="w-full px-2 py-1.5 focus:outline-none text-sm text-[#1b3860] bg-transparent cursor-pointer"
                                >
                                  <option value="" disabled>เลือกเลข</option>
                                  {Array.from({ length: 10 }, (_, i) => {
                                    const val = `${getCategoryNumber(selectedCategory)}.${i + 1}`;
                                    const disabled = isOptionDisabled(val, inlineEditingId);
                                    return <option key={val} value={val} disabled={disabled}>{val} {disabled ? "(ถูกใช้แล้ว)" : ""}</option>;
                                  })}
                                </select>
                              </div>
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
                            onClick={() => setDeleteId(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                            title="ลบ"
                            disabled={isEditingThisRow}
                          >
                            <Trash2 className="w-4 h-4" />
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
                เพิ่มข้อมูลผลการเรียนรู้ (SPLO)
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
                <label htmlFor="subCode" className="block text-sm font-bold text-gray-700 mb-1.5">
                  รหัส SPLO
                </label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#d5ae52] focus-within:border-[#d5ae52] transition-all">
                  <span className="bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600 border-r border-gray-300 select-none flex items-center">
                    SPLO
                  </span>
                  <select
                    id="subCode"
                    value={newSubCode}
                    onChange={(e) => setNewSubCode(e.target.value)}
                    className="w-full px-4 py-2 outline-none text-sm bg-transparent cursor-pointer"
                    required
                  >
                    <option value="" disabled>เลือกตัวเลข</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const val = `${getCategoryNumber(selectedCategory)}.${i + 1}`;
                      const disabled = isOptionDisabled(val, null);
                      return <option key={val} value={val} disabled={disabled}>{val} {disabled ? "(ถูกใช้แล้ว)" : ""}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  ตัวย่อ SPLO
                </label>
                <div className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm font-medium">
                  {getShortCode(selectedCategory, newSubCode)}
                </div>
              </div>

              <div>
                <label htmlFor="detail" className="block text-sm font-bold text-gray-700 mb-1.5">
                  ชื่อ SPLO
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

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 mx-auto">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">ยืนยันการลบข้อมูล SPLO</h3>
              <p className="text-center text-red-600 font-medium mb-1">
                ระวัง! การลบข้อมูลนี้จะส่งผลกระทบต่อข้อมูลส่วนอื่น
              </p>
              <p className="text-center text-gray-500 text-sm mb-6">
                หากลบแล้ว ข้อมูลที่เชื่อมโยงกับ SPLO นี้ (เช่น ตารางความสัมพันธ์ YLO) จะหายไปหรือไม่สมบูรณ์ คุณแน่ใจหรือไม่ว่าต้องการดำเนินการลบทิ้ง?
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
