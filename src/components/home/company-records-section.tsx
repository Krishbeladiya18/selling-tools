import { CompanyWiseGlobalStockReportRecord } from "@/types/reports";
import { useState } from "react";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { CollapsibleItemSubItem, CollapsibleRecordItem } from "./common-records-sections";

interface CompanyRecordsSectionProps {
    companyWiseRecords: CompanyWiseGlobalStockReportRecord[];
}

export const CompanyRecordsSection = ({ companyWiseRecords }: CompanyRecordsSectionProps) => {
    const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

    const toggleCollapse = (companyId: number) => {
        setOpenStates((prev) => ({
            ...prev,
            [companyId]: !prev[companyId],
        }));
    };

    return (
        <section className="flex flex-col gap-y-2">
            {companyWiseRecords.map((c) => {
                const isOpen = !!openStates[c.companyId];
                return (
                    <Collapsible key={c.companyId} open={isOpen} onOpenChange={() => toggleCollapse(c.companyId)} asChild>
                      <div>
                        <CollapsibleRecordItem isOpen={isOpen} primaryText={c.companyName} secondaryText={String(c.totalStock)} />
          
                        <CollapsibleContent className="mt-1 rounded-md bg-background">
                          <ul className="flex flex-col divide-y divide-input">
                            {c.products.map((p) => (
                              <CollapsibleItemSubItem
                                key={p.id}
                                primaryText={p.category.name + " - " + p.name}
                                secondaryText={String(p.stock)}
                              />
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
            })}
        </section>
    )

}