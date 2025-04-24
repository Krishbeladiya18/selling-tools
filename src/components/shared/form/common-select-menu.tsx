import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { memo, useEffect } from "react";
import { NoDataFound } from "../no-data-found";
import { INFO_MSG } from "@/utils/messages";
import { SelectOptionRecord, SelectResourceDataRecord } from "@/types/common";
import { Input } from "@/components/ui/input";

interface CommonResourceSelectMenuProps {
  data: SelectResourceDataRecord[];
  value: string | undefined;
  label: string;
  placeholder: string;
  readOnly?: boolean;
  onChange: (value: number) => void;
  autoSelect?: boolean;
  noDataMessgae?: string;
  labelStyles?: string;
}

export const CommonResourceSelectMenu = memo(
  ({
    data,
    value,
    label,
    placeholder,
    readOnly,
    onChange,
    autoSelect = false,
    labelStyles,
    noDataMessgae = INFO_MSG.NO_DATA_FOUND,
  }: CommonResourceSelectMenuProps) => {
    const handleChange = (value: string) => {
      if (value) onChange(Number(value));
    };

    useEffect(() => {
      if (autoSelect && data.length === 1) {
        onChange(data[0].id);
      }
    }, [data, autoSelect]);

    if (autoSelect && data.length === 1) {
      const selectedCompanyName = value ? data.find((d) => d.id === Number(value))?.label : "";
      return (  
        <div className="flex flex-col gap-y-2">
          <Label className={cn("w-full", labelStyles)}>{label}</Label>
          <Input
            value={selectedCompanyName}
            readOnly
            className={cn("h-9 w-full rounded-md text-sm py-2 px-3 bg-background select-none cursor-context-menu")}
          />
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col gap-y-2">
        <Label className={cn("w-full", labelStyles)}>{label}</Label>

        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger
            className={cn("h-10 w-full rounded-md text-sm py-2 px-3 bg-background select-none", readOnly && "cursor-context-menu")}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          {!readOnly && (
            <SelectContent side="bottom" align="end" className="max-h-48">
              {!data.length ? (
                <NoDataFound message={noDataMessgae} />
              ) : (
                data.map((d) => (
                  <SelectItem key={d.id.toString()} value={d.id.toString()}>
                    {d.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          )}
        </Select>
      </div>
    );
  }
);

interface CommonSelectMenuProps {
  data: SelectOptionRecord[];
  value: string | undefined;
  label: string;
  placeholder: string;
  readOnly?: boolean;
  onChange: (value: string) => void;
  noDataMessgae?: string;
  labelStyles?: string;
}

export const CommonSelectMenu = memo(
  ({ data, value, label, placeholder, readOnly, onChange, labelStyles, noDataMessgae = INFO_MSG.NO_DATA_FOUND }: CommonSelectMenuProps) => {
    const handleChange = (value: string) => {
      if (value) onChange(value);
    };

    return (
      <div className="w-full flex flex-col gap-y-2">
        <Label className={cn("w-full", labelStyles)}>{label}</Label>

        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger
            className={cn("h-10 w-full rounded-md text-sm py-2 px-3 bg-background select-none", readOnly && "cursor-context-menu")}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          {!readOnly && (
            <SelectContent side="bottom" align="end" className="max-h-48">
              {!data.length ? (
                <NoDataFound message={noDataMessgae} />
              ) : (
                data.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          )}
        </Select>
      </div>
    );
  }
);
