import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react"; // optional: any icon

export function TooltipIcon({ message }: { message: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-default inline-flex items-center ml-2">
            <Info className="h-4 w-4 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="text-sm w-fit max-w-xs text-white before:hidden text-wrap" side = "top" sideOffset={5}>
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
