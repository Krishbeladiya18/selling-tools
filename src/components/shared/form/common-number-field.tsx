import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CommonNumericFieldProps {
  name: string;
  label: string;
  placeholder: string;
  control: Control<any>;
  readOnly?: boolean;
  labelStyles?: string;
}

export const CommonNumericField = ({ name, label, placeholder, control, readOnly = false, labelStyles = "" }: CommonNumericFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-y-2">
            <FormLabel className={cn("w-full", labelStyles)}>{label}</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={placeholder}
                className="rounded-md text-sm py-2 px-3 bg-background"
                autoComplete="off"
                readOnly={readOnly}
                {...field}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                }}
                value={field.value ?? ""}
              />
            </FormControl>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
