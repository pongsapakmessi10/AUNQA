"use client";

import { useState } from "react";
import { Filter, Calendar, BookOpen, Clock, Target, ChevronDown, ChevronUp } from "lucide-react";

export default function StudentDashboard() {
  const [selectedSemester, setSelectedSemester] = useState("ปี 4 เทอม 2");
  const [showCharacteristics, setShowCharacteristics] = useState(false);
  const semesters = ["ปี 1 เทอม 1", "ปี 1 เทอม 2", "ปี 2 เทอม 1", "ปี 2 เทอม 2", "ปี 3 เทอม 1", "ปี 3 เทอม 2", "ปี 4 เทอม 1", "ปี 4 เทอม 2"];

  // 1. Mock Data: Progress Bars
  const progressData: Record<string, any> = {
    "ปี 1 เทอม 1": {
      plo: [
        { label: "ความรู้ (Knowledge)", percentage: 20 },
        { label: "ทักษะ (Skills)", percentage: 15 },
        { label: "จริยธรรม (Ethics)", percentage: 30 },
        { label: "ลักษณะบุคคล (Characteristics)", percentage: 25 },
        { label: "ภาพรวมทั้งหมด (Overall PLO)", percentage: 22 },
      ],
      credits: {
        label: "สะสมแล้ว 18 / 120 หน่วยกิต",
        percentage: 15,
        history: [{ term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }]
      },
      characteristics: {
        knowledge: [{ label: "K1: Explain SciMath", percentage: 20 }, { label: "K2: Integrate SciMath", percentage: 25 }],
        skills: [{ label: "S1: PerformSciMath", percentage: 15 }, { label: "S2: Select SciMath", percentage: 10 }, { label: "S3: Use language", percentage: 20 }, { label: "S4: AnalyzeSyn", percentage: 15 }, { label: "S5: SciThink", percentage: 10 }, { label: "S6: Digital", percentage: 25 }],
        ethics: [{ label: "E1: Honesty", percentage: 25 }, { label: "E2: Public Mind", percentage: 20 }, { label: "E3: Prof.Ethics", percentage: 30 }],
        personal: [{ label: "C1: Responsibility", percentage: 20 }, { label: "C2: Communication", percentage: 15 }, { label: "C3: Team", percentage: 25 }, { label: "C4: Logic, solve", percentage: 20 }]
      }
    },
    "ปี 1 เทอม 2": {
      plo: [
        { label: "ความรู้ (Knowledge)", percentage: 40 },
        { label: "ทักษะ (Skills)", percentage: 35 },
        { label: "จริยธรรม (Ethics)", percentage: 45 },
        { label: "ลักษณะบุคคล (Characteristics)", percentage: 45 },
        { label: "ภาพรวมทั้งหมด (Overall PLO)", percentage: 41 },
      ],
      credits: {
        label: "สะสมแล้ว 36 / 120 หน่วยกิต",
        percentage: 30,
        history: [{ term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }]
      },
      characteristics: {
        knowledge: [{ label: "K1: Explain SciMath", percentage: 40 }, { label: "K2: Integrate SciMath", percentage: 45 }],
        skills: [{ label: "S1: PerformSciMath", percentage: 35 }, { label: "S2: Select SciMath", percentage: 30 }, { label: "S3: Use language", percentage: 40 }, { label: "S4: AnalyzeSyn", percentage: 35 }, { label: "S5: SciThink", percentage: 30 }, { label: "S6: Digital", percentage: 45 }],
        ethics: [{ label: "E1: Honesty", percentage: 45 }, { label: "E2: Public Mind", percentage: 40 }, { label: "E3: Prof.Ethics", percentage: 50 }],
        personal: [{ label: "C1: Responsibility", percentage: 40 }, { label: "C2: Communication", percentage: 35 }, { label: "C3: Team", percentage: 45 }, { label: "C4: Logic, solve", percentage: 40 }]
      }
    },
    "ปี 2 เทอม 1": {
      plo: [
        { label: "ความรู้ (Knowledge)", percentage: 60 },
        { label: "ทักษะ (Skills)", percentage: 55 },
        { label: "จริยธรรม (Ethics)", percentage: 65 },
        { label: "ลักษณะบุคคล (Characteristics)", percentage: 65 },
        { label: "ภาพรวมทั้งหมด (Overall PLO)", percentage: 61 },
      ],
      credits: {
        label: "สะสมแล้ว 55 / 120 หน่วยกิต",
        percentage: 45,
        history: [{ term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }]
      },
      characteristics: {
        knowledge: [{ label: "K1: Explain SciMath", percentage: 60 }, { label: "K2: Integrate SciMath", percentage: 65 }],
        skills: [{ label: "S1: PerformSciMath", percentage: 55 }, { label: "S2: Select SciMath", percentage: 50 }, { label: "S3: Use language", percentage: 60 }, { label: "S4: AnalyzeSyn", percentage: 55 }, { label: "S5: SciThink", percentage: 50 }, { label: "S6: Digital", percentage: 65 }],
        ethics: [{ label: "E1: Honesty", percentage: 65 }, { label: "E2: Public Mind", percentage: 60 }, { label: "E3: Prof.Ethics", percentage: 70 }],
        personal: [{ label: "C1: Responsibility", percentage: 60 }, { label: "C2: Communication", percentage: 55 }, { label: "C3: Team", percentage: 65 }, { label: "C4: Logic, solve", percentage: 60 }]
      }
    },
    "ปี 2 เทอม 2": {
      plo: [
        { label: "ความรู้ (Knowledge)", percentage: 60 },
        { label: "ทักษะ (Skills)", percentage: 55 },
        { label: "จริยธรรม (Ethics)", percentage: 65 },
        { label: "ลักษณะบุคคล (Characteristics)", percentage: 65 },
        { label: "ภาพรวมทั้งหมด (Overall PLO)", percentage: 61 },
      ],
      credits: {
        label: "สะสมแล้ว 55 / 120 หน่วยกิต",
        percentage: 45,
        history: [{ term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }]
      },
      characteristics: {
        knowledge: [{ label: "K1: Explain SciMath", percentage: 85 }, { label: "K2: Integrate SciMath", percentage: 90 }],
        skills: [{ label: "S1: PerformSciMath", percentage: 80 }, { label: "S2: Select SciMath", percentage: 75 }, { label: "S3: Use language", percentage: 85 }, { label: "S4: AnalyzeSyn", percentage: 80 }, { label: "S5: SciThink", percentage: 75 }, { label: "S6: Digital", percentage: 90 }],
        ethics: [{ label: "E1: Honesty", percentage: 90 }, { label: "E2: Public Mind", percentage: 85 }, { label: "E3: Prof.Ethics", percentage: 95 }],
        personal: [{ label: "C1: Responsibility", percentage: 85 }, { label: "C2: Communication", percentage: 80 }, { label: "C3: Team", percentage: 90 }, { label: "C4: Logic, solve", percentage: 85 }]
      }
    },
    "ปี 3 เทอม 1": {
      plo: [
        { label: "ความรู้ (Knowledge)", percentage: 70 },
        { label: "ทักษะ (Skills)", percentage: 75 },
        { label: "จริยธรรม (Ethics)", percentage: 80 },
        { label: "ลักษณะบุคคล (Characteristics)", percentage: 75 },
        { label: "ภาพรวมทั้งหมด (Overall PLO)", percentage: 75 },
      ],
      credits: {
        label: "สะสมแล้ว 73 / 120 หน่วยกิต", percentage: 60, inProgressPercentage: 0, history: [{ term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 3 เทอม 1", earned: 17, inProgress: 0 }]
      },
      characteristics: {
        knowledge: [{ label: "K1: Explain SciMath", percentage: 90 }, { label: "K2: Integrate SciMath", percentage: 95 }],
        skills: [{ label: "S1: PerformSciMath", percentage: 85 }, { label: "S2: Select SciMath", percentage: 80 }, { label: "S3: Use language", percentage: 90 }, { label: "S4: AnalyzeSyn", percentage: 85 }, { label: "S5: SciThink", percentage: 80 }, { label: "S6: Digital", percentage: 95 }],
        ethics: [{ label: "E1: Honesty", percentage: 95 }, { label: "E2: Public Mind", percentage: 90 }, { label: "E3: Prof.Ethics", percentage: 100 }],
        personal: [{ label: "C1: Responsibility", percentage: 90 }, { label: "C2: Communication", percentage: 85 }, { label: "C3: Team", percentage: 95 }, { label: "C4: Logic, solve", percentage: 90 }]
      }
    },
    "ปี 3 เทอม 2": {
      plo: [
        { label: "ความรู้ (Knowledge)", percentage: 80 },
        { label: "ทักษะ (Skills)", percentage: 85 },
        { label: "จริยธรรม (Ethics)", percentage: 90 },
        { label: "ลักษณะบุคคล (Characteristics)", percentage: 85 },
        { label: "ภาพรวมทั้งหมด (Overall PLO)", percentage: 85 },
      ],
      credits: {
        label: "สะสมแล้ว 90 / 120 หน่วยกิต", percentage: 75, inProgressPercentage: 0, history: [{ term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 3 เทอม 1", earned: 17, inProgress: 0 }, { term: "ปี 3 เทอม 2", earned: 13, inProgress: 0 }]
      },
      characteristics: {
        knowledge: [{ label: "K1: Explain SciMath", percentage: 95 }, { label: "K2: Integrate SciMath", percentage: 100 }],
        skills: [{ label: "S1: PerformSciMath", percentage: 90 }, { label: "S2: Select SciMath", percentage: 85 }, { label: "S3: Use language", percentage: 95 }, { label: "S4: AnalyzeSyn", percentage: 90 }, { label: "S5: SciThink", percentage: 85 }, { label: "S6: Digital", percentage: 100 }],
        ethics: [{ label: "E1: Honesty", percentage: 100 }, { label: "E2: Public Mind", percentage: 95 }, { label: "E3: Prof.Ethics", percentage: 100 }],
        personal: [{ label: "C1: Responsibility", percentage: 95 }, { label: "C2: Communication", percentage: 90 }, { label: "C3: Team", percentage: 100 }, { label: "C4: Logic, solve", percentage: 95 }]
      }
    },
    "ปี 4 เทอม 1": {
      plo: [
        { label: "ความรู้ (Knowledge)", percentage: 90 },
        { label: "ทักษะ (Skills)", percentage: 95 },
        { label: "จริยธรรม (Ethics)", percentage: 95 },
        { label: "ลักษณะบุคคล (Characteristics)", percentage: 95 },
        { label: "ภาพรวมทั้งหมด (Overall PLO)", percentage: 93 },
      ],
      credits: {
        label: "สะสมแล้ว 103 / 120 หน่วยกิต", percentage: 85, inProgressPercentage: 0, history: [{ term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 3 เทอม 1", earned: 17, inProgress: 0 }, { term: "ปี 3 เทอม 2", earned: 13, inProgress: 0 }, { term: "ปี 4 เทอม 1", earned: 6, inProgress: 0 }]
      },
      characteristics: {
        knowledge: [{ label: "K1: Explain SciMath", percentage: 98 }, { label: "K2: Integrate SciMath", percentage: 100 }],
        skills: [{ label: "S1: PerformSciMath", percentage: 93 }, { label: "S2: Select SciMath", percentage: 88 }, { label: "S3: Use language", percentage: 98 }, { label: "S4: AnalyzeSyn", percentage: 93 }, { label: "S5: SciThink", percentage: 88 }, { label: "S6: Digital", percentage: 100 }],
        ethics: [{ label: "E1: Honesty", percentage: 100 }, { label: "E2: Public Mind", percentage: 98 }, { label: "E3: Prof.Ethics", percentage: 100 }],
        personal: [{ label: "C1: Responsibility", percentage: 98 }, { label: "C2: Communication", percentage: 93 }, { label: "C3: Team", percentage: 100 }, { label: "C4: Logic, solve", percentage: 98 }]
      }
    },
    "ปี 4 เทอม 2": {
      plo: [
        { label: "ความรู้ (Knowledge)", percentage: 95, inProgressPercentage: 5 },
        { label: "ทักษะ (Skills)", percentage: 95, inProgressPercentage: 5 },
        { label: "จริยธรรม (Ethics)", percentage: 95, inProgressPercentage: 5 },
        { label: "ลักษณะบุคคล (Characteristics)", percentage: 95, inProgressPercentage: 5 },
        { label: "ภาพรวมทั้งหมด (Overall PLO)", percentage: 95, inProgressPercentage: 5 },
      ],
      credits: {
        label: "สะสมแล้ว 109 / 120 หน่วยกิต", percentage: 95, inProgressPercentage: 5, history: [{ term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 3 เทอม 1", earned: 17, inProgress: 0 }, { term: "ปี 3 เทอม 2", earned: 13, inProgress: 0 }, { term: "ปี 4 เทอม 1", earned: 6, inProgress: 0 }, { term: "ปี 4 เทอม 2", earned: 0, inProgress: 6 }]
      },
      characteristics: {
        knowledge: [{ label: "K1: Explain SciMath", percentage: 95, inProgressPercentage: 5 }, { label: "K2: Integrate SciMath", percentage: 95, inProgressPercentage: 5 }],
        skills: [{ label: "S1: PerformSciMath", percentage: 90, inProgressPercentage: 5 }, { label: "S2: Select SciMath", percentage: 85, inProgressPercentage: 5 }, { label: "S3: Use language", percentage: 95, inProgressPercentage: 5 }, { label: "S4: AnalyzeSyn", percentage: 90, inProgressPercentage: 5 }, { label: "S5: SciThink", percentage: 85, inProgressPercentage: 5 }, { label: "S6: Digital", percentage: 95, inProgressPercentage: 5 }],
        ethics: [{ label: "E1: Honesty", percentage: 95, inProgressPercentage: 5 }, { label: "E2: Public Mind", percentage: 95, inProgressPercentage: 5 }, { label: "E3: Prof.Ethics", percentage: 95, inProgressPercentage: 5 }],
        personal: [{ label: "C1: Responsibility", percentage: 95, inProgressPercentage: 5 }, { label: "C2: Communication", percentage: 90, inProgressPercentage: 5 }, { label: "C3: Team", percentage: 95, inProgressPercentage: 5 }, { label: "C4: Logic, solve", percentage: 95, inProgressPercentage: 5 }]
      }
    },
  };

  // 2. Mock Data: Class Schedule
  const scheduleData: Record<string, any> = {
    "ปี 1 เทอม 1": [
      { day: "จันทร์", time: "09:30 - 12:30", course: "TU108 Self Development and Management", room: "Room 101" },
      { day: "อังคาร", time: "13:30 - 16:30", course: "SC113 General Biology", room: "Room 302" },
      { day: "พุธ", time: "09:30 - 12:30", course: "SC128 General Chemistry", room: "Room 401" },
      { day: "พฤหัสบดี", time: "13:30 - 16:30", course: "MA218 Calculus for Science I", room: "Room 105" },
    ],
    "ปี 1 เทอม 2": [
      { day: "จันทร์", time: "13:30 - 16:30", course: "SC135 General Physics", room: "Lab 2" },
      { day: "อังคาร", time: "09:30 - 12:30", course: "MA209 Calculus and Elem Diff Eq", room: "Room 303" },
      { day: "พุธ", time: "13:30 - 16:30", course: "TU155 Elementary Statistics", room: "Room 402" },
      { day: "พฤหัสบดี", time: "09:30 - 12:30", course: "BEB 100 Principle of Analytical Chemistry", room: "Lab 4" },
    ],
    "ปี 2 เทอม 1": [
      { day: "จันทร์", time: "09:00 - 12:00", course: "BEB 220 Biochemistry", room: "Lab 3" },
      { day: "อังคาร", time: "09:30 - 12:30", course: "BEB 240 Basic Principle in Eng Calc", room: "Room 201" },
      { day: "พุธ", time: "13:30 - 16:30", course: "BEB 241 Unit Operation I", room: "Lab 1" },
      { day: "พฤหัสบดี", time: "09:30 - 12:30", course: "EL296 Academic English", room: "Lab 5" },
    ],
    "ปี 2 เทอม 2": [
      { day: "จันทร์", time: "13:30 - 16:30", course: "BEB 200 Inorganic Chemistry", room: "Lab 2" },
      { day: "อังคาร", time: "09:30 - 12:30", course: "BEB 221 Industrial Microbio", room: "Room 501" },
      { day: "พุธ", time: "09:30 - 12:30", course: "BEB 242 Unit Operation II", room: "Lab 4" },
      { day: "พฤหัสบดี", time: "13:30 - 16:30", course: "TU103 Life and Sustainability", room: "Room 205" },
    ],
    "ปี 3 เทอม 1": [
      { day: "จันทร์", time: "09:30 - 12:30", course: "BEB 300 Instrumental Analysis", room: "Lab 3" },
      { day: "อังคาร", time: "13:30 - 15:30", course: "BEB 341 Math for Biochemical Ind", room: "Room 201" },
      { day: "พุธ", time: "09:30 - 12:30", course: "BEB 342 Chem & Biochem Reactor Design", room: "Room 401" },
      { day: "พฤหัสบดี", time: "09:30 - 11:30", course: "BEB 360 Intro to Biofuel", room: "Room 202" },
    ],
    "ปี 3 เทอม 2": [
      { day: "จันทร์", time: "09:30 - 12:30", course: "BEB 320 Industrial Enzyme Tech", room: "Lab 1" },
      { day: "อังคาร", time: "13:30 - 16:30", course: "BEB 340 Engineering Thermodynamics", room: "Room 302" },
      { day: "พุธ", time: "13:30 - 16:30", course: "LAS101 Critical Thinking", room: "Room 401" },
      { day: "พฤหัสบดี", time: "13:30 - 16:30", course: "TU101 Thailand, ASEAN", room: "Room 105" },
    ],
    "ปี 4 เทอม 1": [
      { day: "จันทร์ - ศุกร์", time: "08:30 - 17:30", course: "BEB 496 Cooperative Education I", room: "Workplace" },
      { day: "อังคาร", time: "09:30 - 12:30", course: "BEB 486 Special Project", room: "Lab 2" },
      { day: "พฤหัสบดี", time: "13:30 - 16:30", course: "BEB xxx Elective course", room: "Room 301" },
    ],
    "ปี 4 เทอม 2": [
      { day: "จันทร์ - ศุกร์", time: "08:30 - 17:30", course: "BEB 497 Cooperative Education II", room: "Workplace" },
      { day: "อังคาร", time: "09:30 - 12:30", course: "BEB 487 Special Project", room: "Lab 2" },
      { day: "พฤหัสบดี", time: "13:30 - 16:30", course: "BEB xxx Elective course", room: "Room 301" },
    ]
  };

  // 3. Mock Data: Grades
  const gradesData = [
    // Year 1 Term 1
    { code: "TU108", name: "Self Development and Management", credits: 3, grade: "A", semester: "ปี 1 เทอม 1" },
    { code: "SC113", name: "General Biology", credits: 3, grade: "B+", semester: "ปี 1 เทอม 1" },
    { code: "SC128", name: "General Chemistry", credits: 3, grade: "A", semester: "ปี 1 เทอม 1" },
    { code: "SC163", name: "General Biology Laboratory", credits: 1, grade: "A", semester: "ปี 1 เทอม 1" },
    { code: "SC173", name: "Fundmental Chemistry Laboratory", credits: 1, grade: "B", semester: "ปี 1 เทอม 1" },
    { code: "MA218", name: "Calculus for Science I", credits: 3, grade: "C+", semester: "ปี 1 เทอม 1" },
    { code: "BEB 140", name: "Basic Engineering Skill Training", credits: 1, grade: "A", semester: "ปี 1 เทอม 1" },
    { code: "XXxxx", name: "Free elective course", credits: 3, grade: "A", semester: "ปี 1 เทอม 1" },

    // Year 1 Term 2
    { code: "SC135", name: "General Physics", credits: 3, grade: "B", semester: "ปี 1 เทอม 2" },
    { code: "SC185", name: "General Physics Laboratory", credits: 1, grade: "A", semester: "ปี 1 เทอม 2" },
    { code: "MA209", name: "Calculus and Elementary Differential Equation", credits: 3, grade: "C+", semester: "ปี 1 เทอม 2" },
    { code: "TU155", name: "Elementary Statistics", credits: 3, grade: "B+", semester: "ปี 1 เทอม 2" },
    { code: "BEB 100", name: "Principle of Analytical Chemistry", credits: 4, grade: "A", semester: "ปี 1 เทอม 2" },
    { code: "BEB 101", name: "Organic Chemistry for Biochemical Industry", credits: 4, grade: "B", semester: "ปี 1 เทอม 2" },

    // Year 2 Term 1
    { code: "BEB 220", name: "Biochemistry and Microbial Physiology", credits: 4, grade: "B+", semester: "ปี 2 เทอม 1" },
    { code: "BEB 240", name: "Basic Principle in Engineering Calculation", credits: 3, grade: "C", semester: "ปี 2 เทอม 1" },
    { code: "BEB 241", name: "Unit Operation in Biochemical Industry I", credits: 3, grade: "B", semester: "ปี 2 เทอม 1" },
    { code: "EL296", name: "Academic English for Science Disciplines 1", credits: 3, grade: "A", semester: "ปี 2 เทอม 1" },
    { code: "TU100", name: "Civic Engagement", credits: 3, grade: "A", semester: "ปี 2 เทอม 1" },
    { code: "TU156", name: "Introduction to Scientific Programming", credits: 3, grade: "B+", semester: "ปี 2 เทอม 1" },

    // Year 2 Term 2
    { code: "BEB 200", name: "Inorganic Chemistry for Biochemical Industry", credits: 4, grade: "A", semester: "ปี 2 เทอม 2" },
    { code: "BEB 221", name: "Industrial Microbiology and Fermentation Technology", credits: 4, grade: "B+", semester: "ปี 2 เทอม 2" },
    { code: "BEB 242", name: "Unit Operation in Biochemical Industry II", credits: 3, grade: "B", semester: "ปี 2 เทอม 2" },
    { code: "BEB 243", name: "Unit Operation Laboratory in Biochemical Industry", credits: 1, grade: "C+", semester: "ปี 2 เทอม 2" },
    { code: "TU103", name: "Life and Sustainability", credits: 3, grade: "A", semester: "ปี 2 เทอม 2" },
    { code: "XXxxx", name: "Free elective course", credits: 3, grade: "B", semester: "ปี 2 เทอม 2" },
    { code: "BEB 290", name: "Industrial Training", credits: 1, grade: "A", semester: "ปี 2 เทอม 2" },

    // Year 3 Term 1
    { code: "BEB 300", name: "Instrumental Analysis", credits: 4, grade: "B+", semester: "ปี 3 เทอม 1" },
    { code: "BEB 341", name: "Mathematics for Biochemical Industry", credits: 2, grade: "B", semester: "ปี 3 เทอม 1" },
    { code: "BEB 342", name: "Chemical and Biochemical Reactor Design", credits: 3, grade: "C+", semester: "ปี 3 เทอม 1" },
    { code: "BEB 360", name: "Introduction to Biofuel and Biochemical Industry", credits: 2, grade: "A", semester: "ปี 3 เทอม 1" },
    { code: "BEBxxx", name: "Required course (CWIE or Research)", credits: 1, grade: "B", semester: "ปี 3 เทอม 1" },
    { code: "BEB 396", name: "Pre-Cooperative Education (Track 1)", credits: 0, grade: "A", semester: "ปี 3 เทอม 1" },
    { code: "BEB 386", name: "Research Methodology (Track 2)", credits: 0, grade: "B+", semester: "ปี 3 เทอม 1" },
    { code: "BEBxxx", name: "Elective course", credits: 3, grade: "B", semester: "ปี 3 เทอม 1" },
    { code: "TU106", name: "Creativity and Communication", credits: 3, grade: "C+", semester: "ปี 3 เทอม 1" },

    // Year 3 Term 2
    { code: "BEB 320", name: "Industrial Enzyme Technology", credits: 3, grade: "A", semester: "ปี 3 เทอม 2" },
    { code: "BEB 340", name: "Engineering Thermodynamics", credits: 3, grade: "B", semester: "ปี 3 เทอม 2" },
    { code: "BEB 343", name: "Process Simulation Laboratory in Biochemical Industry", credits: 1, grade: "A", semester: "ปี 3 เทอม 2" },
    { code: "BEBxxx", name: "Elective course", credits: 3, grade: "B+", semester: "ปี 3 เทอม 2" },
    { code: "LAS101", name: "Critical Thinking, Reading, and Writing", credits: 3, grade: "B", semester: "ปี 3 เทอม 2" },
    { code: "TU101", name: "Thailand, ASEAN, and the World", credits: 3, grade: "C+", semester: "ปี 3 เทอม 2" },

    // Year 4 Term 1
    { code: "BEB 496", name: "Cooperative Education I (Track 1)", credits: 6, grade: "A", semester: "ปี 4 เทอม 1" },
    { code: "BEB 486", name: "Special Project in Bioenergy and Biochemical Refinery Technology 2 (Track 2)", credits: 3, grade: "A", semester: "ปี 4 เทอม 1" },
    { code: "BEB xxx", name: "Elective course (Track 2)", credits: 3, grade: "B+", semester: "ปี 4 เทอม 1" },

    // Year 4 Term 2
    { code: "BEB 497", name: "Cooperative Education II (Track 1)", credits: 6, grade: "", semester: "ปี 4 เทอม 2" },
    { code: "BEB 487", name: "Special Project in Bioenergy and Biochemical Refinery Technology 2 (Track 2)", credits: 3, grade: "", semester: "ปี 4 เทอม 2" },
    { code: "BEB xxx", name: "Elective course (Track 2)", credits: 3, grade: "", semester: "ปี 4 เทอม 2" },
  ];

  // Derived state based on selected semester
  const filteredGrades = gradesData.filter(g => g.semester === selectedSemester);
  const currentProgress = progressData[selectedSemester];
  const currentSchedule = scheduleData[selectedSemester] || [];

  // Calculate GPA and Total Credits
  const gradePoints: Record<string, number> = {
    "A": 4.0, "A-": 3.7, "B+": 3.5, "B": 3.0, "B-": 2.7,
    "C+": 2.5, "C": 2.0, "D+": 1.5, "D": 1.0, "F": 0.0
  };

  const calculateSemesterStats = (grades: any[]) => {
    let totalCredits = 0;
    let totalPoints = 0;
    let calculatedCredits = 0; // Exclude 'S', 'U'

    grades.forEach(g => {
      totalCredits += g.credits;
      if (g.grade in gradePoints) {
        calculatedCredits += g.credits;
        totalPoints += gradePoints[g.grade] * g.credits;
      }
    });

    const gpa = calculatedCredits > 0 ? (totalPoints / calculatedCredits).toFixed(2) : "0.00";
    return { totalCredits, gpa };
  };

  const { totalCredits, gpa } = calculateSemesterStats(filteredGrades);

  // Minimalist, formal progress bar
  const ProgressBar = ({ label, percentage, inProgressPercentage, isHighlight = false, valueText }: { label: string, percentage: number, inProgressPercentage?: number, isHighlight?: boolean, valueText?: React.ReactNode }) => (
    <div className={`mb-3 ${isHighlight ? 'bg-white p-4 rounded-lg border border-gray-200 shadow-sm mt-5' : ''}`}>
      <div className="flex justify-between items-end mb-1.5 gap-2">
        <span 
          className={`font-semibold text-[#1b3860] truncate ${isHighlight ? 'text-base font-bold' : 'text-sm'}`}
          title={label}
        >
          {label}
        </span>
        <span className={`font-semibold text-[#1b3860] whitespace-nowrap shrink-0 ${isHighlight ? 'text-base font-bold' : 'text-[11px] md:text-xs xl:text-sm'}`}>
          {valueText ? valueText : (
            <>{percentage}% {inProgressPercentage ? <span className="text-[#d5ae52] font-medium ml-1">(กำลังศึกษา {inProgressPercentage}%)</span> : ""}</>
          )}
        </span>
      </div>
      <div className={`w-full bg-gray-100 flex overflow-hidden border border-gray-200 h-2.5 rounded-full`}>
        <div
          className={`bg-[#1b3860] transition-all duration-1000 ease-out h-full`}
          style={{ width: `${percentage}%` }}
        ></div>
        {inProgressPercentage && (
          <div
            className={`bg-[#d5ae52] transition-all duration-1000 ease-out h-full`}
            style={{ width: `${inProgressPercentage}%` }}
          ></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6 bg-gray-50/50 min-h-screen">

      {/* Header and Global Filter */}
      <div className="bg-white p-5 md:px-8 md:py-6 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#d5ae52] mb-1">คณะวิทยาศาสตร์และเทคโนโลยี</p>
          <h1 className="text-2xl font-bold text-[#1b3860]">รายงานผลการศึกษา (Academic Report)</h1>
          <p className="text-sm text-gray-500 mt-1">ข้อมูลความก้าวหน้าและผลการเรียนประจำภาคการศึกษา</p>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ภาคการศึกษา</label>
          <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-1.5 bg-gray-50 focus-within:ring-1 focus-within:ring-[#d5ae52] focus-within:border-[#d5ae52] transition-all">
            <Filter className="w-4 h-4 text-[#1b3860]" />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="bg-transparent outline-none text-[#1b3860] font-semibold text-sm cursor-pointer"
            >
              {semesters.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 1: PLO & Credits */}
      <section className="bg-white p-5 md:p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 pb-3">
          <Target className="w-5 h-5 text-[#d5ae52]" />
          <h3 className="text-lg font-bold text-[#1b3860]">ความก้าวหน้าหลักสูตร (Curriculum Progress)</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* PLO Card */}
          <div className="bg-gray-50/50 p-5 md:p-6 rounded-xl border border-gray-200 flex flex-col h-full">
            <h4 className="text-sm font-bold text-[#1b3860] uppercase tracking-wider mb-6 flex items-center space-x-2">
              <Target className="w-4 h-4 text-[#d5ae52]" />
              <span>ผลลัพธ์การเรียนรู้ (PLO)</span>
            </h4>

            <div className="flex-1 flex flex-col">
              {currentProgress.plo.map((item: any, i: number) => {
                const isOverall = item.label.includes("ภาพรวม");
                if (isOverall) {
                  return (
                    <div key={i} className="mt-auto pt-4">
                      <ProgressBar label={item.label} percentage={item.percentage} inProgressPercentage={item.inProgressPercentage} isHighlight={true} />
                    </div>
                  );
                }
                return (
                  <ProgressBar key={i} label={item.label} percentage={item.percentage} inProgressPercentage={item.inProgressPercentage} />
                );
              })}
            </div>
          </div>

          {/* Credits Card */}
          <div className="bg-gray-50/50 p-5 md:p-6 rounded-xl border border-gray-200 flex flex-col h-full">
            <h4 className="text-sm font-bold text-[#1b3860] uppercase tracking-wider mb-6 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#d5ae52]" />
              <span>หน่วยกิตสะสมรายปี (Credits by Year)</span>
            </h4>

            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                {(() => {
                  const years: Record<string, any[]> = {};
                  currentProgress.credits.history.forEach((h: any) => {
                    const yearMatch = h.term.match(/(ปี\s*\d+)/);
                    const yearKey = yearMatch ? yearMatch[1] : h.term;
                    if (!years[yearKey]) years[yearKey] = [];
                    years[yearKey].push(h);
                  });

                  return Object.keys(years).map((yearKey, idx) => {
                    const terms = years[yearKey];
                    const totalEarned = terms.reduce((sum: number, t: any) => sum + t.earned, 0);
                    const totalInProgress = terms.reduce((sum: number, t: any) => sum + t.inProgress, 0);
                    const total = totalEarned + totalInProgress;

                    const valueText = totalEarned > 0 && totalInProgress === 0
                      ? `${total} หน่วยกิต`
                      : <span className="text-[#d5ae52] font-medium">{total} หน่วยกิต (กำลังศึกษา)</span>;

                    return (
                      <div key={idx} className="mb-4">
                        <div className="flex justify-between mb-1.5">
                          <span className="font-semibold text-[#1b3860] text-sm">{yearKey}</span>
                          <span className="font-semibold text-[#1b3860] text-sm">{valueText}</span>
                        </div>
                        <div className="w-full bg-gray-100 flex overflow-hidden border border-gray-200 h-2.5 rounded-full relative group">
                          {terms.map((t: any, i: number) => {
                            const termTotal = t.earned + t.inProgress;
                            const widthPct = (termTotal / total) * 100;
                            const isEarned = t.earned > 0;
                            const bgColor = isEarned
                              ? (i % 2 === 0 ? 'bg-[#1b3860]' : 'bg-[#40689b]')
                              : 'bg-[#d5ae52]';
                            return (
                              <div
                                key={i}
                                className={`${bgColor} h-full border-r-2 border-white/50 last:border-r-0 transition-all duration-1000 ease-out`}
                                style={{ width: `${widthPct}%` }}
                                title={`${t.term}: ${isEarned ? t.earned : t.inProgress} หน่วยกิต`}
                              ></div>
                            );
                          })}
                        </div>
                        <div className="flex space-x-4 mt-1.5">
                          {terms.map((t: any, i: number) => (
                            <div key={i} className="flex items-center space-x-1.5">
                              <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${t.earned > 0 ? (i % 2 === 0 ? 'bg-[#1b3860]' : 'bg-[#40689b]') : 'bg-[#d5ae52]'}`}></div>
                              <span className="text-xs text-gray-500 font-medium">
                                {t.term.replace(/ปี\s*\d+\s*/, '')}: {t.earned > 0 ? t.earned : t.inProgress}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="mt-auto pt-4">
                <ProgressBar
                  label={currentProgress.credits.label}
                  percentage={currentProgress.credits.percentage}
                  inProgressPercentage={currentProgress.credits.inProgressPercentage}
                  isHighlight={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Characteristics */}
      <section className="bg-white p-5 md:p-8 rounded-lg border border-gray-200 shadow-sm lg:col-span-2">
        <button
          onClick={() => setShowCharacteristics(!showCharacteristics)}
          className="w-full flex items-center justify-between border-b border-gray-100 pb-3 cursor-pointer hover:opacity-80 transition group"
        >
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#d5ae52]" />
            <h3 className="text-lg font-bold text-[#1b3860]">การพัฒนาตนเอง (Self Development)</h3>
          </div>
          <div className="text-gray-400 group-hover:text-[#1b3860] transition">
            {showCharacteristics ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showCharacteristics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mt-6 animate-in slide-in-from-top-4 fade-in duration-300">
            {/* Column 1: Knowledge */}
            <div>
              <h4 className="text-sm font-bold text-[#1b3860] uppercase tracking-wider mb-4">ความรู้ (Knowledge)</h4>
              <div className="space-y-1">
                {currentProgress.characteristics.knowledge.map((item: any, i: number) => (
                  <ProgressBar key={`k-${i}`} label={item.label} percentage={item.percentage} inProgressPercentage={item.inProgressPercentage} />
                ))}
              </div>
            </div>

            {/* Column 2: Skills */}
            <div>
              <h4 className="text-sm font-bold text-[#1b3860] uppercase tracking-wider mb-4">ทักษะ (Skills)</h4>
              <div className="space-y-1">
                {currentProgress.characteristics.skills.map((item: any, i: number) => (
                  <ProgressBar key={`s-${i}`} label={item.label} percentage={item.percentage} inProgressPercentage={item.inProgressPercentage} />
                ))}
              </div>
            </div>

            {/* Column 3: Ethics */}
            <div>
              <h4 className="text-sm font-bold text-[#1b3860] uppercase tracking-wider mb-4">จริยธรรม (Ethics)</h4>
              <div className="space-y-1">
                {currentProgress.characteristics.ethics.map((item: any, i: number) => (
                  <ProgressBar key={`e-${i}`} label={item.label} percentage={item.percentage} inProgressPercentage={item.inProgressPercentage} />
                ))}
              </div>
            </div>

            {/* Column 4: Personal Characteristics */}
            <div>
              <h4 className="text-sm font-bold text-[#1b3860] uppercase tracking-wider mb-4">ลักษณะบุคคล (Personal)</h4>
              <div className="space-y-1">
                {currentProgress.characteristics.personal.map((item: any, i: number) => (
                  <ProgressBar key={`c-${i}`} label={item.label} percentage={item.percentage} inProgressPercentage={item.inProgressPercentage} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Section 3: Class Schedule */}
      <section className="bg-white p-5 md:p-8 rounded-lg border border-gray-200 shadow-sm flex flex-col">
        <div className="flex items-center space-x-2 mb-4 border-b border-gray-100 pb-3">
          <Calendar className="w-5 h-5 text-[#d5ae52]" />
          <h3 className="text-lg font-bold text-[#1b3860]">ตารางเรียน (Class Schedule)</h3>
        </div>

        <div className="overflow-x-auto mt-2 flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#1b3860]">
                <th className="py-2.5 px-3 text-[#1b3860] font-bold text-sm whitespace-nowrap">วัน</th>
                <th className="py-2.5 px-3 text-[#1b3860] font-bold text-sm whitespace-nowrap">เวลา</th>
                <th className="py-2.5 px-3 text-[#1b3860] font-bold text-sm">รหัสและชื่อวิชา</th>
                <th className="py-2.5 px-3 text-[#1b3860] font-bold text-sm whitespace-nowrap">ห้องเรียน</th>
              </tr>
            </thead>
            <tbody>
              {currentSchedule.map((schedule: any, idx: number) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                  <td className="py-3 px-3 font-semibold text-[#1b3860] text-sm">{schedule.day}</td>
                  <td className="py-3 px-3 text-gray-600 text-sm">{schedule.time}</td>
                  <td className="py-3 px-3 font-medium text-[#1b3860] text-sm">{schedule.course}</td>
                  <td className="py-3 px-3 text-gray-500 text-sm">{schedule.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>



      {/* Section 4: Grades Table */}
      <section className="bg-white p-5 md:p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-4 border-b border-gray-100 pb-3">
          <Clock className="w-5 h-5 text-[#d5ae52]" />
          <h3 className="text-lg font-bold text-[#1b3860]">ผลการเรียน (Academic Grades)</h3>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#1b3860]">
                <th className="py-3 px-4 text-[#1b3860] font-bold text-sm whitespace-nowrap w-32">รหัสวิชา</th>
                <th className="py-3 px-4 text-[#1b3860] font-bold text-sm w-full">ชื่อวิชา</th>
                <th className="py-3 px-4 text-[#1b3860] font-bold text-sm text-center whitespace-nowrap w-24">หน่วยกิต</th>
                <th className="py-3 px-4 text-[#1b3860] font-bold text-sm text-center whitespace-nowrap w-24">เกรด</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrades.length > 0 ? (
                filteredGrades.map((course, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="py-3 px-4 font-semibold text-[#1b3860] text-sm whitespace-nowrap">{course.code}</td>
                    <td className="py-3 px-4 text-gray-700 text-sm font-medium">{course.name}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm text-center">{course.credits}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-bold text-base ${['F'].includes(course.grade) ? 'text-red-600' : 'text-[#1b3860]'}`}>
                        {course.grade}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 text-sm">
                    ไม่มีข้อมูลสำหรับภาคการศึกษานี้
                  </td>
                </tr>
              )}
            </tbody>
            {filteredGrades.length > 0 && (
              <tfoot>
                <tr className="border-t-2 border-[#1b3860] bg-gray-50/50">
                  <td colSpan={2} className="py-4 px-4 text-right font-bold text-[#1b3860] text-sm">
                    หน่วยกิตประจำภาคเรียน: {totalCredits} &nbsp;&nbsp;หน่วยกิต &nbsp;&nbsp;|&nbsp;&nbsp; เกรดเฉลี่ยประจำภาคเรียน (GPA):
                  </td>
                  <td colSpan={2} className="py-4 px-4 text-left font-bold text-[#d5ae52] text-lg">
                    {gpa}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </section>
    </div>
  );
}
