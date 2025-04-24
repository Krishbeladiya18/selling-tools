import { Production } from "@/types/production";
import { CONSTANTS, PRODUCTION_STATUS_TYPES } from "@/utils/constants";
import { formatCount } from "@/utils/fn";
import { memo, useCallback } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { COMMON_MODIFY_ACTIONS } from "@/utils/data";
import { useAppDispatch } from "@/hooks/redux";
import { useNavigate } from "react-router-dom";
import { openDeleteModal } from "@/store/slices/modelSlices";

interface ProductionCard {
    data: Production;
}

export const ProductionCard = memo(({ data }: ProductionCard) => {
    const { id, startDate, company, product, quantity, status, date: completeDate } = data;

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const isModifiable = status !== PRODUCTION_STATUS_TYPES.COMPLETED;

    const handleActionSelect = useCallback((action: string) => {
        switch (action) {
            case CONSTANTS.EDIT:
                navigate(`/production/${id}`);
                break;

            case CONSTANTS.DELETE:
                dispatch(openDeleteModal({ name: "production", id }));
                break;
        }
    }, []);

    return (
        <>
            <article className="divide-y divide-input rounded-lg bg-background shadow-md select-none">
                <div className="py-1.5 px-2.5 w-full flex justify-between items-center">
                    <h4 className="flex-1 min-w-0 text-sm font-bold text-foreground break-words">{company.name}</h4>

                    <div className="flex-1 flex justify-center items-center gap-1.5 flex-wrap text-sm">
                        <span className="font-semibold break-words">{product.name}</span>
                    </div>

                    <div className="flex-1 text-end">
                        {isModifiable && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="w-6 h-6 text-app-text-foreground aspect-square flex justify-center items-center rounded-full hover:cursor-pointer hover:bg-app-gray active:bg-app-gray">
                                        <EllipsisVertical size={18} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-lg">
                                    {COMMON_MODIFY_ACTIONS.map((a) => (
                                        <DropdownMenuItem
                                            key={a.value}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleActionSelect(a.value);
                                            }}
                                            className="font-semibold text-sm flex gap-1.5 items-center"
                                        >
                                            {a.icon} {a.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center py-1.5 px-2.5">
                    <p className="flex-1 text-[13px] font-semibold text-foreground">{startDate}</p>
                    <p className="flex-1 text-center text-[13px] font-semibold text-foreground">
                        {completeDate}
                    </p>
                    <p className="flex-1 text-end font-bold text-[13px]">{formatCount(quantity)}</p>
                </div>
            </article>
        </>
    )
});