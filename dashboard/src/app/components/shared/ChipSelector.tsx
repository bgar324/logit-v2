type ChipSelectorProps = {
    options: string[];
    selected: string[];
    onChange: (values: string[]) => void;
    allowNoneClear?: boolean;
  };
  
  export default function ChipSelector({ options, selected, onChange, allowNoneClear = true }: ChipSelectorProps) {
    const toggle = (option: string) => {
      const isSelected = selected.includes(option);
      let next = isSelected
        ? selected.filter((val) => val !== option)
        : [...selected.filter((val) => allowNoneClear && val !== "None"), option];
  
      onChange(next);
    };
  
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`px-3 py-1 rounded-full border text-sm ${
              selected.includes(option)
                ? "bg-black text-white"
                : "bg-white border-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
      