"use client";

import { useState } from "react";
import { BookOpen, Pencil, Trash2, Plus, X, Target, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const MOCK_PLO_DATA = {
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
};

const FLAT_PLOS = Object.values(MOCK_PLO_DATA).flat().map((plo: any) => ({
  code: plo.code,
  description: plo.detailTh || plo.detail,
  detail: plo.detail,
  subPlos: plo.subPlos || [],
}));

const MOCK_CLO_DATA = [
  { id: 1, code: "CLO1", detail: "Describe the principles of Science and Mathematics." },
  { id: 2, code: "CLO2", detail: "Apply theories to solve complex problems." },
  { id: 3, code: "CLO3", detail: "Analyze and synthesize technical data." },
  { id: 4, code: "CLO4", detail: "Evaluate experimental methods and outcomes." },
  { id: 5, code: "CLO5", detail: "Demonstrate professional ethics and responsibility." },
];

export default function CoursePLOPage() {
  const params = useParams();
  const courseId = params.courseId;

  const [items, setItems] = useState<any[]>([
    {
      id: 1,
      code: "K1",
      description: "อธิบายหลักการพื้นฐานและทฤษฎีทางวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีที่จำเป็นและเพียงพอสำหรับการประยุกต์ใช้ในรายวิชาแกน",
      clos: []
    },
    {
      id: 2,
      code: "S1",
      description: "PerformSciMath",
      clos: []
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // CLO Modal State
  const [isCloModalOpen, setIsCloModalOpen] = useState(false);
  const [mappingItemId, setMappingItemId] = useState<number | null>(null);
  const [selectedClos, setSelectedClos] = useState<string[]>([]);
  const [isCloTableOpen, setIsCloTableOpen] = useState(false);

  const openCloModal = (item: any) => {
    setMappingItemId(item.id);
    setSelectedClos(item.clos || []);
    setIsCloModalOpen(true);
  };

  const handleToggleClo = (cloCode: string) => {
    setSelectedClos(prev =>
      prev.includes(cloCode) ? prev.filter(c => c !== cloCode) : [...prev, cloCode]
    );
  };

  const submitCloMapping = (e: React.FormEvent) => {
    e.preventDefault();
    if (mappingItemId !== null) {
      setItems(items.map(item =>
        item.id === mappingItemId ? { ...item, clos: selectedClos } : item
      ));
    }
    setIsCloModalOpen(false);
    setMappingItemId(null);
  };

  const openEditModal = (item: any) => {
    setEditId(item.id);
    setSelectedCodes([item.code]);
    setIsModalOpen(true);
  };

  const handleToggleCode = (code: string) => {
    if (editId !== null) {
      setSelectedCodes([code]);
    } else {
      setSelectedCodes(prev =>
        prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCodes.length === 0) return;

    if (editId !== null) {
      setItems(items.map(item =>
        item.id === editId
          ? { ...item, code: selectedCodes[0] }
          : item
      ));
    } else {
      const existingCodes = items.map(i => i.code);
      const newCodes = selectedCodes.filter(c => !existingCodes.includes(c));

      let nextId = items.length > 0 ? Math.max(...items.map(c => c.id)) + 1 : 1;
      const newItems = newCodes.map(code => ({
        id: nextId++,
        code,
        description: "",
        clos: [],
      }));
      setItems([...items, ...newItems]);
    }

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setSelectedCodes([]);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setItems(items.filter(item => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">
      {/* Back Button */}
      <Link href="/admin/curriculum/courses" className="inline-flex items-center space-x-2 text-[#1b3860] hover:text-[#d5ae52] font-semibold text-sm transition-colors mb-4">
        <ChevronLeft className="w-4 h-4" />
        <span>กลับไปหน้ารายวิชา</span>
      </Link>

      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#d5ae52]/20 rounded-lg">
            <Target className="w-6 h-6 text-[#a38234]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-[#1b3860]">จัดการ SPLO รายวิชา</h1>
              <span className="bg-[#1b3860]/10 text-[#1b3860] text-sm font-bold px-2.5 py-0.5 rounded-full">
                {items.length} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการผลลัพธ์การเรียนรู้ระดับรายวิชา (SPLO)</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCloTableOpen(true)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors font-medium text-sm border border-gray-200"
          >
            <BookOpen className="w-4 h-4" />
            <span>ตาราง CLO</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1b3860] hover:bg-[#142946] text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-sm font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มข้อมูล SPLO</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-[#1b3860]/20">
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap w-32">ตัวย่อ SPLO</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm w-full">รายละเอียด (Detail) & SPLO</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap">เชื่อม CLO</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6 align-middle">
                    <span className="font-bold text-[#1b3860] text-base">{item.code}</span>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    {(() => {
                      const ploInfo = FLAT_PLOS.find(p => p.code === item.code);
                      return (
                        <div className="space-y-1">
                          <div className="text-gray-700 font-medium">{ploInfo?.detail || item.description}</div>
                          {ploInfo?.subPlos && ploInfo.subPlos.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {ploInfo.subPlos.map((s: any) => (
                                <span key={s.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#1b3860]/10 text-[#1b3860]">
                                  {s.code}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.clos && item.clos.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.clos.map((clo: string, idx: number) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#d5ae52]/20 text-[#a38234]">
                              {clo}
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => openCloModal(item)}
                        className="text-xs bg-gray-50 hover:bg-gray-100 text-[#1b3860] font-medium px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1 border border-gray-200 whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{item.clos && item.clos.length > 0 ? "จัดการ CLO" : "เพิ่ม CLO"}</span>
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-gray-500 hover:text-[#1b3860] hover:bg-gray-200 rounded-md transition-colors inline-flex justify-center items-center"
                        title="แก้ไข"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="ลบ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    ไม่มีข้อมูล SPLO
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1b3860]">{editId ? "แก้ไขข้อมูล SPLO" : "เพิ่มข้อมูล SPLO"}</h2>
              <button
                onClick={closeModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  เลือก Sub PLO (KSEC) <span className="text-red-500">*</span>
                </label>

                {/* Scrollable container for groups */}
                <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-4">
                  {Object.entries(MOCK_PLO_DATA).map(([category, plos]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="font-semibold text-[#1b3860] text-sm sticky top-0 bg-white py-1">{category}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {plos.map((plo: any) => {
                          const isAlreadyAdded = items.some(item => item.code === plo.code && item.id !== editId);
                          const isSelected = selectedCodes.includes(plo.code) || isAlreadyAdded;

                          return (
                            <div
                              key={plo.code}
                              onClick={() => { if (!isAlreadyAdded) handleToggleCode(plo.code); }}
                              className={`p-3 rounded-lg border text-sm transition-colors flex items-start space-x-3
                                ${isAlreadyAdded ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200' :
                                  isSelected ? 'border-[#d5ae52] bg-[#d5ae52]/10 cursor-pointer' : 'border-gray-200 hover:border-gray-300 cursor-pointer'}`}
                            >
                              <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center
                                ${isSelected ? 'bg-[#d5ae52] border-[#d5ae52]' : 'border-gray-300'}`}
                              >
                                {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                              </div>
                              <div>
                                <div className="font-bold text-[#1b3860]">{plo.code}</div>
                                <div className="text-xs text-gray-600 line-clamp-1 mb-1">{plo.detail}</div>
                                {plo.subPlos && plo.subPlos.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {plo.subPlos.map((s: any) => (
                                      <span key={s.id} className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isSelected ? 'bg-[#d5ae52]/20 text-[#a38234]' : 'bg-gray-100 text-gray-500'}`}>
                                        {s.code}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Section */}
              {selectedCodes.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="text-xs font-bold text-gray-600 mb-2">
                    SPLO ที่เลือก ({selectedCodes.length} รายการ)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCodes.map(code => (
                      <span key={code} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#1b3860] text-white">
                        {code}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleToggleCode(code); }}
                          className="ml-1.5 hover:text-red-300 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={selectedCodes.length === 0}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1b3860] hover:bg-[#142946] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
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
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ยืนยันการลบข้อมูล</h3>
              <p className="text-sm text-gray-500 mb-6">
                คุณแน่ใจหรือไม่ว่าต้องการลบ SPLO นี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
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

      {/* CLO Mapping Modal */}
      {isCloModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1b3860]">เชื่อมต่อ CLO</h2>
              <div className="flex items-center space-x-3">
                <Link
                  href={`/admin/curriculum/courses/${courseId}/clo`}
                  className="bg-[#1b3860] hover:bg-[#142946] text-white px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors shadow-sm font-medium text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>สร้าง CLO</span>
                </Link>
                <button
                  onClick={() => setIsCloModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={submitCloMapping} className="p-5 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  เลือก CLO ที่ต้องการเชื่อมต่อ <span className="text-red-500">*</span>
                </label>

                <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-2">
                  {MOCK_CLO_DATA.map((clo: any) => {
                    const isSelected = selectedClos.includes(clo.code);
                    return (
                      <div
                        key={clo.code}
                        onClick={() => handleToggleClo(clo.code)}
                        className={`p-3 rounded-lg border text-sm cursor-pointer transition-colors flex items-start space-x-3
                          ${isSelected ? 'border-[#d5ae52] bg-[#d5ae52]/10' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center
                          ${isSelected ? 'bg-[#d5ae52] border-[#d5ae52]' : 'border-gray-300'}`}
                        >
                          {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                        </div>
                        <div>
                          <div className="font-bold text-[#1b3860]">{clo.code}</div>
                          <div className="text-xs text-gray-600">{clo.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary Section */}
              {selectedClos.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="text-xs font-bold text-gray-600 mb-2">
                    CLO ที่เลือก ({selectedClos.length} รายการ)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedClos.map(code => (
                      <span key={code} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#1b3860] text-white">
                        {code}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleToggleClo(code); }}
                          className="ml-1.5 hover:text-red-300 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsCloModalOpen(false)}
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
      {/* CLO Table Modal */}
      {isCloTableOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1b3860]">รายละเอียดตาราง CLO</h2>
              <button
                onClick={() => setIsCloTableOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[60vh]">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 font-bold text-[#1b3860] text-sm whitespace-nowrap w-32">รหัส CLO</th>
                      <th className="py-3 px-4 font-bold text-[#1b3860] text-sm">รายละเอียด (Description)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {MOCK_CLO_DATA.map((clo) => (
                      <tr key={clo.code} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-[#1b3860] text-sm align-top">{clo.code}</td>
                        <td className="py-3 px-4 text-gray-700 text-sm">{clo.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={() => setIsCloTableOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ปิดหน้าต่าง
              </button>
              <Link
                href={`/admin/curriculum/courses/${courseId}/clo`}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1b3860] hover:bg-[#142946] rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>สร้าง/จัดการ CLO</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
