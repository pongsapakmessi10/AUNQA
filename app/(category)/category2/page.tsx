"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext, CloItem, PloItem, ActivityItem, IS_DEV_MODE } from "../../FormContext";
import FormShell from "../../components/FormShell";

export default function Category2Page() {
  const router = useRouter();
  const form = useFormContext();

  useEffect(() => {
    if (!IS_DEV_MODE && !form.isCategory1Valid()) {
      router.replace("/category1");
    }
  }, [form, router]);

  useEffect(() => {
    // Auto-resize textareas
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((t) => {
      t.style.height = "auto";
      t.style.height = `${t.scrollHeight}px`;
    });
  });

  const handlePrev = () => {
    router.push("/category1");
  };

  const handleNext = () => {
    if (IS_DEV_MODE) {
      router.push("/category3");
      return;
    }
    
    const hasEmptyClo = form.clos.some(c => !c.clo.trim() || !c.outcome.trim() || !c.level.trim());
    const hasEmptyPlo = form.plos.some(p => !p.clo.trim() || !p.outcome.trim() || !p.ylo.trim() || !p.plo.trim() || !p.splo.trim());
    const hasEmptyActivity = form.activities.some(a => !a.text.trim());
    
    if (hasEmptyClo || hasEmptyPlo || hasEmptyActivity) {
      alert("กรุณากรอกข้อมูลในหมวดที่ 2 ให้ครบถ้วนทุกช่อง (CLOs, PLOs, และวิธีการประเมิน)");
      return;
    }
    router.push("/category3");
  };

  const addCloRow = () => {
    const newId = Date.now().toString();
    const nextNum = (form.clos.length + 1).toString();
    form.setClos([
      ...form.clos,
      { id: newId, clo: nextNum, outcome: "", level: "" },
    ]);
  };

  const updateClo = (id: string, field: keyof CloItem, value: string) => {
    form.setClos(
      form.clos.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCloRow = (id: string) => {
    form.setClos(form.clos.filter((c) => c.id !== id));
  };

  const addPloRow = () => {
    const newId = Date.now().toString();
    const nextNum = (form.plos.length + 1).toString();
    form.setPlos([
      ...form.plos,
      { id: newId, clo: nextNum, outcome: "", ylo: "", plo: "", splo: "" },
    ]);
  };

  const updatePlo = (id: string, field: keyof PloItem, value: string) => {
    form.setPlos(
      form.plos.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removePloRow = (id: string) => {
    form.setPlos(form.plos.filter((p) => p.id !== id));
  };

  if (!IS_DEV_MODE && !form.isCategory1Valid()) return null; // Wait for redirect

  const thClass =
    "bg-[#1b3860] text-white font-bold px-[8px] py-[10px] border-b-2 border-[#142946] text-left";
  const tdClass =
    "px-[8px] py-[6px] border-b border-gray-200 align-top";
  const inputClass =
    "w-full border border-transparent bg-transparent font-inherit text-[13px] text-gray-700 px-[6px] py-[6px] rounded-[6px] focus:outline-none focus:border-[#d5ae52] focus:bg-white print:border-transparent print:bg-transparent transition-colors duration-200";

  return (
    <FormShell onPrev={handlePrev} onNext={handleNext}>
      {/* หมวดที่ 2 */}
      <div className="py-[26px] px-[36px] border-t border-gray-200">
        <div className="flex items-center gap-[10px] m-0 mb-[18px]">
          <span className="bg-[#d5ae52] text-white font-bold text-[13px] px-[12px] py-[5px] rounded-full">
            หมวดที่ 2
          </span>
          <h2 className="text-[16px] m-0 font-bold text-[#1b3860]">
            จุดมุ่งหมายและผลลัพธ์การเรียนรู้ที่คาดหวัง
          </h2>
        </div>

        <div className="w-full mb-[14px]">
          <label className="font-semibold text-[13px] text-[#1b3860]">
            1. ผลการเรียนรู้ที่คาดหวังของรายวิชา (Course Learning Outcomes; CLOs)
          </label>
        </div>

        <div className="overflow-x-auto mb-[10px]">
          <table className="w-full border-collapse text-[13px] border border-gray-200 rounded-[8px] overflow-hidden">
            <thead>
              <tr>
                <th className={`${thClass} w-[56px] text-center`}>CLO</th>
                <th className={thClass}>ผลลัพธ์การเรียนรู้ (Outcomes)</th>
                <th className={`${thClass} w-[130px]`}>ระดับการเรียนรู้</th>
                <th className={`${thClass} w-[56px] text-center`}></th>
              </tr>
            </thead>
            <tbody>
              {form.clos.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }
                >
                  <td className={tdClass}>
                    <input
                      className={`${inputClass} text-center`}
                      value={item.clo}
                      onChange={(e) => updateClo(item.id, "clo", e.target.value)}
                    />
                  </td>
                  <td className={tdClass}>
                    <textarea
                      rows={1}
                      className={`${inputClass} min-h-[38px] overflow-hidden`}
                      value={item.outcome}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      onChange={(e) =>
                        updateClo(item.id, "outcome", e.target.value)
                      }
                    />
                  </td>
                  <td className={tdClass}>
                    <input
                      className={inputClass}
                      value={item.level}
                      placeholder="เช่น R, U"
                      onChange={(e) =>
                        updateClo(item.id, "level", e.target.value)
                      }
                    />
                  </td>
                  <td className={`${tdClass} text-center`}>
                    <button
                      className="border-none bg-none cursor-pointer text-gray-400 text-[16px] px-[6px] py-[2px] rounded-[6px] hover:text-red-600 hover:bg-gray-100 print:hidden transition-colors"
                      onClick={() => removeCloRow(item.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="inline-flex items-center gap-[6px] bg-white border border-dashed border-[#c29c45] text-[#c29c45] font-semibold text-[13px] px-[14px] py-[8px] rounded-[8px] cursor-pointer font-inherit hover:bg-amber-50 print:hidden transition-colors duration-200"
          onClick={addCloRow}
        >
          + เพิ่มแถว CLO
        </button>
        <p className="text-[12px] text-gray-500 mt-[8px]">
          หมายเหตุ: Remembering (R) / Understanding (U) / Applying (AP) /
          Analyzing (AN) / Evaluating (E) / Creating (C)
        </p>

        <div className="w-full my-[20px] mb-[10px]">
          <label className="font-semibold text-[13px] text-[#1b3860] block mb-[5px]">
            2. ผลลัพธ์การเรียนรู้เมื่อสิ้นปีการศึกษา (Year Learning Outcomes;
            YLOs) ที่สอดคล้องกับ CLOs
          </label>
          <textarea
            rows={3}
            className="font-inherit text-[14px] border border-gray-200 rounded-[8px] px-[11px] py-[9px] bg-gray-50 text-gray-700 w-full focus:outline-none focus:border-[#d5ae52] focus:ring focus:ring-[#d5ae52]/20 focus:bg-white print:border-transparent print:bg-transparent transition-colors duration-200 overflow-hidden"
            placeholder="ระบุ YLOs ที่ CLOs ของรายวิชานี้สอดคล้องด้วย..."
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
        </div>

        <div className="w-full mt-[16px]">
          <label className="font-semibold text-[13px] text-[#1b3860] block mb-[5px]">
            3. ผลลัพธ์การเรียนรู้ระดับหลักสูตร (Program Learning Outcomes; PLOs)
            ที่สอดคล้องกับ CLOs
          </label>
        </div>
        <div className="overflow-x-auto mb-[10px]">
          <table className="w-full border-collapse text-[13px] border border-gray-200 rounded-[8px] overflow-hidden">
            <thead>
              <tr>
                <th className={`${thClass} w-[56px] text-center`}>CLO</th>
                <th className={thClass}>ผลลัพธ์การเรียนรู้ (Outcomes)</th>
                <th className={`${thClass} w-[56px] text-center`}>YLO</th>
                <th className={`${thClass} w-[56px] text-center`}>PLO</th>
                <th className={`${thClass} w-[56px] text-center`}>SPLO</th>
                <th className={`${thClass} w-[56px] text-center`}></th>
              </tr>
            </thead>
            <tbody>
              {form.plos.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }
                >
                  <td className={tdClass}>
                    <input
                      className={`${inputClass} text-center`}
                      value={item.clo}
                      onChange={(e) => updatePlo(item.id, "clo", e.target.value)}
                    />
                  </td>
                  <td className={tdClass}>
                    <textarea
                      rows={1}
                      className={`${inputClass} min-h-[38px] overflow-hidden`}
                      value={item.outcome}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      onChange={(e) =>
                        updatePlo(item.id, "outcome", e.target.value)
                      }
                    />
                  </td>
                  <td className={tdClass}>
                    <input
                      className={`${inputClass} text-center`}
                      value={item.ylo}
                      onChange={(e) => updatePlo(item.id, "ylo", e.target.value)}
                    />
                  </td>
                  <td className={tdClass}>
                    <input
                      className={`${inputClass} text-center`}
                      value={item.plo}
                      onChange={(e) => updatePlo(item.id, "plo", e.target.value)}
                    />
                  </td>
                  <td className={tdClass}>
                    <input
                      className={`${inputClass} text-center`}
                      value={item.splo}
                      onChange={(e) =>
                        updatePlo(item.id, "splo", e.target.value)
                      }
                    />
                  </td>
                  <td className={`${tdClass} text-center`}>
                    <button
                      className="border-none bg-none cursor-pointer text-gray-400 text-[16px] px-[6px] py-[2px] rounded-[6px] hover:text-red-600 hover:bg-gray-100 print:hidden transition-colors"
                      onClick={() => removePloRow(item.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="inline-flex items-center gap-[6px] bg-white border border-dashed border-[#c29c45] text-[#c29c45] font-semibold text-[13px] px-[14px] py-[8px] rounded-[8px] cursor-pointer font-inherit hover:bg-amber-50 print:hidden transition-colors duration-200"
          onClick={addPloRow}
        >
          + เพิ่มแถว PLO
        </button>
      </div>

    </FormShell>
  );
}
