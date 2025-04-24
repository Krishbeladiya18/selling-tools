import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { INFO_MSG } from "@/utils/messages";
import { NoDataFound } from "../no-data-found";
import { SelectOptionRecord, SelectResourceDataRecord } from "@/types/common";
import { Checkbox } from "@/components/ui/checkbox";

interface CommonMultiResourceSelectMenuProps {
  data: SelectResourceDataRecord[];
  values: number[];
  label: string;
  placeholder: string;
  readOnly?: boolean;
  onChange: (values: number[]) => void;
  noDataMessgae?: string;
  labelStyles?: string;
}

export const CommonMultiResourceSelectMenu = ({
  data,
  values,
  label,
  placeholder,
  readOnly,
  onChange,
  labelStyles,
  noDataMessgae = INFO_MSG.NO_DATA_FOUND,
}: CommonMultiResourceSelectMenuProps) => {
  const handleToggle = (id: number) => {
    if (values.includes(id)) {
      onChange(values.filter((value) => value !== id));
    } else {
      onChange([...values, id]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      {/* Label */}
      <Label className={cn("w-full", labelStyles)}>{label}</Label>

      {/* Popover Trigger and Content */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="min-h-10 w-full rounded-md text-sm py-2 px-3 border border-gray-300 bg-background text-left focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={readOnly}
          >
            {values.length > 0 ? (
              // Display selected labels if any
              data
                .filter((item) => values.includes(item.id))
                .map((item) => item.label)
                .join(", ")
            ) : (
              // Display placeholder if no selection
              <span className="text-gray-500">{placeholder}</span>
            )}
          </button>
        </PopoverTrigger>

        {!readOnly && (
          <PopoverContent side="bottom" align="start" className="p-2 max-h-[40vh] overflow-y-auto">
            {!data.length ? (
              <NoDataFound message={noDataMessgae} />
            ) : (
              data.map((item) => (
                <div
                  key={item.id.toString()}
                  className={cn(`h-8 w-full flex items-center space-x-2`, !readOnly && "hover:cursor-pointer")}
                  onClick={() => !readOnly && handleToggle(item.id)}
                >
                  <Checkbox
                    id={`${label}-${item.id}`}
                    checked={values.includes(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => handleToggle(item.id)}
                  />
                  <Label htmlFor={`${label}-${item.id}`} className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
                    {item.label}
                  </Label>
                </div>
              ))
            )}
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

interface CommonMultiSelectMenuProps {
  data: SelectOptionRecord[];
  values: string[];
  label: string;
  placeholder: string;
  readOnly?: boolean;
  onChange: (values: string[]) => void;
  noDataMessgae?: string;
  labelStyles?: string;
}

export const CommonMultiSelectMenu = ({
  data,
  values,
  label,
  placeholder,
  readOnly,
  onChange,
  labelStyles,
  noDataMessgae = INFO_MSG.NO_DATA_FOUND,
}: CommonMultiSelectMenuProps) => {
  const handleToggle = (v: string) => {
    if (values.includes(v)) {
      onChange(values.filter((value) => value !== v));
    } else {
      onChange([...values, v]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      {/* Label */}
      <Label className={cn("w-full", labelStyles)}>{label}</Label>

      {/* Popover Trigger and Content */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="min-h-10 w-full rounded-md text-sm py-2 px-3 border border-gray-300 bg-background text-left focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={readOnly}
          >
            {values.length > 0 ? (
              // Display selected labels if any
              data
                .filter((item) => values.includes(item.value))
                .map((item) => item.label)
                .join(", ")
            ) : (
              // Display placeholder if no selection
              <span className="text-gray-500">{placeholder}</span>
            )}
          </button>
        </PopoverTrigger>

        {!readOnly && (
          <PopoverContent side="bottom" align="start" className="p-2 max-h-[40vh] overflow-y-auto">
            {!data.length ? (
              <NoDataFound message={noDataMessgae} />
            ) : (
              data.map((item) => (
                <div
                  key={item.value}
                  className={cn(`h-8 w-full flex items-center space-x-2`, !readOnly && "hover:cursor-pointer")}
                  onClick={() => !readOnly && handleToggle(item.value)}
                >
                  <Checkbox
                    id={`${label}-${item.value}`}
                    checked={values.includes(item.value)}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => handleToggle(item.value)}
                  />
                  <Label htmlFor={`${label}-${item.value}`} className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
                    {item.label}
                  </Label>
                </div>
              ))
            )}
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};
