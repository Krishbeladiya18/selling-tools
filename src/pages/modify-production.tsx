
import { useGetCompanyQuery } from "@/api/company";
import { useGetProductQuery } from "@/api/product";
import { useCreateProductionMutation, useLazyGetSingleProductionsQuery, useUpdateProductionMutation } from "@/api/production";
import { Header } from "@/components/header";
import { AddProductionProductDrawer } from "@/components/production/add-production-product-drawer";
import { CompleteProductionDialog } from "@/components/production/complete-production-dialog";
import { AddSmIcon } from "@/components/shared/add-icon";
import { DataLoader } from "@/components/shared/data-loader";
import { EditBtn } from "@/components/shared/edit-btn";
import { CommonInputDate } from "@/components/shared/form/common-date-input";
import { CommonResourceSelectMenu, CommonSelectMenu } from "@/components/shared/form/common-select-menu";
import { ModifyDrawerActions } from "@/components/shared/modify-drawer-actions";
import { Form } from "@/components/ui/form";
import { useAppDispatch } from "@/hooks/redux";
import { CompleteProductionForm, ModifyProductionForm, modifyProductionSchema } from "@/schemas/production";
import { openAddProductionProductModal, openCompleteProductionModal } from "@/store/slices/modelSlices";
import { setRefetchProduction } from "@/store/slices/refetchSlice";
import { SelectResourceDataRecord } from "@/types/common";
import { Company } from "@/types/company";
import { AddedProductionProduct, Production } from "@/types/production";
import { Products } from "@/types/products";
import { CONSTANTS, PRODUCTION_STATUS_TYPES } from "@/utils/constants";
import { PRODUCTION_STATUS } from "@/utils/data";
import { LABELS, NAMES, PLACEHOLDERS } from "@/utils/form";
import { ERROR_MSG, INFO_MSG, SUCCESS_MSG } from "@/utils/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";



