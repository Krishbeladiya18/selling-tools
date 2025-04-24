import { ProductWiseGlobalStockReportRecord } from "@/types/reports";
import { useState } from "react";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { CollapsibleItemSubItem, CollapsibleRecordItem } from "./common-records-sections";


interface ProductRecordsSectionProps {
    productWiseRecords: ProductWiseGlobalStockReportRecord[];
}

export const ProductRecordsSection = ({ productWiseRecords }: ProductRecordsSectionProps) => {
    const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
    const toggleCollapse = (productId: number) => {
        setOpenStates((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    return (
        <section className="flex flex-col gap-y-2">
            {productWiseRecords.map((p) => {
                const isOpen = !!openStates[p.productId];

                return (
                    <Collapsible key={p.productId} open={isOpen} onOpenChange={() => toggleCollapse(p.productId)}>
                        <CollapsibleRecordItem
                            isOpen={isOpen}
                            primaryText={p.category.name + " - " + p.productName}
                            secondaryText={String(p.totalStock)}
                        />

                        <CollapsibleContent className="mt-1 rounded-md bg-background">
                            <ul className="flex flex-col divide-y divide-input">
                                {p.companies.map((c) => (
                                    <CollapsibleItemSubItem key={c.id} primaryText={c.name} secondaryText={String(c.stock)} />
                                ))}
                            </ul>
                        </CollapsibleContent>
                    </Collapsible>
                );
            })}
        </section>
    );
};
