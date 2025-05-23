import { useState } from "react";
import { Info } from "lucide-react";

type TooltipProps = {
  text: string;
};

export default function Tooltip({ text }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
      {show && (
        <div className="absolute z-10 w-64 p-2 text-xs bg-black text-white rounded shadow top-full left-1/2 -translate-x-1/2 mt-1">
          {text}
        </div>
      )}
    </div>
  );
}