export default function ModifyProduction() {

    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState<Production | null>(null);
    const [addedProduct, setAddedProduct] = useState<AddedProductionProduct | null>(null);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState<string>(PRODUCTION_STATUS[0].value);

    const [getProductionApi, { isFetching: productionFetching }] = useLazyGetSingleProductionsQuery();

    const getProductionDetails = async () => {
        const res = await getProductionApi(id).unwrap();
        setOrderDetails(res.data);
    };

    useEffect(() => {
        if (id) getProductionDetails();
    }, [id]);


    const { data: companiesData, isFetching: companiesFetching } = useGetCompanyQuery({});
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

    const { data: productsData, isFetching: productsFetching } = useGetProductQuery({});

    const companies: SelectResourceDataRecord[] = useMemo(
        () => companiesData?.result?.map((c: Company) => ({ id: c.id, label: c.name })) || [],
        [companiesData]
    );
    const addProductionProduct = () => {
        dispatch(openAddProductionProductModal({}));
    };

    const navigateToProduction = () => {
        navigate("/production");
    };

    const modifyProductionForm = useForm<ModifyProductionForm>({
        resolver: zodResolver(modifyProductionSchema),
        defaultValues: {
            startDate: undefined,
            date: undefined
        }
    });

    const openCompleteProduction = () => {
        if (!selectedCompany) return toast.error(ERROR_MSG.SELECT_COMPANY);
        if (!addedProduct) return toast.error(ERROR_MSG.ADD_PRODUCT);

        const values = modifyProductionForm.getValues();
        dispatch(openCompleteProductionModal({ startDate: values.startDate }));
    };

    useEffect(() => {
        if (orderDetails) {
            setSelectedCompany(orderDetails.companyId);
    
            const selectedProduct = productsData?.result?.find((p: Products) => p.id === orderDetails.productId);
    
            if (selectedProduct) {
                setAddedProduct({
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    quantity: orderDetails.quantity,
                    price: selectedProduct.price,
                    totalAmount: orderDetails.total, 
                });
            }
    
            modifyProductionForm.setValue("startDate", new Date(orderDetails.startDate));
            modifyProductionForm.setValue("date", new Date(orderDetails.date));
        }
    }, [orderDetails, productsData]);
    


    const [createProductionApi, { isLoading: createProductionLoading }] = useCreateProductionMutation({});
    const [updateProductionApi, { isLoading: updateProductionLoading }] = useUpdateProductionMutation({});


    const createProduction = async (body: any) => {
        await createProductionApi(body).unwrap();
        toast.success(SUCCESS_MSG.PRODUCTION_CREATE);
        dispatch(setRefetchProduction(true));
        navigateToProduction();
    };

    const updateProduction = async (body: any) => {
        await updateProductionApi({ id, body }).unwrap();
        toast.success(SUCCESS_MSG.PRODUCTION_UPDATE);
        dispatch(setRefetchProduction(true));
        navigateToProduction();
    };
    const completeProduction = (completeValues: CompleteProductionForm) => {
        if (!selectedCompany) return toast.error(ERROR_MSG.SELECT_COMPANY);
        if (!addedProduct) return toast.error(ERROR_MSG.ADD_PRODUCT);

        const values = modifyProductionForm.getValues();

        if (moment(values.date).startOf("day").isBefore(moment(values.startDate).startOf("day")))
            return toast.error(ERROR_MSG.COMPLETE_DATE_NOT_LESS);

        const payload = {
            ...values,
            date: completeValues.date,
            quantity: addedProduct.quantity,
            companyId: selectedCompany,
            productId: addedProduct.id,
            totalAmount: addedProduct.price * addedProduct.quantity,
            status: selectedStatus,
        };

        id ? updateProduction(payload) : createProduction(payload);
    };

    const executeProductionOrder = () => {
        if (!selectedCompany) return toast.error(ERROR_MSG.SELECT_COMPANY);
        if (!addedProduct) return toast.error(ERROR_MSG.ADD_PRODUCT);

        const values = modifyProductionForm.getValues();

        if (!values.date) return toast.error(ERROR_MSG.SELECT_APPROX_DATE);

        if (moment(values.date).startOf("day").isBefore(moment(values.startDate).startOf("day")))
            return toast.error(ERROR_MSG.APPROX_DATE_NOT_LESS);

        const payload = {
            ...values,
            quantity: addedProduct.quantity,
            companyId: selectedCompany,
            productId: addedProduct.id,
            totalAmount: addedProduct.price * addedProduct.quantity,
            status: selectedStatus,
        };

        id ? updateProduction(payload) : createProduction(payload);
    };
    const submitForm = () => {
        if (selectedStatus === PRODUCTION_STATUS_TYPES.COMPLETED) {
        
            openCompleteProduction();
        } else {
            modifyProductionForm.handleSubmit(executeProductionOrder)();
        }
    };
    

    return (
        <>
            <div className="h-full flex flex-col">
                <Header title={id ? INFO_MSG.EDIT_PRODUCTION : INFO_MSG.CREATE_PRODUCTION} />

                {productionFetching ? (
                    <DataLoader className="py-14" />
                ) : (
                    <div className="flex-1 min-h-0 px-4 py-4 flex flex-col gap-y-4">
                        <Form {...modifyProductionForm}>
                            <form id={CONSTANTS.ORDER_FORM} className="w-full flex flex-col gap-y-4">
                                <CommonInputDate
                                    name={NAMES.START_DATE}
                                    label={LABELS.DATE}
                                    placeholder={PLACEHOLDERS.DATE}
                                    control={modifyProductionForm.control}
                                />
                                <CommonResourceSelectMenu
                                    data={companies}
                                    value={selectedCompany ? String(selectedCompany) : undefined}
                                    label={LABELS.COMPANY}
                                    placeholder={PLACEHOLDERS.COMPANY}
                                    onChange={setSelectedCompany}
                                    autoSelect={true}
                                    readOnly={companiesFetching || productionFetching}
                                    noDataMessgae={INFO_MSG.NO_COMPANY_FOUND}
                                />
                                <section className="rounded-lg shadow-sm flex flex-col bg-background divide-y divide-input overflow-hidden">
                                    <div className="sticky top-0 z-10 w-full h-12 bg-background flex justify-between items-center py-1.5 px-2.5">
                                        <h3 className="font-semibold text-sm">{CONSTANTS.PRODUCT}</h3>
                                        {addedProduct ? (
                                            <EditBtn size={28} onClick={addProductionProduct} />
                                        ) : (
                                            <AddSmIcon size={28} onClick={addProductionProduct} />
                                        )}
                                    </div>
                                    {!!addedProduct && (
                                        <div className="flex items-center gap-2 py-2 px-2.5">
                                            <div className="flex-1 min-w-0 flex justify-between">
                                                <div className="flex flex-col">
                                                    <h4 className="font-semibold text-[15px]">{addedProduct.name}</h4>
                                                    <p className="font-semibold text-[13px] text-app-text-foreground">
                                                        {addedProduct.quantity} x {addedProduct.price}
                                                    </p>
                                                </div>

                                                <p className="font-semibold text-[13px] text-app-text-foreground">{addedProduct.quantity * addedProduct.price}</p>
                                            </div>
                                        </div>
                                    )}
                                </section>
                                <CommonSelectMenu
                                    data={PRODUCTION_STATUS}
                                    value={selectedStatus}
                                    label={LABELS.STATUS}
                                    placeholder={PLACEHOLDERS.STATUS}
                                    onChange={setSelectedStatus}
                                    readOnly={productionFetching || createProductionLoading || updateProductionLoading}
                                />
                                {selectedStatus !== PRODUCTION_STATUS_TYPES.COMPLETED && (
                                    <CommonInputDate
                                        name={NAMES.COMPLETED_DATE}
                                        label={selectedStatus === PRODUCTION_STATUS_TYPES.COMPLETED ? LABELS.COMPLETED_DATE : LABELS.APPR_DATE}
                                        placeholder={
                                            selectedStatus === PRODUCTION_STATUS_TYPES.COMPLETED ? PLACEHOLDERS.COMPLETED_DATE : PLACEHOLDERS.APPR_DATE
                                        }
                                        control={modifyProductionForm.control}
                                    />
                                )}
                            </form>
                        </Form>
                    </div>

                )}
                {!productsFetching && (
                    <div className="w-full px-4 pb-4 flex gap-3">
                        <ModifyDrawerActions
                            onCancel={navigateToProduction}
                            onSave={submitForm}
                            actionChild={CONSTANTS.SAVE}
                            isLoading={createProductionLoading || updateProductionLoading}
                        />
                    </div>
                )}

            </div>

            <AddProductionProductDrawer
                productsData={productsData?.result || []}
                addedProduct={addedProduct}
                addProduct={setAddedProduct}
                isLoading={productsFetching}
            />
            <CompleteProductionDialog onComplete={completeProduction} />

        </>
    )
}