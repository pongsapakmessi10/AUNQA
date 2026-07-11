import React from "react";
import { EvaluationSubItem } from "../../../FormContext";

export function EvaluationSummaryTable({ form, showErrors }: { form: any, showErrors?: boolean }) {
  const allItems = [
    { id: "midterm", groupName: "สอบกลางภาค (2 ชั่วโมง)", method: "", proportion: form.gradingPattern === "1" ? "25" : "30" },
    { id: "final", groupName: "สอบปลายภาค (3 ชั่วโมง)", method: "", proportion: form.gradingPattern === "1" ? "35" : "30" },
    ...form.evaluationData.quiz.items.map((i: EvaluationSubItem) => ({ ...i, groupName: "แบบทดสอบย่อย" })),
    ...form.evaluationData.homework.items.map((i: EvaluationSubItem) => ({ ...i, groupName: "การบ้าน" })),
    ...form.evaluationData.activity.items.map((i: EvaluationSubItem) => ({ ...i, groupName: "กิจกรรมในชั้นเรียน" }))
  ];

  const rowCount = allItems.length;
  let order = [...form.summaryRowOrder];
  if (order.length !== rowCount) {
    order = Array(rowCount).fill("");
  }

  const rows = Array(rowCount).fill(null).map((_, index) => {
    const selectedId = order[index] || "";
    const selectedItem = allItems.find(i => i.id === selectedId);
    return { index, selectedId, selectedItem };
  });

  const totalProportion = rows.reduce((sum, row) => {
    if (row.selectedItem) {
      return sum + (parseFloat(row.selectedItem.proportion) || 0);
    }
    return sum;
  }, 0);

  return (
    <div className="mt-[32px] pt-[24px] border-t border-gray-200">
      <h3 className="text-[15px] font-bold text-[#1b3860] mb-[16px]">
        สรุปแผนการประเมินผลการเรียนรู้
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px] border border-gray-200 rounded-[8px] overflow-hidden">
          <thead>
            <tr className="bg-[#1b3860] text-white">
              <th className="px-[12px] py-[10px] text-left w-[25%] border-r border-[#2a4d7d]">กิจกรรมการประเมินผลการเรียนรู้</th>
              <th className="px-[12px] py-[10px] text-center w-[10%] border-r border-[#2a4d7d]">ร้อยละของคะแนน</th>
              <th className="px-[12px] py-[10px] text-center w-[20%] border-r border-[#2a4d7d]">ช่วงเวลาประเมิน</th>
              <th className="px-[12px] py-[10px] text-center w-[25%] border-r border-[#2a4d7d]">CLOS</th>
              <th className="px-[12px] py-[10px] text-center w-[20%]">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ index, selectedId, selectedItem }) => {
              const summary = selectedItem 
                ? (form.evaluationSummaries[selectedItem.id] || { id: selectedItem.id, evalTime: "", selectedClos: [], note: "" })
                : null;
              
              const updateSummary = (field: string, value: any) => {
                if (!selectedItem) return;
                form.setEvaluationSummaries({
                  ...form.evaluationSummaries,
                  [selectedItem.id]: { ...summary, [field]: value }
                });
              };

              const toggleClo = (cloId: string) => {
                if (!summary) return;
                const newClos = summary.selectedClos.includes(cloId)
                  ? summary.selectedClos.filter((c: string) => c !== cloId)
                  : [...summary.selectedClos, cloId];
                updateSummary("selectedClos", newClos);
              };

              return (
                <tr key={`row-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-[12px] py-[10px] border-b border-r border-gray-200">
                    <select
                      className={`w-full border rounded-[6px] px-[4px] py-[6px] text-[13px] outline-none transition-colors ${
                        showErrors && !selectedId
                          ? "border-yellow-500 bg-yellow-50 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 text-yellow-700"
                          : "border-gray-300 focus:border-gray-400"
                      }`}
                      value={selectedId || ""}
                      onChange={(e) => {
                        const newOrder = [...order];
                        newOrder[index] = e.target.value;
                        form.setSummaryRowOrder(newOrder);
                      }}
                    >
                      <option value="">-- เลือกกิจกรรม --</option>
                      {allItems.map(opt => {
                         const isSelectedElsewhere = order.some((id, i) => i !== index && id === opt.id);
                         if (isSelectedElsewhere) return null;
                         return (
                           <option key={opt.id} value={opt.id}>
                             {opt.groupName} - {opt.method}
                           </option>
                         );
                      })}
                    </select>
                  </td>
                  <td className="px-[12px] py-[10px] border-b border-r border-gray-200 text-center font-semibold text-[#1b3860]">
                    {selectedItem ? `${selectedItem.proportion}%` : "-"}
                  </td>
                  <td className="px-[12px] py-[10px] border-b border-r border-gray-200 align-top">
                    <input
                      className={`w-full border rounded-[6px] px-[8px] py-[6px] text-[13px] outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        showErrors && summary && !summary.evalTime.trim()
                          ? "border-yellow-500 bg-yellow-50 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20"
                          : "border-gray-300 focus:border-gray-400"
                      }`}
                      placeholder="เช่น สัปดาห์ที่ 5"
                      value={summary ? summary.evalTime : ""}
                      onChange={(e) => updateSummary("evalTime", e.target.value)}
                      disabled={!selectedItem}
                    />
                  </td>
                  <td className="px-[12px] py-[10px] border-b border-r border-gray-200 align-top">
                    <div className="flex flex-wrap gap-[8px] justify-center">
                      {form.plos.map((plo: any) => (
                        <label key={plo.id} className={`flex items-center gap-[4px] cursor-pointer hover:text-[#d5ae52] ${
                          !selectedItem ? 'opacity-50 cursor-not-allowed text-gray-700' :
                          (showErrors && summary && summary.selectedClos.length === 0 ? 'text-yellow-600 font-semibold' : 'text-gray-700')
                        }`}>
                          <input
                            type="checkbox"
                            checked={summary ? summary.selectedClos.includes(plo.id) : false}
                            onChange={() => toggleClo(plo.id)}
                            className="accent-[#d5ae52] w-[14px] h-[14px] cursor-pointer"
                            disabled={!selectedItem}
                          />
                          CLO {plo.clo}
                        </label>
                      ))}
                    </div>
                  </td>
                  <td className="px-[12px] py-[10px] border-b border-gray-200 align-top">
                    <textarea
                      rows={2}
                      className="w-full border border-gray-300 rounded-[6px] px-[8px] py-[6px] text-[13px] outline-none focus:border-gray-400 resize-y disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="หมายเหตุ"
                      value={summary ? summary.note : ""}
                      onChange={(e) => updateSummary("note", e.target.value)}
                      disabled={!selectedItem}
                    />
                  </td>
                </tr>
              );
            })}
            <tr className="bg-[#f8f9fa] border-t-2 border-[#1b3860]">
              <td className="px-[12px] py-[10px] border-b border-r border-gray-200 text-right font-bold text-[#1b3860]">
                รวม
              </td>
              <td className="px-[12px] py-[10px] border-b border-r border-gray-200 text-center font-bold text-[#1b3860]">
                {totalProportion}%
              </td>
              <td colSpan={3} className="px-[12px] py-[10px] border-b border-gray-200 bg-[#f8f9fa]"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
