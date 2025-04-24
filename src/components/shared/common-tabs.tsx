import { cn } from "@/lib/utils";
import { memo } from "react";

interface TabRecord {
  value: string;
  label: string;
}

interface CommonTabsProps {
  data: TabRecord[];
  value: string;
  readOnly?: boolean;
  onChange: (value: string) => any;
}

export const CommonTabs = memo(({ data, value, readOnly, onChange }: CommonTabsProps) => {
  return (
    <ul className="w-full flex">
      {data.map((t) => (
        <li
          key={t.value}
          value={t.value}
          className={cn(
            "flex-1 text-center py-2 border-b-[5px] bg-inherit rounded-none font-semibold text-sm hover:cursor-pointer select-none",
            value === t.value ? "text-app-primary border-app-primary bg-none" : "text-app-text-foreground border-input",
            readOnly && "hover:cursor-context-menu text-app-text-foreground"
          )}
          onClick={() => !readOnly && onChange(t.value)}
        >
          {t.label}
        </li>
      ))}
    </ul>
  );
});
