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
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 transition focus-within:ring-2 ring-white/20 space-y-2">
        <label className="block text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value as T)}
          required={required}
          className="w-full p-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt: T) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }