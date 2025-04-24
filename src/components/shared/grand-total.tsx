import { cn } from "@/lib/utils";
import { CONSTANTS } from "@/utils/constants";

interface GrandTotalProps {
  count: number;
}

export const GrandTotal = ({ count }: GrandTotalProps) => {
  return (
    <div className={cn("flex justify-between items-center bg-background w-full py-2 px-3 rounded-md")}>
      <h3 className="font-medium text-[15px]">{CONSTANTS.GRAND_TOTAL}</h3>
      <p className="text-sm font-semibold">{count}</p>
    </div>
  );
};
