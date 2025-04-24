import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  name: string;
  label: string;
  placeholder: string;
  control: Control<any>;
  readOnly?: boolean;
  labelStyles?: string;
}

export const PasswordField = ({ name, label, placeholder, control, readOnly = false, labelStyles = "" }: PasswordFieldProps) => {
  const [hidden, setHidden] = useState(true);

  const toggleHidePassword = () => {
    setHidden(!hidden);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-y-2">
            <FormLabel className={cn("w-full text-right", labelStyles)}>{label}</FormLabel>

            <div className="relative flex-1">
              <FormControl>
                <Input
                  type={hidden ? "password" : "text"}
                  placeholder={placeholder}
                  className="rounded-md text-sm py-2 px-3"
                  autoComplete="off"
                  readOnly={readOnly}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/\s+/g, ""));
                  }}
                  value={field.value ?? ""}
                />
              </FormControl>

              <span
                className="absolute top-2 right-2 w-5 h-5 flex justify-center items-center opacity-60 hover:cursor-pointer hover:bg-accent"
                onClick={toggleHidePassword}
              >
                {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
