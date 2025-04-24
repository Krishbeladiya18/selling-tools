import { format } from "date-fns";
import { Control } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { CONSTANTS } from "@/utils/constants";

interface CommonInputDateProps {
  name: string;
  label: string;
  placeholder: string;
  control: Control<any>;
  disabled?: boolean;
  labelStyles?: string;
}

export const CommonInputDate = ({ name, label, placeholder, control, disabled = false, labelStyles = "" }: CommonInputDateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-y-2">
            <FormLabel className={cn("w-full", labelStyles)}>{label}</FormLabel>

            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild disabled={disabled}>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-10 justify-between text-left text-foreground border border-input rounded-md font-semibold",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? format(field.value, CONSTANTS.COMMON_DAY_FORMAT) : <span>{placeholder}</span>}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    if (date) setIsOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
