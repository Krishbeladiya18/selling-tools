import { useGetProductionAllQuery } from "@/api/production";
import { Header } from "@/components/header";
import { DeleteProductionDialog } from "@/components/production/delete-production-dialog";
import { ProductionCard } from "@/components/production/production-card";
import { AddIcon } from "@/components/shared/add-icon";
import { CommonTabs } from "@/components/shared/common-tabs";
import { DataLoader } from "@/components/shared/data-loader";
import { NoDataFound } from "@/components/shared/no-data-found";
import { SearchField } from "@/components/shared/search-field";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setRefetchProduction } from "@/store/slices/refetchSlice";
import { Production } from "@/types/production";
import { CONSTANTS, PRODUCTION_STATUS_TYPES } from "@/utils/constants";
import { PRODUCTION_STATUS } from "@/utils/data";
import { PLACEHOLDERS } from "@/utils/form";
import { INFO_MSG } from "@/utils/messages";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ProductionList() {

    const [activeTab, setActiveTab] = useState<string>(PRODUCTION_STATUS[0].value);
    const [text, setText] = useState("");

    const { data: productionpending = [], isFetching: isPending,  refetch: refetchPending, } = useGetProductionAllQuery('pending');
    const { data: productioncompleted = [], isFetching: isCompleted, refetch: refetchCompleted, } = useGetProductionAllQuery('completed');

    const productionRefetch = useAppSelector(state => state.refetch.production);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (productionRefetch) {
            if (activeTab === PRODUCTION_STATUS_TYPES.PENDING) {
                refetchPending();
            } else if (activeTab === PRODUCTION_STATUS_TYPES.COMPLETED) {
                refetchCompleted();
            }

            dispatch(setRefetchProduction(false));
        }
    }, [productionRefetch]);


    const createProduction = () => {
        navigate("/production/create");
    }

    return (
        <>
            <div className="h-full relative overflow-y-auto">
                <Header title={CONSTANTS.PRODUCTION} />

                <div className="space-y-4 px-4 py-4">
                    <CommonTabs data={PRODUCTION_STATUS} value={activeTab} onChange={setActiveTab} />

                    <section className="flex gap-3 h-10">
                        <SearchField value={text} placeholder={PLACEHOLDERS.SEARCH} onChange={setText} />
                        <AddIcon onClick={createProduction} />
                    </section>


                    <>
                        {activeTab === PRODUCTION_STATUS_TYPES.PENDING && (
                            <>
                                {!isPending && !productionpending.data?.length && <NoDataFound message={INFO_MSG.NO_PRODUCTION_FOUND} />}

                                <section className="flex flex-col gap-y-3">
                                    {productionpending.data?.map((p: Production) => (
                                        <ProductionCard key={p.id} data={p} />
                                    ))}
                                </section>

                                {isPending && <DataLoader dataPresent={!!productionpending.data?.length} />}
                            </>
                        )}

                        {activeTab === PRODUCTION_STATUS_TYPES.COMPLETED && (
                            <>
                                {!isCompleted && !productioncompleted.data?.length && <NoDataFound message={INFO_MSG.NO_PRODUCTION_FOUND} />}

                                <section className="flex flex-col gap-y-3">
                                    {productioncompleted.data?.map((p: Production) => (
                                        <ProductionCard key={p.id} data={p} />
                                    ))}
                                </section>

                                {isCompleted && <DataLoader dataPresent={!!productioncompleted.data?.length} />}
                            </>
                        )}
                    </>

                </div>
            </div>
            <DeleteProductionDialog />
        </>
    )
}