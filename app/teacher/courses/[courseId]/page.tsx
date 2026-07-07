"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  BookOpen, ChevronDown, ChevronUp, Edit, Download, Upload, 
  CheckCircle, XCircle, Trash2, AlertTriangle, Users, ArrowLeft
} from "lucide-react";

export default function CourseManagement() {
  const params = useParams();
  const rawCourseId = params.courseId as string;
  // Format course ID (e.g. BEB240 -> BEB 240)
  const courseCode = rawCourseId.replace(/([A-Z]+)(\d+)/, '$1 $2');

  const [showTQF, setShowTQF] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState<any>(null);

  // Generate mock pending students based on courseId
  const getInitialPendingStudents = (code: string) => {
    const mockDb: Record<string, any[]> = {
      "BEB240": [
        { id: "65001111", name: "นาย สมชาย รักเรียน", major: "วิศวกรรมเคมี" },
        { id: "65002222", name: "นางสาว สุดา ขยัน", major: "วิศวกรรมเคมี" }
      ],
      "TU103": [
        { id: "65003333", name: "นาย ธนาธร มุ่งมั่น", major: "นิติศาสตร์" },
        { id: "65004444", name: "นางสาว ฟ้าใส ใจดี", major: "รัฐศาสตร์" },
        { id: "65005555", name: "นาย อาทิตย์ ส่องแสง", major: "สังคมวิทยา" },
        { id: "65006666", name: "นางสาว จันทร์ทิรา สวยงาม", major: "ศิลปศาสตร์" },
        { id: "65007777", name: "นาย นภดล ยอดเยี่ยม", major: "วิทยาศาสตร์" },
      ],
      "BEB496": [
        { id: "62008888", name: "นาย รุ่นพี่ ขยันมาก", major: "วิศวกรรมเคมี" }
      ]
    };
    return mockDb[code] || [];
  };

  const [pendingStudents, setPendingStudents] = useState(getInitialPendingStudents(rawCourseId));

  const [enrolledStudents, setEnrolledStudents] = useState([
    { id: "64003333", name: "นาย สมศักดิ์ เก่งมาก", major: "คณิตศาสตร์" },
    { id: "64004444", name: "นางสาว สมหญิง ดีเยี่ยม", major: "คณิตศาสตร์" },
  ]);

  // Handlers
  const handleAccept = (student: any) => {
    setPendingStudents(pendingStudents.filter(s => s.id !== student.id));
    setEnrolledStudents([...enrolledStudents, student]);
  };

  const handleReject = (studentId: string) => {
    setPendingStudents(pendingStudents.filter(s => s.id !== studentId));
  };

  const confirmRemove = () => {
    if (studentToRemove) {
      setEnrolledStudents(enrolledStudents.filter(s => s.id !== studentToRemove.id));
      setStudentToRemove(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">
      
      {/* Back Button */}
      <div className="flex items-center">
        <Link href="/teacher/courses" className="inline-flex items-center text-[#1b3860] hover:text-[#d5ae52] font-semibold text-sm transition-colors px-3 py-2 -ml-3 rounded-lg hover:bg-[#1b3860]/5">
          <ArrowLeft className="w-4 h-4 mr-2" />
          ย้อนกลับหน้ารายวิชา
        </Link>
      </div>

      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <BookOpen className="w-8 h-8 text-[#1b3860]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1b3860]">ข้อมูลและการจัดการรายวิชา: {courseCode}</h1>
          <p className="text-gray-500 mt-1">ปีการศึกษา 2566 | ระบบจัดการข้อมูลรายวิชาและนักศึกษา</p>
        </div>
      </div>

      {/* Section 1: TQF.3 */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <button 
          onClick={() => setShowTQF(!showTQF)}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <FileTextIcon className="w-6 h-6 text-[#d5ae52]" />
            <h2 className="text-lg font-bold text-[#1b3860]">เค้าโครงรายวิชาและ ผลลัพธ์การเรียนรู้ที่คาดหวัง มคอ.3</h2>
          </div>
          {showTQF ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>

        {showTQF && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 animate-in slide-in-from-top-2 duration-300">
            {/* Mockup Description */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-bold text-[#1b3860] mb-2">คำอธิบายรายวิชา (Course Description)</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                ศึกษาเกี่ยวกับโครงสร้างรายวิชา ทฤษฎีพื้นฐาน การประยุกต์ใช้ความรู้ทางทฤษฎีสู่การปฏิบัติจริง 
                และผลลัพธ์การเรียนรู้ (PLO) ที่นักศึกษาจะได้รับหลังจากผ่านเกณฑ์การประเมินผล
              </p>
              <h3 className="font-bold text-[#1b3860] mb-2">ผลลัพธ์การเรียนรู้ (Learning Outcomes)</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li><span className="font-semibold text-[#1b3860]">ความรู้ (Knowledge):</span> มีความรู้และความเข้าใจในหลักการและทฤษฎีที่สำคัญในเนื้อหาวิชา</li>
                <li><span className="font-semibold text-[#1b3860]">ทักษะ (Skills):</span> สามารถประยุกต์ใช้ความรู้เพื่อวิเคราะห์และแก้ไขปัญหาได้อย่างมีประสิทธิภาพ</li>
                <li><span className="font-semibold text-[#1b3860]">จริยธรรม (Ethics):</span> มีความรับผิดชอบ ซื่อสัตย์สุจริต และปฏิบัติตามจรรยาบรรณวิชาชีพ</li>
                <li><span className="font-semibold text-[#1b3860]">ลักษณะบุคคล (Characteristics):</span> มีความเป็นผู้นำ สามารถทำงานร่วมกับผู้อื่น และพัฒนาตนเองอย่างต่อเนื่อง</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#1b3860] text-white text-sm font-medium rounded-md hover:bg-[#142946] transition shadow-sm">
                <Edit className="w-4 h-4" />
                <span>แก้ไขแบบฟอร์ม มคอ.3</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white text-[#1b3860] border border-[#1b3860] text-sm font-medium rounded-md hover:bg-gray-50 transition shadow-sm">
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลดเอกสาร มคอ.3</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#d5ae52] text-white text-sm font-medium rounded-md hover:bg-[#c49f4b] transition shadow-sm">
                <Upload className="w-4 h-4" />
                <span>อัปโหลดเอกสาร มคอ.3 (ฉบับเซ็นชื่อแล้ว)</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Students Management */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-2">
          <Users className="w-6 h-6 text-[#1b3860]" />
          <h2 className="text-xl font-bold text-[#1b3860]">ระบบจัดการรายชื่อนักศึกษา (Student Roster Management)</h2>
        </div>

        {/* Pending Requests Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-yellow-50 p-4 border-b border-gray-200">
            <h3 className="font-bold text-[#1b3860] flex items-center">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
              รายการรอดำเนินการ: คำขอลงทะเบียนเรียน ({pendingStudents.length})
            </h3>
          </div>
          
          {pendingStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left block md:table">
                <thead className="hidden md:table-header-group bg-gray-50 text-gray-600 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">รหัสนักศึกษา</th>
                    <th className="px-6 py-4 font-semibold">ชื่อ-นามสกุล</th>
                    <th className="px-6 py-4 font-semibold">สาขาวิชา</th>
                    <th className="px-6 py-4 font-semibold text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {pendingStudents.map((student) => (
                    <tr key={student.id} className="block md:table-row border-b border-gray-100 hover:bg-gray-50/50 transition p-4 md:p-0 space-y-2 md:space-y-0">
                      <td className="block md:table-cell px-2 py-1 md:px-6 md:py-4 font-medium text-[#1b3860]">
                        <span className="md:hidden font-semibold text-gray-500 mr-2">รหัสนักศึกษา:</span>
                        {student.id}
                      </td>
                      <td className="block md:table-cell px-2 py-1 md:px-6 md:py-4 text-gray-700">
                        <span className="md:hidden font-semibold text-gray-500 mr-2">ชื่อ-นามสกุล:</span>
                        {student.name}
                      </td>
                      <td className="block md:table-cell px-2 py-1 md:px-6 md:py-4 text-gray-600 mb-3 md:mb-0">
                        <span className="md:hidden font-semibold text-gray-500 mr-2">สาขาวิชา:</span>
                        {student.major}
                      </td>
                      <td className="block md:table-cell px-2 py-2 md:px-6 md:py-4 md:text-right flex space-x-2 md:block">
                        <button 
                          onClick={() => handleAccept(student)}
                          className="inline-flex flex-1 md:flex-none justify-center items-center px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-md font-medium transition md:mr-2"
                        >
                          <CheckCircle className="w-4 h-4 mr-1.5" /> อนุมัติ
                        </button>
                        <button 
                          onClick={() => handleReject(student.id)}
                          className="inline-flex flex-1 md:flex-none justify-center items-center px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md font-medium transition"
                        >
                          <XCircle className="w-4 h-4 mr-1.5" /> ไม่อนุมัติ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">ไม่มีคำขอเข้าร่วมรายวิชาใหม่</div>
          )}
        </div>

        {/* Enrolled Students Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h3 className="font-bold text-[#1b3860] flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              รายชื่อนักศึกษาที่ลงทะเบียนสำเร็จ ({enrolledStudents.length})
            </h3>
          </div>
          
          {enrolledStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left block md:table">
                <thead className="hidden md:table-header-group bg-gray-50 text-gray-600 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">รหัสนักศึกษา</th>
                    <th className="px-6 py-4 font-semibold">ชื่อ-นามสกุล</th>
                    <th className="px-6 py-4 font-semibold">สาขาวิชา</th>
                    <th className="px-6 py-4 font-semibold text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {enrolledStudents.map((student) => (
                    <tr key={student.id} className="block md:table-row border-b border-gray-100 hover:bg-gray-50/50 transition p-4 md:p-0 space-y-2 md:space-y-0">
                      <td className="block md:table-cell px-2 py-1 md:px-6 md:py-4 font-medium text-[#1b3860]">
                        <span className="md:hidden font-semibold text-gray-500 mr-2">รหัสนักศึกษา:</span>
                        {student.id}
                      </td>
                      <td className="block md:table-cell px-2 py-1 md:px-6 md:py-4 text-gray-700">
                        <span className="md:hidden font-semibold text-gray-500 mr-2">ชื่อ-นามสกุล:</span>
                        {student.name}
                      </td>
                      <td className="block md:table-cell px-2 py-1 md:px-6 md:py-4 text-gray-600 mb-3 md:mb-0">
                        <span className="md:hidden font-semibold text-gray-500 mr-2">สาขาวิชา:</span>
                        {student.major}
                      </td>
                      <td className="block md:table-cell px-2 py-2 md:px-6 md:py-4 md:text-right flex space-x-2 md:block">
                        <button 
                          className="inline-flex flex-1 md:flex-none justify-center items-center px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md font-medium transition md:mr-2"
                        >
                          <AlertTriangle className="w-4 h-4 mr-1.5 text-orange-500" /> รายงาน
                        </button>
                        <button 
                          onClick={() => setStudentToRemove(student)}
                          className="inline-flex flex-1 md:flex-none justify-center items-center px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-md font-medium transition"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5" /> ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">ยังไม่มีนักศึกษาในรายวิชานี้</div>
          )}
        </div>
      </section>

      {/* Remove Confirmation Modal */}
      {studentToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-[#1b3860]">ยืนยันการลบนักศึกษา</h3>
            </div>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบรายชื่อ <span className="font-semibold text-[#1b3860]">{studentToRemove.name} ({studentToRemove.id})</span> ออกจากรายวิชานี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setStudentToRemove(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition"
              >
                ยกเลิก
              </button>
              <button 
                onClick={confirmRemove}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition shadow-sm"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Custom simple icon wrapper since lucide FileText is imported but not rendered at top level
function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}
