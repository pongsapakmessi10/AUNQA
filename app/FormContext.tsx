"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export const IS_DEV_MODE = true; 


export interface CloItem {
  id: string;
  clo: string;
  outcome: string;
  level: string;
}

export interface PloItem {
  id: string;
  clo: string;
  outcome: string;
  ylo: string;
  plo: string;
  splo: string;
}

export interface ActivityItem {
  id: string;
  text: string;
}

interface FormContextType {
  courseId: string;
  credit: string;
  term: string;
  courseTypes: Record<string, boolean>;
  group: string;
  studyDay: string;
  studyTime: string;
  studyLocation: string;
  instructors: string;
  contact: string;
  extraContact: string;
  consultHours: string;
  descTh: string;
  descEn: string;
  updateDate: string;
  
  clos: CloItem[];
  plos: PloItem[];
  activities: ActivityItem[];
  
  // Update state functions
  setCourseId: (v: string) => void;
  setCredit: (v: string) => void;
  setTerm: (v: string) => void;
  setCourseTypes: (v: Record<string, boolean>) => void;
  setGroup: (v: string) => void;
  setStudyDay: (v: string) => void;
  setStudyTime: (v: string) => void;
  setStudyLocation: (v: string) => void;
  setInstructors: (v: string) => void;
  setContact: (v: string) => void;
  setExtraContact: (v: string) => void;
  setConsultHours: (v: string) => void;
  setDescTh: (v: string) => void;
  setDescEn: (v: string) => void;
  setUpdateDate: (v: string) => void;
  
  setClos: (v: CloItem[]) => void;
  setPlos: (v: PloItem[]) => void;
  setActivities: (v: ActivityItem[]) => void;
  
  // Validation
  isCategory1Valid: () => boolean;
}

const defaultContext: FormContextType = {
  courseId: "",
  credit: "",
  term: "",
  courseTypes: {
    "1": false,
    "2.1": false,
    "2.2": true,
    "2.3": true,
    "2.4": false,
    "3": false,
  },
  group: "",
  studyDay: "",
  studyTime: "",
  studyLocation: "",
  instructors: "ผศ.สมชาย ใจดี",
  contact: "",
  extraContact: "",
  consultHours: "",
  descTh: "",
  descEn: "",
  updateDate: "",
  
  clos: [
    { id: "1", clo: "1", outcome: "อธิบายหลักการและแนวคิดการประเมินวัฏจักรชีวิตของผลิตภัณฑ์ (LCA)", level: "R" },
    { id: "2", clo: "2", outcome: "ใช้ข้อมูลจากปริมาณการปล่อยคาร์บอน เพื่อตัดสินใจเลือกผลิตภัณฑ์ที่มีผลกระทบสิ่งแวดล้อมน้อยกว่า", level: "R, U" },
    { id: "3", clo: "3", outcome: "วิเคราะห์ร่องรอยคาร์บอน ร่องรอยการใช้น้ำ ร่องรอยเชิงนิเวศ เพื่อกำหนดแนวทางการดำเนินการให้ลดผลกระทบต่อสิ่งแวดล้อม", level: "R, U, AN" }
  ],
  plos: [
    { id: "1", clo: "1", outcome: "อธิบายหลักการและแนวคิดการประเมินวัฏจักรชีวิตของผลิตภัณฑ์ (LCA)", ylo: "3", plo: "1", splo: "1.2" },
    { id: "2", clo: "2", outcome: "ใช้ข้อมูลจากปริมาณการปล่อยคาร์บอน เพื่อตัดสินใจเลือกผลิตภัณฑ์ที่มีผลกระทบสิ่งแวดล้อมน้อยกว่า", ylo: "3", plo: "1", splo: "1.2" }
  ],
  activities: [
    { id: "1", text: "การสอบ" },
    { id: "2", text: "การทำรายงาน" },
    { id: "3", text: "บรรยาย" },
    { id: "4", text: "ยกตัวอย่างกรณีศึกษา" },
    { id: "5", text: "การบ้าน" }
  ],

  setCourseId: () => {},
  setCredit: () => {},
  setTerm: () => {},
  setCourseTypes: () => {},
  setGroup: () => {},
  setStudyDay: () => {},
  setStudyTime: () => {},
  setStudyLocation: () => {},
  setInstructors: () => {},
  setContact: () => {},
  setExtraContact: () => {},
  setConsultHours: () => {},
  setDescTh: () => {},
  setDescEn: () => {},
  setUpdateDate: () => {},
  setClos: () => {},
  setPlos: () => {},
  setActivities: () => {},
  isCategory1Valid: () => false,
};

const FormContext = createContext<FormContextType>(defaultContext);

export function FormProvider({ children }: { children: ReactNode }) {
  const [courseId, setCourseId] = useState("");
  const [credit, setCredit] = useState("");
  const [term, setTerm] = useState("");
  const [courseTypes, setCourseTypes] = useState<Record<string, boolean>>({
    "1": false,
    "2.1": false,
    "2.2": true,
    "2.3": true,
    "2.4": false,
    "3": false,
  });
  const [group, setGroup] = useState("");
  const [studyDay, setStudyDay] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [studyLocation, setStudyLocation] = useState("");
  const [instructors, setInstructors] = useState("ผศ.สมชาย ใจดี");
  const [contact, setContact] = useState("");
  const [extraContact, setExtraContact] = useState("");
  const [consultHours, setConsultHours] = useState("");
  const [descTh, setDescTh] = useState("");
  const [descEn, setDescEn] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  const [clos, setClos] = useState<CloItem[]>(defaultContext.clos);
  const [plos, setPlos] = useState<PloItem[]>(defaultContext.plos);
  const [activities, setActivities] = useState<ActivityItem[]>(defaultContext.activities);

  const isCategory1Valid = () => {
    const [start, end] = studyTime.split(" - ");
    const isTimeValid = !!(start?.trim() && end?.trim());

    return (
      courseId.trim() !== "" &&
      credit.trim() !== "" &&
      term.trim() !== "" &&
      group.trim() !== "" &&
      studyDay.trim() !== "" &&
      isTimeValid &&
      studyLocation.trim() !== "" &&
      instructors.trim() !== "" &&
      descTh.trim() !== "" &&
      descEn.trim() !== ""
    );
  };

  return (
    <FormContext.Provider
      value={{
        courseId,
        credit,
        term,
        courseTypes,
        group,
        studyDay,
        studyTime,
        studyLocation,
        instructors,
        contact,
        extraContact,
        consultHours,
        descTh,
        descEn,
        updateDate,
        clos,
        plos,
        activities,
        setCourseId,
        setCredit,
        setTerm,
        setCourseTypes,
        setGroup,
        setStudyDay,
        setStudyTime,
        setStudyLocation,
        setInstructors,
        setContact,
        setExtraContact,
        setConsultHours,
        setDescTh,
        setDescEn,
        setUpdateDate,
        setClos,
        setPlos,
        setActivities,
        isCategory1Valid,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}

