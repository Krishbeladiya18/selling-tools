import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";
import { ClassValue } from "clsx";

interface DataLoaderProps {
  dataPresent?: boolean;
  className?: ClassValue;
}

export const DataLoader = ({ dataPresent, className }: DataLoaderProps) => {
  return (
    <div className={cn("flex justify-center", !dataPresent && "py-6", className)}>
      <Spinner size={36} color="var(--app-primary)" />
    </div>
  );
};
