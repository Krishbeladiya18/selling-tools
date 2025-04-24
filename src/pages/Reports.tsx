
import { useGetCompanyQuery } from "@/api/company";
import { useGetProductQuery } from "@/api/product";
import { Header } from "@/components/header";
import { CommonTabs } from "@/components/shared/common-tabs";
import { CommonInputDate } from "@/components/shared/form/common-date-input";
import { CommonMultiResourceSelectMenu, CommonMultiSelectMenu } from "@/components/shared/form/common-multi-select-menu";
import { CommonRadioGroup } from "@/components/shared/form/common-radio-group";
import { CommonSelectMenu } from "@/components/shared/form/common-select-menu";
import { ModifyDrawerActions } from "@/components/shared/modify-drawer-actions";
import { Form } from "@/components/ui/form";
import { GanrateReport, ganrateReportSchema } from "@/schemas/reports";
import { SelectResourceDataRecord } from "@/types/common";
import { Company } from "@/types/company";
import { Products } from "@/types/products";
import { CONSTANTS, REGISTER_REPORT_TYPES, REPORT_TYPES } from "@/utils/constants";
import { PRODUCTION_STATUS, REGISTER_REPORT_OPTIONS, REPORT_ENTITY_OPTIONS, REPORT_OPTIONS, TRANSFER_REPORT_OPTIONS } from "@/utils/data";
import { LABELS, NAMES, PLACEHOLDERS } from "@/utils/form";
import { INFO_MSG } from "@/utils/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function Reports() {

    const navigate = useNavigate();

    const [selectedReportType, setSelectedReportType] = useState<string>(REPORT_OPTIONS[0].value);

    const [selectedRegisterReportType, setSelectedRegisterReportType] = useState<string>(REGISTER_REPORT_OPTIONS[0].value);

    const [selectedRegisterOption, setSelectedRegisterOption] = useState<string>(REPORT_ENTITY_OPTIONS[0].value);
    const [selectedProductionStatuses, setSelectedProductionStatuses] = useState<string[]>([]);


    const [selectedRegisterCompanies, setSelectedRegisterCompanies] = useState<number[]>([]);
    const [selectedRegisterProducts, setSelectedRegisterProducts] = useState<number[]>([]);
    const [selectedTransferType, setSelectedTransferType] = useState<string>(TRANSFER_REPORT_OPTIONS[0].value);

    const { data: companiesData, isFetching: companiesFetching } = useGetCompanyQuery({});
    const { data: productsData, isFetching: productsFetching } = useGetProductQuery({});

    const companies: SelectResourceDataRecord[] = useMemo(
        () => companiesData?.result?.map((c: Company) => ({ id: c.id, label: c.name })) || [],
        [companiesData]
    );


    const products: SelectResourceDataRecord[] = useMemo(
        () => productsData?.result?.map((c: Products) => ({ id: c.id, label: c.name })) || [],
        [productsData]
    );

    const ganrateReport = useForm<GanrateReport>({
        resolver: zodResolver(ganrateReportSchema),
        defaultValues: { startDate: undefined, endDate: undefined }
    })

    const handleCancel = () => {
        ganrateReport.reset();
    
        setSelectedReportType(REPORT_OPTIONS[0].value);
        setSelectedRegisterReportType(REGISTER_REPORT_OPTIONS[0].value);
        setSelectedRegisterOption(REPORT_ENTITY_OPTIONS[0].value);
        setSelectedProductionStatuses([]);
        setSelectedRegisterCompanies([]);
        setSelectedRegisterProducts([]);
        setSelectedTransferType(TRANSFER_REPORT_OPTIONS[0].value);
    };

    const submitForm = () => {
        const values = ganrateReport.getValues();

        const formattedDateFrom = values.startDate
            ? formatDate(values.startDate, CONSTANTS.COMMON_DAY_FORMAT)
            : undefined;

        const formattedDateTo = values.endDate
            ? formatDate(values.endDate, CONSTANTS.COMMON_DAY_FORMAT)
            : undefined;

            const payload = {
                startDate: formattedDateFrom,
                endDate: formattedDateTo,
                type: selectedRegisterOption,
                reportType: selectedRegisterReportType,
                companyIds: selectedRegisterCompanies,
                productIds: selectedRegisterProducts,
                status: selectedProductionStatuses,
                transferType: selectedTransferType,
            };
            
            console.log(payload)
            if (selectedReportType === REPORT_TYPES.REGISTER) {
                navigate(`/registerreports`, { state: payload });
            } else {
                navigate(`/stockreports`, { state: payload });
            }
    }

    return (
        <div className="h-full flex flex-col">
            <Header title={CONSTANTS.REPORTS} />

            <div className="flex-1 min-h-0 px-4 py-4 flex flex-col gap-y-4 overflow-y-auto">
                <CommonTabs
                    data={REPORT_OPTIONS}
                    value={selectedReportType}
                    onChange={setSelectedReportType}
                />
                <div className="flex-1 min-h-0 flex flex-col gap-y-4">
                    <Form {...ganrateReport}>
                        <form id={CONSTANTS.ORDER_FORM} className="w-full flex flex-col gap-y-4">
                            {selectedReportType === REPORT_TYPES.REGISTER && (
                                < CommonSelectMenu
                                    data={REGISTER_REPORT_OPTIONS}
                                    value={selectedRegisterReportType}
                                    label={LABELS.REPORT_TYPE}
                                    placeholder={PLACEHOLDERS.REPORT_TYPE}
                                    onChange={setSelectedRegisterReportType}
                                />
                            )}
                            <div className="flex justify-between items-center gap-6">
                                <CommonInputDate
                                    name={NAMES.START_DATE}
                                    label={LABELS.FROM}
                                    placeholder={PLACEHOLDERS.FROM}
                                    control={ganrateReport.control}
                                />

                                <CommonInputDate
                                    name={NAMES.DATE_TO}
                                    label={LABELS.TO}
                                    placeholder={PLACEHOLDERS.TO}
                                    control={ganrateReport.control}
                                />
                            </div>
                            <CommonMultiResourceSelectMenu
                                data={companies}
                                values={selectedRegisterCompanies}
                                label={LABELS.COMPANY}
                                placeholder={PLACEHOLDERS.COMPANY}
                                onChange={setSelectedRegisterCompanies}
                                readOnly={companiesFetching}
                                noDataMessgae={INFO_MSG.NO_COMPANY_FOUND}
                            />
                            <CommonMultiResourceSelectMenu
                                data={products}
                                values={selectedRegisterProducts}
                                label={LABELS.PRODUCT}
                                placeholder={PLACEHOLDERS.PRODUCT}
                                onChange={setSelectedRegisterProducts}
                                readOnly={productsFetching}
                                noDataMessgae={INFO_MSG.NO_PRODUCT_FOUND}
                            />
                            {selectedReportType === REPORT_TYPES.REGISTER &&
                                selectedRegisterReportType === REGISTER_REPORT_TYPES.PRODUCTION && (
                                    <CommonMultiSelectMenu
                                        data={PRODUCTION_STATUS}
                                        values={selectedProductionStatuses}
                                        label={LABELS.STATUS}
                                        placeholder={PLACEHOLDERS.STATUS}
                                        onChange={setSelectedProductionStatuses}
                                    // readOnly={generateProductionReportLoading}
                                    />
                                )}
                            {selectedReportType === REPORT_TYPES.REGISTER &&
                                selectedRegisterReportType === REGISTER_REPORT_TYPES.TRANSFER && (
                                    <div className="py-2">
                                        <CommonRadioGroup data={TRANSFER_REPORT_OPTIONS} value={selectedTransferType} onChange={setSelectedTransferType} />
                                    </div>
                                )}
                            <div className="py-2">
                                <CommonRadioGroup data={REPORT_ENTITY_OPTIONS} value={selectedRegisterOption} onChange={setSelectedRegisterOption} />
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="w-full px-4 py-4 flex gap-3">
                    <ModifyDrawerActions
                        onCancel={handleCancel}
                        onSave={submitForm}
                        cancelChild={CONSTANTS.CANCEL}
                        actionChild={CONSTANTS.PREVIEW}
                    />
                </div>
            </div>
        </div>
    )

}