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
      <div className="space-y-2">
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