import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { ClassValue } from "clsx";
import { Checkbox } from "../ui/checkbox";
import { SelectResourceDataRecord } from "@/types/common";

interface SelectDataProps {
  data: SelectResourceDataRecord[];
  isChecked: (id: number) => boolean;
  label: string;
  readOnly?: boolean;
  onChange: (id: number) => void;
  labelStyles?: ClassValue;
}

export const SelectData = ({ data, isChecked, label, readOnly, onChange, labelStyles }: SelectDataProps) => {
  return (
    <section className="w-full flex flex-col gap-y-2.5">
      <Label className={cn("w-full font-bold text-[16px]", labelStyles)}>{label}</Label>

      <div className="w-full flex flex-col gap-y-1">
        {data.map((d) => (
          <div
            key={d.id.toString()}
            className={cn(`w-full h-8 flex items-center space-x-2`, !readOnly && "hover:cursor-pointer")}
            onClick={() => !readOnly && onChange(d.id)}
          >
            <Checkbox
              id={`${label}-${d.id}`}
              checked={isChecked(d.id)}
              disabled={readOnly}
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={() => onChange(d.id)}
            />
            <Label htmlFor={`${label}-${d.id}`} className="cursor-pointer text-[15px]" onClick={(e) => e.stopPropagation()}>
              {d.label}
            </Label>
          </div>
        ))}
      </div>
    </section>
  );
};
