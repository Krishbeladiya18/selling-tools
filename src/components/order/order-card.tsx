import { Order } from "@/types/order";
import { CONSTANTS, ORDER_TYPES } from "@/utils/constants";
import { formatCount, formatDate } from "@/utils/fn";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";


interface OrderCard {
    data: Order;
}

export const OrderCard = memo(({ data }: OrderCard) => {

    const { id, transactionId, fromCompany, toCompany, toUser, date: orderDate, totalProducts: productCount } = data;
    const type = toUser ? ORDER_TYPES.SALE : ORDER_TYPES.TRANSFER;

    const orderUrl = (type: string, id: number) => `/ordersdetails/${type}/${id}`;

    return (
        <>
            <Link to={orderUrl(type, id)}>
                <article className="divide-y divide-input rounded-lg bg-background shadow-md select-none">
                    <div className="py-1.5 px-2.5 w-full flex justify-between items-center">
                        <p className="flex-1 text-[13px] font-semibold text-foreground">{transactionId}</p>
                        <p className="flex-1 text-center text-[13px] font-semibold text-foreground">
                            {formatDate(orderDate, CONSTANTS.COMMON_DATE_FORMAT)}
                        </p>
                    </div>

                    <div className="flex justify-between items-center py-1.5 px-2.5">
                        <h4 className="text-sm font-bold text-foreground">
                            {fromCompany.name} - {type === ORDER_TYPES.SALE ? (toUser as string) : (toCompany?.name as string)}
                        </h4>
                        <h4 className="text-sm font-bold text-foreground mr-1.5">{formatCount(productCount ?? 0)}</h4>
                    </div>
                </article>
            </Link>
        </>
    )
})