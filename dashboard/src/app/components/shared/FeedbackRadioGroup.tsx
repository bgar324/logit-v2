type FeedbackRadioGroupProps = {
    selected: string | null;
    onChange: (val: string) => void;
  };
  
  const options = [
    { value: "detailed", label: "Detailed – In-depth suggestions" },
    { value: "concise", label: "Concise – Short summaries" },
    { value: "skip", label: "Skip this" },
  ];
  
  export default function FeedbackRadioGroup({ selected, onChange }: FeedbackRadioGroupProps) {
    return (
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="feedback"
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    );
  }
  