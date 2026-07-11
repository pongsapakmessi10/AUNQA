"use client";

import { useState } from "react";
import { BookOpen, Pencil, Copy, Plus, X, Trash2 } from "lucide-react";

export default function CurriculumPage() {
  const [curriculums, setCurriculums] = useState([
    {
      id: 1,
      nameTh: "สาขาวิชาพลังงานชีวภาพและการแปรรูปเทคโนโลยีชีวภาพ (หลักสูตรปรับปรุง พ.ศ. 2566)",
      nameEn: "Course Syllabus and Expected Learning Outcomes",
      facultyTh: "คณะวิทยาศาสตร์และเทคโนโลยี",
      facultyEn: "Faculty of Science and Technology",
      tracks: [
        { id: 1, nameTh: "สหกิจศึกษาและการศึกษาเชิงบูรณาการกับการทำงาน", nameEn: "Cooperative and Work Integrated Education", shortName: "CWIE" },
        { id: 2, nameTh: "แผนวิจัย หรือ แผนโครงงานวิจัย", nameEn: "Research", shortName: "RES" }
      ]
    },
    {
      id: 2,
      nameTh: "สาขาวิชาวิทยาการคอมพิวเตอร์ (หลักสูตรปรับปรุง พ.ศ. 2565)",
      nameEn: "Bachelor of Science in Computer Science",
      facultyTh: "คณะวิทยาศาสตร์และเทคโนโลยี",
      facultyEn: "Faculty of Science and Technology",
      tracks: [
        { id: 1, nameTh: "วิศวกรรมซอฟต์แวร์", nameEn: "Software Engineering", shortName: "SE" },
        { id: 2, nameTh: "วิทยาการข้อมูล", nameEn: "Data Science", shortName: "DS" }
      ]
    },
    {
      id: 3,
      nameTh: "สาขาวิชาวิศวกรรมเครื่องกล (หลักสูตรปรับปรุง พ.ศ. 2564)",
      nameEn: "Bachelor of Engineering in Mechanical Engineering",
      facultyTh: "คณะวิศวกรรมศาสตร์",
      facultyEn: "Faculty of Engineering",
      tracks: [
        { id: 1, nameTh: "ยานยนต์อัจฉริยะ", nameEn: "Smart Vehicles", shortName: "SV" }
      ]
    },
    {
      id: 4,
      nameTh: "สาขาวิชาบริหารธุรกิจ (หลักสูตรปรับปรุง พ.ศ. 2566)",
      nameEn: "Bachelor of Business Administration",
      facultyTh: "คณะพาณิชยศาสตร์และการบัญชี",
      facultyEn: "Thammasat Business School",
      tracks: [
        { id: 1, nameTh: "การจัดการ", nameEn: "Management", shortName: "MGT" },
        { id: 2, nameTh: "การตลาด", nameEn: "Marketing", shortName: "MKT" }
      ]
    }
  ]);

  // Box State (For adding new)
  const [isAddBoxOpen, setIsAddBoxOpen] = useState(false);

  // Add Form State
  const [newNameTh, setNewNameTh] = useState("");
  const [newNameEn, setNewNameEn] = useState("");
  const [newFacultyTh, setNewFacultyTh] = useState("");
  const [newFacultyEn, setNewFacultyEn] = useState("");
  const [tracks, setTracks] = useState<{ id: number, nameTh: string, nameEn: string, shortName: string }[]>([
    { id: Date.now(), nameTh: "", nameEn: "", shortName: "" }
  ]);

  // Inline Edit State
  const [inlineEditingId, setInlineEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [inlineNameTh, setInlineNameTh] = useState("");
  const [inlineNameEn, setInlineNameEn] = useState("");
  const [inlineFacultyTh, setInlineFacultyTh] = useState("");
  const [inlineFacultyEn, setInlineFacultyEn] = useState("");
  const [inlineTracks, setInlineTracks] = useState<{ id: number, nameTh: string, nameEn: string, shortName: string }[]>([]);

  // Add Box Handlers
  const handleAddTrack = () => {
    if (tracks.length >= 6) return;
    setTracks([...tracks, { id: Date.now(), nameTh: "", nameEn: "", shortName: "" }]);
  };

  const handleRemoveTrack = (id: number) => {
    setTracks(tracks.filter(t => t.id !== id));
  };

  const handleTrackChange = (id: number, field: "nameTh" | "nameEn" | "shortName", value: string) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleAddCurriculum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNameTh.trim() || !newFacultyTh.trim()) return;

    const validTracks = tracks.filter(t => t.nameTh.trim() || t.nameEn.trim());

    const newItem = {
      id: curriculums.length > 0 ? Math.max(...curriculums.map(c => c.id)) + 1 : 1,
      nameTh: newNameTh,
      nameEn: newNameEn,
      facultyTh: newFacultyTh,
      facultyEn: newFacultyEn,
      tracks: validTracks
    };

    setCurriculums([newItem, ...curriculums]);
    closeBox();
  };

  const closeBox = () => {
    setIsAddBoxOpen(false);
    setNewNameTh("");
    setNewNameEn("");
    setNewFacultyTh("");
    setNewFacultyEn("");
    setTracks([{ id: Date.now(), nameTh: "", nameEn: "", shortName: "" }]);
  };

  // Inline Edit Handlers
  const handleEditClick = (item: any) => {
    // If the add box is open, close it
    if (isAddBoxOpen) closeBox();

    setInlineEditingId(item.id);
    setInlineNameTh(item.nameTh || "");
    setInlineNameEn(item.nameEn || "");
    setInlineFacultyTh(item.facultyTh || "");
    setInlineFacultyEn(item.facultyEn || "");

    // Ensure there's at least one empty track field if it was empty
    const initTracks = item.tracks && item.tracks.length > 0
      ? item.tracks.map((t: any) => ({ ...t, shortName: t.shortName || "" }))
      : [{ id: Date.now(), nameTh: "", nameEn: "", shortName: "" }];
    setInlineTracks(initTracks);
  };

  const cancelInlineEdit = () => {
    setInlineEditingId(null);
  };

  const handleInlineAddTrack = () => {
    if (inlineTracks.length >= 6) return;
    setInlineTracks([...inlineTracks, { id: Date.now(), nameTh: "", nameEn: "", shortName: "" }]);
  };

  const handleInlineRemoveTrack = (id: number) => {
    setInlineTracks(inlineTracks.filter(t => t.id !== id));
  };

  const handleInlineTrackChange = (id: number, field: "nameTh" | "nameEn" | "shortName", value: string) => {
    setInlineTracks(inlineTracks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleInlineSave = () => {
    if (inlineEditingId === null) return;

    // Check if main fields are filled
    if (!inlineNameTh.trim() || !inlineFacultyTh.trim()) {
      alert("กรุณากรอกชื่อหลักสูตร (ไทย) และคณะ (ไทย) ให้ครบถ้วน");
      return;
    }

    const validTracks = inlineTracks.filter(t => t.nameTh.trim() || t.nameEn.trim());

    setCurriculums(curriculums.map(c => {
      if (c.id === inlineEditingId) {
        return {
          ...c,
          nameTh: inlineNameTh,
          nameEn: inlineNameEn,
          facultyTh: inlineFacultyTh,
          facultyEn: inlineFacultyEn,
          tracks: validTracks
        };
      }
      return c;
    }));

    cancelInlineEdit();
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setCurriculums(curriculums.filter(c => c.id !== deleteId));
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
              <h1 className="text-2xl font-bold text-[#1b3860]">จัดการหลักสูตร</h1>
              <span className="bg-[#1b3860]/10 text-[#1b3860] text-sm font-bold px-2.5 py-0.5 rounded-full">
                {curriculums.length} รายการ
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">บริหารจัดการข้อมูลหลักสูตร สายการเรียน และคณะ</p>
          </div>
        </div>
        <button
          onClick={() => {
            if (inlineEditingId !== null) cancelInlineEdit();
            setIsAddBoxOpen(!isAddBoxOpen);
          }}
          disabled={curriculums.length >= 4 && !isAddBoxOpen}
          className={`px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-sm font-medium text-sm ${curriculums.length >= 4 && !isAddBoxOpen
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#1b3860] hover:bg-[#142946] text-white"
            }`}
        >
          {isAddBoxOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAddBoxOpen ? "ปิดหน้าต่างเพิ่ม" : (curriculums.length >= 4 ? "ครบ 4 หลักสูตรแล้ว" : "เพิ่มหลักสูตรใหม่")}</span>
        </button>
      </div>

      {/* Add Box */}
      {isAddBoxOpen && (
        <div className="bg-white p-6 rounded-xl border-2 border-[#1b3860]/20 shadow-md animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-[#1b3860]">เพิ่มข้อมูลหลักสูตรใหม่</h2>
          </div>

          <form onSubmit={handleAddCurriculum} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name TH */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  ชื่อหลักสูตร (ภาษาไทย) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newNameTh}
                  onChange={(e) => setNewNameTh(e.target.value)}
                  placeholder="เช่น วิทยาศาสตรบัณฑิต..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                  required
                />
              </div>

              {/* Name EN */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  ชื่อหลักสูตร (ภาษาอังกฤษ)
                </label>
                <input
                  type="text"
                  value={newNameEn}
                  onChange={(e) => setNewNameEn(e.target.value)}
                  placeholder="เช่น Bachelor of Science..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                />
              </div>

              {/* Faculty TH */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  คณะ (ภาษาไทย) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newFacultyTh}
                  onChange={(e) => setNewFacultyTh(e.target.value)}
                  placeholder="เช่น คณะวิทยาศาสตร์และเทคโนโลยี"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                  required
                />
              </div>

              {/* Faculty EN */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  คณะ (ภาษาอังกฤษ)
                </label>
                <input
                  type="text"
                  value={newFacultyEn}
                  onChange={(e) => setNewFacultyEn(e.target.value)}
                  placeholder="เช่น Faculty of Science and Technology"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Tracks Section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#1b3860]">แผนการเรียน (Tracks)</h3>
                  <p className="text-xs text-gray-500">สามารถเพิ่มได้มากกว่า 1 สายการเรียน</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddTrack}
                  disabled={tracks.length >= 6}
                  className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-medium shadow-sm ${tracks.length >= 6
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#d5ae52] hover:bg-[#b89542] text-white"
                    }`}
                >
                  <Plus className="w-3.5 h-3.5" /> {tracks.length >= 6 ? "ครบ 6 สายการเรียนแล้ว" : "เพิ่มสายการเรียน"}
                </button>
              </div>

              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <div key={track.id} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">ตัวย่อ (Short Name)</label>
                        <input
                          type="text"
                          value={track.shortName || ""}
                          onChange={(e) => handleTrackChange(track.id, 'shortName', e.target.value)}
                          placeholder="เช่น CWIE"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm font-bold text-[#1b3860]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">สายการเรียน (ภาษาไทย)</label>
                        <input
                          type="text"
                          value={track.nameTh}
                          onChange={(e) => handleTrackChange(track.id, 'nameTh', e.target.value)}
                          placeholder={`สายการเรียนที่ ${index + 1} (ไทย)`}
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">สายการเรียน (ภาษาอังกฤษ)</label>
                        <input
                          type="text"
                          value={track.nameEn}
                          onChange={(e) => handleTrackChange(track.id, 'nameEn', e.target.value)}
                          placeholder={`สายการเรียนที่ ${index + 1} (English)`}
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm"
                        />
                      </div>
                    </div>
                    {tracks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTrack(track.id)}
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors mt-4"
                        title="ลบสายการเรียน"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
              <button
                type="button"
                onClick={closeBox}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-bold text-white bg-[#1b3860] hover:bg-[#142946] rounded-lg transition-colors shadow-sm"
              >
                บันทึกข้อมูลหลักสูตร
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Curriculum Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap w-[30%]">หลักสูตร</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap w-[25%]">คณะ</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm min-w-[300px] w-[35%]">แผนการเรียน (Tracks)</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">แก้ไข</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">ลบ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {curriculums.map((item) => {
                const isEditing = inlineEditingId === item.id;
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                    {isEditing ? (
                      <>
                        <td className="py-4 px-6 align-top">
                          <div className="space-y-2">
                            <input
                              value={inlineNameTh}
                              onChange={(e) => setInlineNameTh(e.target.value)}
                              placeholder="ชื่อ (ไทย)"
                              className="w-full px-3 py-1.5 border border-[#d5ae52] rounded focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm font-medium"
                            />
                            <input
                              value={inlineNameEn}
                              onChange={(e) => setInlineNameEn(e.target.value)}
                              placeholder="Name (EN)"
                              className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6 align-top">
                          <div className="space-y-2">
                            <input
                              value={inlineFacultyTh}
                              onChange={(e) => setInlineFacultyTh(e.target.value)}
                              placeholder="คณะ (ไทย)"
                              className="w-full px-3 py-1.5 border border-[#d5ae52] rounded focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm font-medium"
                            />
                            <input
                              value={inlineFacultyEn}
                              onChange={(e) => setInlineFacultyEn(e.target.value)}
                              placeholder="Faculty (EN)"
                              className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6 align-top bg-gray-50/50">
                          <div className="space-y-3">
                            {inlineTracks.map((t, idx) => (
                              <div key={t.id} className="flex items-start gap-2 bg-white p-2.5 rounded border border-gray-200 shadow-sm relative">
                                <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#d5ae52]/20 text-[#a38234] flex items-center justify-center text-[10px] font-bold">
                                  {idx + 1}
                                </span>
                                <div className="flex-1 space-y-2">
                                  <input
                                    value={t.shortName || ""}
                                    onChange={(e) => handleInlineTrackChange(t.id, 'shortName', e.target.value)}
                                    placeholder="ตัวย่อ (เช่น CWIE)"
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#d5ae52] outline-none text-xs font-bold text-[#1b3860]"
                                  />
                                  <input
                                    value={t.nameTh}
                                    onChange={(e) => handleInlineTrackChange(t.id, 'nameTh', e.target.value)}
                                    placeholder="สายการเรียน (ไทย)"
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#d5ae52] outline-none text-xs"
                                  />
                                  <input
                                    value={t.nameEn}
                                    onChange={(e) => handleInlineTrackChange(t.id, 'nameEn', e.target.value)}
                                    placeholder="Track (EN)"
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#d5ae52] outline-none text-xs"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleInlineRemoveTrack(t.id)}
                                  className="text-gray-400 hover:text-red-500 mt-0.5 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={handleInlineAddTrack}
                              disabled={inlineTracks.length >= 6}
                              className={`text-xs font-bold flex items-center gap-1 mt-1 px-1 ${inlineTracks.length >= 6 ? "text-gray-400 cursor-not-allowed" : "text-[#1b3860] hover:text-[#142946]"
                                }`}
                            >
                              <Plus className="w-3.5 h-3.5" /> {inlineTracks.length >= 6 ? "ครบ 6 สายการเรียนแล้ว" : "เพิ่มสายการเรียน"}
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center align-top">
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={handleInlineSave}
                              className="px-3 py-1.5 bg-[#1b3860] text-white text-xs font-bold rounded shadow-sm hover:bg-[#142946] w-full"
                            >
                              บันทึก
                            </button>
                            <button
                              onClick={cancelInlineEdit}
                              className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded border border-gray-200 hover:bg-gray-200 w-full"
                            >
                              ยกเลิก
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center align-top">
                          <button
                            className="p-2 text-gray-300 rounded-md inline-flex justify-center items-center cursor-not-allowed"
                            disabled
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 px-6 align-top">
                          <div className="font-bold text-[#1b3860] mb-0.5">{item.nameTh}</div>
                          <div className="text-sm text-gray-500">{item.nameEn || "-"}</div>
                        </td>
                        <td className="py-4 px-6 align-top">
                          <div className="text-[#1b3860] font-medium mb-0.5">{item.facultyTh}</div>
                          <div className="text-sm text-gray-500">{item.facultyEn || "-"}</div>
                        </td>
                        <td className="py-4 px-6 align-top">
                          {item.tracks && item.tracks.length > 0 ? (
                            <div className="space-y-3">
                              {item.tracks.map((t, idx) => (
                                <div key={t.id} className="flex items-start gap-2.5">
                                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#d5ae52]/20 text-[#a38234] flex items-center justify-center text-[10px] font-bold">
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <div className="font-bold text-sm text-[#1b3860] leading-tight">
                                      {t.shortName && <span className="bg-[#1b3860]/10 text-[#1b3860] px-1.5 py-0.5 rounded text-xs mr-2">{t.shortName}</span>}
                                      {t.nameTh || "-"}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5 leading-tight">{t.nameEn || "-"}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400 italic">ไม่มีการแบ่งสายการเรียน</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center align-top">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-2 text-gray-400 hover:text-[#1b3860] hover:bg-gray-100 rounded-md transition-colors inline-flex justify-center items-center"
                            title="แก้ไข"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="py-4 px-6 text-center align-top">
                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex justify-center items-center"
                            title="ลบ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
              {curriculums.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <BookOpen className="w-8 h-8 text-gray-300" />
                      <p>ไม่มีข้อมูลหลักสูตร</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 mx-auto">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">ยืนยันการลบข้อมูลหลักสูตร</h3>
              <p className="text-center text-red-600 font-medium mb-1">
                ระวัง! การลบข้อมูลนี้จะส่งผลกระทบต่อข้อมูลส่วนอื่น
              </p>
              <p className="text-center text-gray-500 text-sm mb-6">
                หากลบแล้ว ข้อมูลโครงสร้างหลักสูตร, PLO, YLO และรายวิชาที่เชื่อมโยงอยู่จะหายไปทั้งหมด คุณแน่ใจหรือไม่ว่าต้องการดำเนินการลบทิ้ง?
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
