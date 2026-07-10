"use client";

import { useState } from "react";
import { BookOpen, Pencil, Trash2, Plus, X } from "lucide-react";

export default function YLOPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      year: "1",
      category: "หมวดวิชาศึกษาทั่วไป",
      k_desc: "อธิบายหลักการพื้นฐานและทฤษฎีเบื้องต้นในศาสตร์ต่างๆ ที่เกี่ยวข้อง",
      s_desc: "สามารถค้นคว้าและรวบรวมข้อมูลได้อย่างถูกต้อง",
      e_desc: "ตระหนักถึงความซื่อสัตย์ทางวิชาการและการตรงต่อเวลา",
      c_desc: "มีความรับผิดชอบต่อหน้าที่และมีวินัยในการเรียน",
    },
    {
      id: 2,
      year: "2",
      category: "หมวดวิชาเฉพาะ (แกน)",
      k_desc: "วิเคราะห์และอธิบายหลักการทำงานของระบบที่ซับซ้อนขึ้น",
      s_desc: "ประยุกต์ใช้เครื่องมือพื้นฐานเพื่อแก้ปัญหาทางวิชาชีพ",
      e_desc: "ปฏิบัติตามจรรยาบรรณวิชาชีพในระดับพื้นฐาน",
      c_desc: "ทำงานเป็นทีมและแสดงความคิดเห็นได้อย่างเหมาะสม",
    },
    {
      id: 3,
      year: "3",
      category: "หมวดวิชาเฉพาะ (เอก)",
      k_desc: "สังเคราะห์ความรู้เพื่อออกแบบวิธีแก้ปัญหาในสายอาชีพ",
      s_desc: "ปฏิบัติงานจริงในสภาพแวดล้อมจำลองได้อย่างมีประสิทธิภาพ",
      e_desc: "มีวิจารณญาณในการตัดสินใจโดยคำนึงถึงผลกระทบต่อสังคม",
      c_desc: "มีทักษะการเป็นผู้นำและแก้ไขปัญหาเฉพาะหน้า",
    },
    {
      id: 4,
      year: "4",
      category: "สหกิจศึกษาและการวิจัย",
      k_desc: "ประเมินและวิพากษ์องค์ความรู้ใหม่ทางวิชาการและวิชาชีพ",
      s_desc: "ดำเนินการวิจัยหรือโครงงานที่สร้างนวัตกรรมหรือแก้ปัญหาจริง",
      e_desc: "ยึดมั่นในจริยธรรมการวิจัยและความรับผิดชอบต่อสังคม",
      c_desc: "เรียนรู้ตลอดชีวิตและปรับตัวเข้ากับสภาพแวดล้อมการทำงานจริง",
    },
    {
      id: 5,
      year: "5",
      category: "วิชาชีพขั้นสูง",
      k_desc: "บูรณาการความรู้ข้ามศาสตร์เพื่อพัฒนาองค์ความรู้ใหม่",
      s_desc: "บริหารจัดการโครงการขนาดใหญ่และนำเสนอผลงานระดับนานาชาติ",
      e_desc: "เป็นผู้นำในการสร้างจิตสำนึกด้านจริยธรรมในองค์กร",
      c_desc: "มีวิสัยทัศน์กว้างไกลและพร้อมรับมือกับการเปลี่ยนแปลงระดับโลก",
    },
    {
      id: 6,
      year: "6",
      category: "คลินิกปฏิบัติการเฉพาะทาง",
      k_desc: "มีความเชี่ยวชาญระดับสูงในศาสตร์เฉพาะทาง",
      s_desc: "สามารถให้คำปรึกษาและถ่ายทอดทักษะทางวิชาชีพแก่ผู้อื่น",
      e_desc: "เป็นแบบอย่างที่ดีเยี่ยมในด้านคุณธรรมจริยธรรม",
      c_desc: "มีความเป็นมืออาชีพและเป็นที่ยอมรับในระดับสากล",
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formYear, setFormYear] = useState("1");
  const [formCategory, setFormCategory] = useState("");
  const [formK, setFormK] = useState("");
  const [formS, setFormS] = useState("");
  const [formE, setFormE] = useState("");
  const [formC, setFormC] = useState("");

  const openAddModal = () => {
    setEditingId(null);
    const usedYears = items.map(i => String(i.year));
    const availableYear = ["1","2","3","4","5","6"].find(y => !usedYears.includes(y)) || "1";
    setFormYear(availableYear);
    setFormCategory("");
    setFormK("");
    setFormS("");
    setFormE("");
    setFormC("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setFormYear(item.year || "1");
    setFormCategory(item.category || "");
    setFormK(item.k_desc || "");
    setFormS(item.s_desc || "");
    setFormE(item.e_desc || "");
    setFormC(item.c_desc || "");
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCategory.trim()) return;

    if (editingId) {
      setItems(items.map(item => item.id === editingId ? {
        ...item,
        year: formYear,
        category: formCategory,
        k_desc: formK,
        s_desc: formS,
        e_desc: formE,
        c_desc: formC,
      } : item));
    } else {
      setItems([
        {
          id: items.length > 0 ? Math.max(...items.map(c => c.id)) + 1 : 1,
          year: formYear,
          category: formCategory,
          k_desc: formK,
          s_desc: formS,
          e_desc: formE,
          c_desc: formC,
        },
        ...items
      ]);
    }
    setIsModalOpen(false);
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
              <h1 className="text-2xl font-bold text-[#1b3860]">จัดการ YLO</h1>
              <span className="bg-[#1b3860]/10 text-[#1b3860] text-sm font-bold px-2.5 py-0.5 rounded-full">
                {items.length} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการข้อมูล YLO</p>
          </div>
        </div>
        <button 
          onClick={openAddModal}
          disabled={items.length >= 6}
          className={`px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-sm font-bold text-sm ${
            items.length >= 6 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-[#1b3860] hover:bg-[#142946] text-white"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{items.length >= 6 ? "เพิ่มครบ 6 ปีแล้ว" : "เพิ่มข้อมูล YLO"}</span>
        </button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {[...items].sort((a, b) => Number(a.year) - Number(b.year)).map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
          >
            {/* Card Header */}
            <div className="relative p-8 overflow-hidden bg-[#1b3860] flex flex-col justify-center min-h-[160px] border-b border-[#d5ae52]/30">
              {/* Modern Graphic Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d5ae52]/30 via-transparent to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#60a5fa]/20 via-transparent to-transparent rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl pointer-events-none"></div>
              
              {/* Right-aligned Accent Number */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none select-none overflow-hidden">
                <span className="text-[10rem] font-black tracking-tighter leading-none italic text-white drop-shadow-2xl">
                  {item.year}
                </span>
              </div>
              
              {/* Main Content */}
              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="flex items-center mb-4 space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#d5ae52] to-[#b89542] text-white shadow-lg shadow-[#d5ae52]/20">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-[0.2em]">Yearly Learning Outcome</span>
                  </div>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg flex items-baseline gap-3">
                  YLO <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d5ae52] to-[#fef08a]">{item.year}</span>
                </h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col border-t-4 border-[#d5ae52] space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">หมวดหมู่</p>
                  <p className="text-sm font-bold text-[#1b3860]">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">ชั้นปี</p>
                  <span className="bg-[#1b3860]/10 text-[#1b3860] text-xs font-bold px-2 py-0.5 rounded">ปีที่ {item.year}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shadow-sm">K</span>
                  <p className="text-sm text-gray-600 line-clamp-1">{item.k_desc || "-"}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center shadow-sm">S</span>
                  <p className="text-sm text-gray-600 line-clamp-1">{item.s_desc || "-"}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center shadow-sm">E</span>
                  <p className="text-sm text-gray-600 line-clamp-1">{item.e_desc || "-"}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded bg-orange-100 text-orange-800 text-xs font-bold flex items-center justify-center shadow-sm">C</span>
                  <p className="text-sm text-gray-600 line-clamp-1">{item.c_desc || "-"}</p>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 text-gray-400 hover:text-[#1b3860] hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  title="แก้ไข"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setDeleteId(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  title="ลบ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-gray-500 font-medium">ไม่มีข้อมูล YLO</p>
        </div>
      )}

      {/* Modal / Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-[#1b3860]">
                {editingId ? "แก้ไขข้อมูล YLO" : "เพิ่มข้อมูล YLO"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-[#1b3860] mb-1.5">ปีที่</label>
                  <select
                    value={formYear}
                    onChange={e => setFormYear(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm bg-white"
                  >
                    {[1,2,3,4,5,6].map(y => {
                      const isUsed = items.some(item => String(item.year) === String(y) && item.id !== editingId);
                      return (
                        <option key={y} value={y} disabled={isUsed}>
                          ปีที่ {y} {isUsed ? "(ใช้งานแล้ว)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1b3860] mb-1.5">หมวดหมู่</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    placeholder="เช่น หมวดวิชาศึกษาทั่วไป, กลุ่มวิชาแกน"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm"
                    required
                  />
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1b3860] text-white">
                      <th className="py-3 px-4 font-bold text-sm w-[20%] text-center border-r border-[#142946]">ด้าน (Domain)</th>
                      <th className="py-3 px-4 font-bold text-sm w-[80%]">สิ่งที่ผู้เรียนจะได้รับหลังจากเรียนจบปีนี้ (Expected Outcome)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-center border-r border-gray-200 align-top">
                        <span className="font-bold text-lg text-[#1b3860]">K</span>
                        <span className="text-xs text-gray-500 font-medium mt-1 block">ทักษะความรู้<br />(Knowledge)</span>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <textarea
                          value={formK}
                          onChange={e => setFormK(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none text-sm min-h-[70px] resize-none"
                          placeholder="อธิบายทักษะความรู้ที่ได้..."
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-center border-r border-gray-200 align-top">
                        <span className="font-bold text-lg text-[#1b3860]">S</span>
                        <span className="text-xs text-gray-500 font-medium mt-1 block">ทักษะวิชาชีพ<br />(Skills)</span>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <textarea
                          value={formS}
                          onChange={e => setFormS(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none text-sm min-h-[70px] resize-none"
                          placeholder="อธิบายทักษะวิชาชีพที่ได้..."
                        />
                      </td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-center border-r border-gray-200 align-top">
                        <span className="font-bold text-lg text-[#1b3860]">E</span>
                        <span className="text-xs text-gray-500 font-medium mt-1 block">จริยธรรม<br />(Ethics)</span>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <textarea
                          value={formE}
                          onChange={e => setFormE(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none text-sm min-h-[70px] resize-none"
                          placeholder="อธิบายด้านจริยธรรมที่ได้..."
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-center border-r border-gray-200 align-top">
                        <span className="font-bold text-lg text-[#1b3860]">C</span>
                        <span className="text-xs text-gray-500 font-medium mt-1 block">คุณลักษณะ<br />(Characteristics)</span>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <textarea
                          value={formC}
                          onChange={e => setFormC(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none text-sm min-h-[70px] resize-none"
                          placeholder="อธิบายคุณลักษณะที่ได้..."
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-200"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-[#1b3860] hover:bg-[#142946] rounded-lg transition-colors shadow-sm"
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
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">ยืนยันการลบข้อมูล YLO</h3>
              <p className="text-center text-red-600 font-medium mb-1">
                ระวัง! การลบข้อมูลนี้จะส่งผลกระทบต่อข้อมูลส่วนอื่น
              </p>
              <p className="text-center text-gray-500 text-sm mb-6">
                หากลบแล้ว ข้อมูลที่เชื่อมโยงกับ YLO ชั้นปีนี้ (เช่น ตารางความสัมพันธ์) จะหายไปหรือไม่สมบูรณ์ คุณแน่ใจหรือไม่ว่าต้องการดำเนินการลบทิ้ง?
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
