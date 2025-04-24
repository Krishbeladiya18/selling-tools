import { useGetOrderDetailQuery } from "@/api/order";
import { Header } from "@/components/header";
import { OrderCardSection, OrderCardSectionReverse } from "@/components/order/order-card-section";
import { DataLoader } from "@/components/shared/data-loader";
import { OrderProduct } from "@/types/order";
import { CONSTANTS, ORDER_TYPES } from "@/utils/constants";
import { formatAmount, formatCount, formatDate } from "@/utils/fn";
import { useParams } from "react-router-dom";

export default function OrderDetails() {

    const { type, id } = useParams<{ type: string, id: string }>();

    const { data: orderDetails = [], isFetching } = useGetOrderDetailQuery({ type, id });

    return (
        <>
            <div className="h-full relative overflow-y-auto">
                <Header title={CONSTANTS.DETAILS} />
                <section className="px-4 py-4 flex flex-col gap-y-4">
                    <article className="divide-y divide-input rounded-xl bg-background shadow-md">
                        <div className="py-1.5 px-2.5">
                            {!!orderDetails && (
                                <p className="text-[13px] font-semibold text-foreground">
                                    {formatDate(new Date(orderDetails.date), "DD MMMM, YYYY")}
                                </p>
                            )}
                        </div>
                        {!!orderDetails && (
                            <div className="py-1.5 px-2.5 flex justify-between">
                                <OrderCardSectionReverse
                                    title={orderDetails.fromCompany}
                                    description={type === ORDER_TYPES.SALE ? CONSTANTS.SALE_FROM : CONSTANTS.TRANSFER_FROM}
                                    align="left"
                                />

                                <OrderCardSectionReverse
                                    title={type === ORDER_TYPES.SALE ? (orderDetails.toUser as string) : (orderDetails.toCompany as string)}
                                    description={type === ORDER_TYPES.SALE ? CONSTANTS.SALE_TO : CONSTANTS.TRANSFER_TO}
                                    align="right"
                                />
                            </div>
                        )}
                    </article>
                    <article className="divide-y divide-input rounded-xl bg-background shadow-md">
                        <div className="py-2 px-2.5 flex items-center gap-1">
                            <h3 className="font-semibold text-foreground">{CONSTANTS.PRODUCTS}</h3>
                            {!!orderDetails && (
                                <p className="font-semibold text-app-text-foreground text-[13px] mt-0.5">
                                    ({orderDetails.products?.length} {orderDetails.products?.length <= 1 ? CONSTANTS.PRODUCT : CONSTANTS.PRODUCTS})
                                </p>
                            )}
                        </div>
                        {!!orderDetails &&
                            orderDetails.products?.map((p: OrderProduct) => (
                                <div key={p.id} className="flex justify-between py-2 px-2.5">
                                    <div className="flex justify-between">
                                        <OrderCardSection
                                            title={p.name}
                                            description={`${formatCount(p.quantity)} x ${p.price}`}
                                            align="left"
                                        />
                                    </div>

                                    <p className="text-app-text-foreground font-semibold text-[15px]">{formatAmount(p.total)}</p>
                                </div>
                            ))}

                    </article>
                    <article className="rounded-xl shadow-sm bg-background">
                        <div className="flex justify-between items-center py-2 px-2.5">
                            <h4 className="font-semibold text-[15px]">{CONSTANTS.TOTAL}</h4>
                            <p className="font-semibold text-foreground">{orderDetails?.total || 0}</p>
                        </div>
                    </article>
                </section>
                {isFetching && <DataLoader dataPresent={!!orderDetails.length} />}
            </div>
        </>
    )
}