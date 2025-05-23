import { useState } from "react";

type TagInputProps = {
  value: string[];
  onChange: (newTags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
};

export default function TagInput({ value, onChange, placeholder, maxTags = 5 }: TagInputProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const cleaned = input.trim().toLowerCase();
    if (!cleaned || value.includes(cleaned) || value.length >= maxTags) return;
    onChange([...value, cleaned]);
    setInput("");
  };

  const handleRemove = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-black text-white px-4 py-1 rounded-md"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-200 text-sm rounded-full flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemove(tag)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
