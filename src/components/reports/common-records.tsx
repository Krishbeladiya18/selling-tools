import { ChevronDown, ChevronRight } from "lucide-react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/lib/utils";


interface CollapsibleRecordItemProps {
    isOpen: boolean;
    primaryText: string;
  }
  
  export const CollapsibleRecordItem = ({ isOpen, primaryText }: CollapsibleRecordItemProps) => {
    return (
      <CollapsibleTrigger
        className={cn(
          "flex items-center w-full gap-1 py-1.5 pl-2 pr-3 rounded-md",
          isOpen ? "bg-app-primary text-background" : "bg-background hover:bg-app-gray"
        )}
      >
        <div className="flex-1 min-w-0 flex justify-between items-center">
          <h3 className="font-medium text-[15px]">{primaryText}</h3>
        <div className="flex justify-center items-center pt-[1px]">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</div>
        </div>
      </CollapsibleTrigger>
    );
  };