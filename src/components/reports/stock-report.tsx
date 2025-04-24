import { useLazyGanrateStockReportsApiQuery } from "@/api/reports"
import {
    CompanyWiseStockReportRecord,
    ProductWiseStockReportRecord,
} from "@/types/reports"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "../header"
import { CONSTANTS } from "@/utils/constants"
import { Collapsible, CollapsibleContent } from "../ui/collapsible"
import { CollapsibleRecordItem } from "./common-records"
import { DataTable } from "../shared/common-table"
import { GrandTotal } from "../shared/grand-total"
import { ModifyDrawerActions } from "../shared/modify-drawer-actions"
import { NoDataFound } from "../shared/no-data-found"
import { INFO_MSG } from "@/utils/messages"
import { DataLoader } from "../shared/data-loader"

function isCompanyReport(
    item: CompanyWiseStockReportRecord | ProductWiseStockReportRecord
): item is CompanyWiseStockReportRecord {
    return "companyId" in item
}

function StockReports() {

    const location = useLocation()
    const payload = location.state

    const stockReportColumns: Column<CompanyWiseStockReportRecord["products"][0]>[] = [
        { header: payload.type === "company" ? "Product" : "Company", accessor: "name" },
        { header: "O.Stock", accessor: "openingStock" },
        { header: "Prod.", accessor: "productionStock" },
        { header: "In", accessor: "inward" },
        { header: "Out", accessor: "outward" },
        { header: "B.Stock", accessor: "balanceStock" },
    ]
    const navigate = useNavigate();
    const [ganrateStockReportsApi, { isLoading }] = useLazyGanrateStockReportsApiQuery({})


    const [stockReportsData, setStockReportsData] = useState<(CompanyWiseStockReportRecord | ProductWiseStockReportRecord)[]>([])
    const [grandTotal, setGrandTotal] = useState<number>(0);
    const [openStates, setOpenStates] = useState<Record<number, boolean>>({})

    const toggleCollapse = (id: number) => {
        setOpenStates((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }
    useEffect(() => {
        if (payload) {
            const getStockReport = async () => {
                const { data } = await ganrateStockReportsApi(payload)
                setStockReportsData(data?.result?.data ?? [])
                setGrandTotal(data?.result?.grandTotal)
            }
            getStockReport()
        }
    }, [payload])

    const submitForm = () => {

    }
    return (
        <div className="h-full flex flex-col relative">
            <Header title={CONSTANTS.STOCK_REPORT} />

            <>

                <section className="flex-1 px-4 py-4 gap-y-2 flex flex-col overflow-y-auto">
                    {!isLoading && !stockReportsData?.length && <NoDataFound message={INFO_MSG.NO_STOCK_FOUND} />}
                    {stockReportsData.map((s) => {
                        const isCompany = isCompanyReport(s)
                        const id = isCompany ? s.companyId : s.productId
                        const label = isCompany ? s.companyName : s.productName
                        const records = isCompany ? s.products : s.companies
                        const total = s.total
                        const isOpen = !!openStates[id]

                        return (
                            <Collapsible key={id} open={isOpen} onOpenChange={() => toggleCollapse(id)} asChild>
                                <div>
                                    <CollapsibleRecordItem isOpen={isOpen} primaryText={label} />
                                    <CollapsibleContent className="mt-1 bg-background">
                                        <DataTable columns={stockReportColumns} data={records} footerData={total} />
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>
                        )
                    })}
                    {isLoading && <DataLoader dataPresent={!!stockReportsData?.length} />}
                </section>
            </>

            <div className="px-4 py-4">
                <GrandTotal count={grandTotal} />
            </div>

            <div className="w-full px-4 pb-4 flex gap-3">
                <ModifyDrawerActions
                    onCancel={() => navigate(-1)}
                    onSave={submitForm}
                    actionChild={CONSTANTS.EXPORT_AS_PDF}
                />
            </div>
        </div>
    )
}

export default StockReports
