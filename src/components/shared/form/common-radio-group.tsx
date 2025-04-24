import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { SelectOptionRecord } from "@/types/common";

interface CommonRadioGroupProps {
  data: SelectOptionRecord[];
  value: string;
  readOnly?: boolean;
  onChange: (value: string) => void;
  labelStyles?: string;
}

export const CommonRadioGroup = ({ data, value, readOnly, onChange, labelStyles }: CommonRadioGroupProps) => {
  return (
    <RadioGroup value={value} className="flex flex-col gap-y-2.5" onValueChange={(v) => onChange(v)}>
      {data.map((d) => (
        <div key={d.value} className="flex items-center space-x-2">
          <RadioGroupItem value={d.value} id={d.value} disabled={readOnly} />
          <Label
            htmlFor={d.value}
            className={cn("hover:cursor-pointer", readOnly && "hover:cursor-context-menu text-app-text-foreground", labelStyles)}
          >
            {d.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
