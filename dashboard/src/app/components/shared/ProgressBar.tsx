type ProgressBarProps = {
    current: number;
    total: number;
  };
  
  export default function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = (current / total) * 100;
  
    return (
      <div className="w-full mb-6">
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>Step {current} of {total}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
          <div
            className="bg-white h-2 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
  