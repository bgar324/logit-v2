// components/shared/Dropdown.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // adjust if you customized shadcn paths

type DropdownProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (val: T) => void;
  placeholder?: string;
  required?: boolean;
};

export default function Dropdown<T extends string>({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
}: DropdownProps<T>) {
  return (
    <div className="space-y-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 transition focus-within:ring-2 ring-white/20 ">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Select
        value={value ?? ""}
        onValueChange={(val) => onChange(val as T)}
      >
        <SelectTrigger className="w-full p-3 rounded-md border border-gray-300 bg-white/5 text-base">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-neutral-900 text-white border border-white/10">
          {options.map((opt) => (
            <SelectItem
              key={opt}
              value={opt}
              className="hover:bg-white/10 cursor-pointer"
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
