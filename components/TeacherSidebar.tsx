"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, BookOpen, LogOut, ChevronRight, Menu, X, Users, BookMarked } from "lucide-react";

export default function TeacherSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "หน้าหลัก", icon: LayoutDashboard, href: "/teacher/dashboard" },
    { name: "รายวิชา", icon: BookOpen, href: "/teacher/courses" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#1b3860] text-white p-4 sticky top-0 z-40 shadow-md">
        <div className="flex items-center space-x-3">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Emblem_of_Thammasat_University.svg/3840px-Emblem_of_Thammasat_University.svg.png" 
            alt="TU Logo" 
            className="w-8 h-8 object-contain drop-shadow-md" 
          />
          <h2 className="font-bold uppercase tracking-wide text-sm">Teacher Portal</h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 rounded-md hover:bg-white/10 transition-colors focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-[#1b3860] text-white shadow-2xl flex flex-col font-sans border-r border-[#142946] z-50 transform transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header Section */}
        <div className="p-8 flex flex-col items-center border-b border-white/10 bg-[#172f52]/50">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Emblem_of_Thammasat_University.svg/3840px-Emblem_of_Thammasat_University.svg.png" 
            alt="Thammasat University Logo" 
            className="w-20 h-20 object-contain mb-4 drop-shadow-md" 
          />
          <h2 className="text-xl font-bold tracking-wide uppercase text-white">Teacher Portal</h2>
          <div className="w-12 h-1 bg-[#d5ae52] rounded-full mt-3 shadow-[0_0_10px_rgba(213,174,82,0.5)]"></div>
        </div>
        
        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-[#8b9cbd] uppercase tracking-wider mb-4">
            Main Menu
          </p>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#d5ae52] rounded-r-full shadow-[0_0_8px_rgba(213,174,82,0.6)]" />
                  )}
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-[#d5ae52]" : "text-gray-400 group-hover:text-[#d5ae52]"}`} />
                    <span className={`font-medium ${isActive ? "font-semibold" : ""}`}>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#d5ae52] opacity-70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile Section */}
        <div className="p-6 border-t border-white/10 bg-[#172f52]">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#d5ae52] to-[#f4d17f] flex items-center justify-center text-lg font-bold text-[#1b3860] shadow-md ring-2 ring-white/20">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">อ.ดร. อาจารย์ใจดี</p>
              <p className="text-xs text-[#8b9cbd] font-medium mt-0.5 truncate">คณะวิทยาศาสตร์และเทคโนโลยี</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-gray-300 transition-colors text-sm font-medium border border-white/5 hover:border-red-500/20 group cursor-pointer">
            <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>
    </>
  );
}
