import { memo } from "react";
import { cn } from "@/lib/utils";

interface OrderCardSection {
  title: string;
  description: string;
  align?: "left" | "right";
}

export const OrderCardSection = memo(({ title, description, align = "left" }: OrderCardSection) => {
  return (
    <div className={cn("flex flex-col", align === "right" && "items-end")}>
      <h4 className="text-sm font-bold text-foreground">{title}</h4>
      <p className="text-[13px] text-app-text-foreground font-semibold">{description}</p>
    </div>
  );
});

export const OrderCardSectionReverse = memo(({ title, description, align = "left" }: OrderCardSection) => {
  return (
    <div className={cn("flex flex-col", align === "right" && "items-end")}>
      <p className="text-[13px] text-app-text-foreground font-semibold">{description}</p>
      <h4 className="text-sm font-semibold">{title}</h4>
    </div>
  );
});
