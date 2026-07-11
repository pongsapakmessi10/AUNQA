"use client";

import { useState } from "react";
import { BookOpen, Pencil, Trash2, Plus, X, Filter, Target } from "lucide-react";
import Link from "next/link";

const TRACK_OPTIONS = [
  { id: "CWIE", title: "สหกิจศึกษาและการศึกษาเชิงบูรณาการกับการทำงาน", en: "Cooperative and Work Integrated Education" },
  { id: "RES", title: "แผนวิจัย หรือ แผนโครงงานวิจัย", en: "Research" },
  { id: "NONE", title: "ไม่ระบุแผนการเรียน (รายวิชากลาง)", en: "No Specific Track (Core/General Course)" }
];

export default function CoursesPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      courseName: "Introduction to Computer Science",
      courseCode: "CS101",
      semester: "1",
      year: "1",
      tracks: ["CWIE"],
    },
    {
      id: 2,
      courseName: "Data Structures and Algorithms",
      courseCode: "CS201",
      semester: "2",
      year: "2",
      tracks: ["RES"],
    },
  ]);

  // Filter State
  const [filterYear, setFilterYear] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterTrack, setFilterTrack] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState("1");
  const [year, setYear] = useState("1");
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredItems = items.filter(item => {
    const matchYear = filterYear === "all" || item.year === filterYear;
    const matchSemester = filterSemester === "all" || item.semester === filterSemester;
    const matchTrack = filterTrack === "all" || (item.tracks && item.tracks.includes(filterTrack));
    return matchYear && matchSemester && matchTrack;
  });

  const openEditModal = (item: any) => {
    setEditId(item.id);
    setCourseName(item.courseName);
    setCourseCode(item.courseCode);
    setSemester(item.semester);
    setYear(item.year);
    setSelectedTracks(item.tracks || []);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim() || !courseCode.trim()) return;

    if (editId !== null) {
      setItems(items.map(item => 
        item.id === editId 
          ? { ...item, courseName, courseCode, semester, year, tracks: selectedTracks }
          : item
      ));
    } else {
      const newItem = {
        id: items.length > 0 ? Math.max(...items.map(c => c.id)) + 1 : 1,
        courseName,
        courseCode,
        semester,
        year,
        tracks: selectedTracks,
      };
      setItems([newItem, ...items]);
    }
    
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setCourseName("");
    setCourseCode("");
    setSemester("1");
    setYear("1");
    setSelectedTracks([]);
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
                {filteredItems.length} รายการ
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

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center space-x-2 text-sm font-bold text-gray-700 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#1b3860]" />
          <span>ตัวกรอง:</span>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm font-medium text-[#1b3860]"
          >
            <option value="all">ทุกชั้นปี</option>
            {[1, 2, 3, 4, 5, 6].map(y => (
              <option key={y} value={y.toString()}>ปีที่ {y}</option>
            ))}
          </select>
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm font-medium text-[#1b3860]"
          >
            <option value="all">ทุกเทอม</option>
            {[1, 2, 3].map(s => (
              <option key={s} value={s.toString()}>เทอมที่ {s}</option>
            ))}
          </select>
          <select
            value={filterTrack}
            onChange={(e) => setFilterTrack(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] outline-none text-sm font-medium text-[#1b3860]"
          >
            <option value="all">ทุกแผนการเรียน</option>
            {TRACK_OPTIONS.map(track => (
              <option key={track.id} value={track.id}>
                {track.id === "NONE" ? track.title : `${track.id} - ${track.title}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-[#1b3860]/20">
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap">รหัสวิชา</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm w-full">ชื่อรายวิชา</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">ชั้นปี/เทอม</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">แผนการเรียน</th>
                <th className="py-4 px-6 font-bold text-[#1b3860] text-sm whitespace-nowrap text-center">จัดการข้อมูล</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6 align-middle">
                    <span className="font-bold text-[#1b3860] text-base">{item.courseCode}</span>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <span className="text-gray-700 font-medium">{item.courseName}</span>
                  </td>
                  <td className="py-4 px-6 align-middle text-center">
                    <div className="flex flex-col items-center space-y-1.5">
                      <span className="bg-[#1b3860]/10 text-[#1b3860] text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">ปีที่ {item.year}</span>
                      <span className="bg-[#d5ae52]/20 text-[#a38234] text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">เทอมที่ {item.semester}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-middle text-center">
                    {item.tracks && item.tracks.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {item.tracks.map(t => (
                          <span key={t} className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-1 rounded border border-blue-200 whitespace-nowrap">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        href="#"
                        className="px-3 py-1.5 bg-[#1b3860]/10 text-[#1b3860] hover:bg-[#1b3860] hover:text-white rounded-md text-xs font-bold transition-colors inline-flex items-center space-x-1 whitespace-nowrap"
                        title="เพิ่มเนื้อหาวิชา"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">เนื้อหา</span>
                      </Link>
                      <Link
                        href={`/admin/curriculum/courses/${item.id}`}
                        className="px-3 py-1.5 bg-[#d5ae52]/20 text-[#a38234] hover:bg-[#d5ae52] hover:text-white rounded-md text-xs font-bold transition-colors inline-flex items-center space-x-1 whitespace-nowrap"
                        title="จัดการ PLO & CLO"
                      >
                        <Target className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">PLO/CLO</span>
                      </Link>
                      <div className="w-px h-5 bg-gray-300 mx-1"></div>
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
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
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
              <h2 className="text-xl font-bold text-[#1b3860]">{editId ? "แก้ไขข้อมูลรายวิชา" : "เพิ่มข้อมูลรายวิชา"}</h2>
              <button
                onClick={closeModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="courseName" className="block text-sm font-bold text-gray-700 mb-1.5">
                    รายวิชา <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="courseName"
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="ชื่อรายวิชา"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="courseCode" className="block text-sm font-bold text-gray-700 mb-1.5">
                    รหัสวิชา <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="courseCode"
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="เช่น CS101"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-bold text-gray-700 mb-1.5">
                    ปีที่ <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map(y => (
                      <option key={y} value={y}>ปีที่ {y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="semester" className="block text-sm font-bold text-gray-700 mb-1.5">
                    เทอมที่ <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d5ae52] focus:border-[#d5ae52] outline-none transition-all text-sm"
                  >
                    {[1, 2, 3].map(s => (
                      <option key={s} value={s}>เทอมที่ {s}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    แผนการเรียน (Tracks)
                  </label>
                  <div className="space-y-3 border border-gray-200 p-4 rounded-lg bg-gray-50/50">
                    {TRACK_OPTIONS.map(option => (
                      <label key={option.id} className="flex items-start space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedTracks.includes(option.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTracks([...selectedTracks, option.id]);
                            } else {
                              setSelectedTracks(selectedTracks.filter(id => id !== option.id));
                            }
                          }}
                          className="mt-1 w-4 h-4 text-[#1b3860] border-gray-300 rounded focus:ring-[#d5ae52]"
                        />
                        <div>
                          <div className="flex items-center">
                            <span className="bg-[#1b3860]/10 text-[#1b3860] px-1.5 py-0.5 rounded text-xs font-bold mr-2">{option.id}</span>
                            <span className="text-sm text-gray-700 font-bold group-hover:text-[#1b3860] transition-colors">{option.title}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{option.en}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
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
