import { useGetOrdersQuery } from '@/api/order';
import { Header } from '@/components/header'
import { OrderCard } from '@/components/order/order-card';
import { DataLoader } from '@/components/shared/data-loader';
import { NoDataFound } from '@/components/shared/no-data-found';
import { SearchField } from '@/components/shared/search-field'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Order } from '@/types/order';
import { CONSTANTS } from '@/utils/constants'
import { SALE_OPTIONS } from '@/utils/data';
import { PLACEHOLDERS } from '@/utils/form';
import { INFO_MSG } from '@/utils/messages';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [text, setText] = useState<string>("");
    const navigate = useNavigate();

    const { data: orders = [], isFetching } = useGetOrdersQuery({});
    return (
        <>
            <div className="h-full relative overflow-y-auto">
                <Header title={CONSTANTS.SALE} />
                <div className="space-y-4 px-4 py-4">
                    <section className="flex gap-3 h-10">
                        <SearchField value={text} placeholder={PLACEHOLDERS.SEARCH} onChange={setText} />

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="h-full aspect-square bg-app-primary text-background flex justify-center items-center rounded-full hover:cursor-pointer">
                                    <Plus size={22} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                                {SALE_OPTIONS.map((s) => (
                                    <DropdownMenuItem key={s.path} onClick={() => navigate(s.path)} className="font-semibold">
                                        {s.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </section>
                    {!isFetching && !orders.data?.length && <NoDataFound message={INFO_MSG.NO_ORDER_FOUND} />}

                    <section className="flex flex-col gap-y-3">
                        {orders.data?.map((o: Order, idx: number) => (
                            <OrderCard key={idx} data={o} />
                        ))}
                    </section>

                    {isFetching && <DataLoader dataPresent={!!orders.data?.length} />}
                </div>
            </div>
        </>
    )
}

export default Orders