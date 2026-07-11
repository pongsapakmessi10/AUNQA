import React from "react";
import { EvaluationConfig } from "../../../FormContext";

export function ConfigurableEvaluationItem({
  title,
  targetPercent,
  config,
  onChange,
  showErrors,
}: {
  title: string;
  targetPercent: number;
  config: EvaluationConfig;
  onChange: (newConfig: EvaluationConfig) => void;
  showErrors?: boolean;
}) {
  const currentTotal = config.items.reduce(
    (sum, item) => sum + (parseFloat(item.proportion) || 0),
    0
  );
  const isValid = config.items.length === 0 || currentTotal === targetPercent;

  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countStr = e.target.value;
    const num = parseInt(countStr) || 0;
    const newItems = [...config.items];
    if (num > newItems.length) {
      for (let i = newItems.length; i < num; i++) {
        newItems.push({
          id: Date.now().toString() + i,
          method: "",
          proportion: "",
        });
      }
    } else {
      newItems.splice(num);
    }
    onChange({ ...config, count: countStr, items: newItems });
  };

  const handleItemChange = (
    index: number,
    field: "method" | "proportion",
    value: string
  ) => {
    const newItems = [...config.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...config, items: newItems });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-[8px] p-[16px] mb-[16px] shadow-sm">
      <div className="flex justify-between items-center mb-[12px]">
        <h4 className="text-[14px] font-bold text-[#1b3860]">
          {title} ({targetPercent}%)
        </h4>
        <div className="flex items-center gap-[8px]">
          <label className="text-[13px] text-gray-600 font-semibold">
            จำนวนครั้ง:
          </label>
          <select
            className="border border-gray-200 rounded-[6px] px-[8px] py-[4px] text-[13px] outline-none focus:border-gray-400 bg-gray-50"
            value={config.count}
            onChange={handleCountChange}
          >
            <option value="">0</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onChange({ count: "", items: [] })}
            className="ml-[4px] text-[12px] text-[#d5ae52] hover:text-red-700 bg-white hover:bg-yellow-200 cursor-pointer px-[8px] py-[4px] rounded-[4px] transition-colors border border-red-100"
          >
            รีเซ็ต
          </button>
        </div>
      </div>

      {config.items.length > 0 && (
        <div className="mt-[12px]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px] border border-gray-200 rounded-[8px] overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-[8px] py-[8px] border-b border-gray-200 text-center font-semibold text-[#1b3860] w-[60px]">
                    ครั้งที่
                  </th>
                  <th className="px-[8px] py-[8px] border-b border-gray-200 text-left font-semibold text-[#1b3860]">
                    วิธีการประเมินผล
                  </th>
                  <th className="px-[8px] py-[8px] border-b border-gray-200 text-center font-semibold text-[#1b3860] w-[140px]">
                    สัดส่วน (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.items.map((item, index) => (
                  <tr key={item.id} className="bg-white">
                    <td className="px-[8px] py-[6px] border-b border-gray-200 text-center font-medium text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-[8px] py-[6px] border-b border-gray-200">
                      <input
                        className={`w-full border rounded-[4px] px-[8px] py-[6px] outline-none transition-colors ${
                          showErrors && !item.method.trim()
                            ? "border-yellow-500 bg-yellow-50 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20"
                            : "border-gray-200 focus:border-gray-400 focus:bg-white bg-gray-50 text-gray-700"
                        }`}
                        placeholder="ระบุวิธีการ..."
                        value={item.method}
                        onChange={(e) =>
                          handleItemChange(index, "method", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-[8px] py-[6px] border-b border-gray-200 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className={`w-full border rounded-[4px] px-[8px] py-[6px] outline-none text-center transition-colors ${
                          !isValid
                            ? "border-yellow-500 bg-yellow-50 focus:border-yellow-500 text-yellow-700 focus:ring focus:ring-yellow-500/20"
                            : "border-gray-200 bg-gray-50 text-gray-700 focus:bg-white focus:border-gray-400"
                        }`}
                        value={item.proportion}
                        onChange={(e) =>
                          handleItemChange(index, "proportion", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isValid && (
            <p className="text-yellow-600 text-[12px] mt-[8px] font-medium flex items-center justify-end gap-[4px]">
              สัดส่วนรวมต้องเท่ากับ {targetPercent}% (ปัจจุบันรวม {currentTotal}%)
            </p>
          )}
        </div>
      )}
    </div>
  );
}
