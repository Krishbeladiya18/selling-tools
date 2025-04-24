import { ChevronDown, ChevronRight } from "lucide-react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleRecordItemProps {
  isOpen: boolean;
  primaryText: string;
  secondaryText: string;
}

export const CollapsibleRecordItem = ({ isOpen, primaryText, secondaryText }: CollapsibleRecordItemProps) => {
  return (
    <CollapsibleTrigger
      className={cn(
        "flex items-center w-full gap-1 py-1.5 pl-2 pr-3 rounded-md",
        isOpen ? "bg-app-primary text-background" : "bg-background hover:bg-app-gray"
      )}
    >
      <div className="flex justify-center items-center pt-[1px]">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</div>
      <div className="flex-1 min-w-0 flex justify-between items-center">
        <h3 className="font-medium text-[15px]">{primaryText}</h3>
        <p className="text-sm font-semibold">{secondaryText}</p>
      </div>
    </CollapsibleTrigger>
  );
};

interface CollapsibleRecordSubItemProps {
  primaryText: string;
  secondaryText: string;
}

export const CollapsibleItemSubItem = ({ primaryText, secondaryText }: CollapsibleRecordSubItemProps) => {
  return (
    <li className="flex justify-between items-center py-1.5 px-3">
      <h4 className="text-sm font-semibold">{primaryText}</h4>
      <p className="text-sm font-semibold text-app-text-foreground">{secondaryText}</p>
    </li>
  );
};
