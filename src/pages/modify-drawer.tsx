import { useGetCompanyQuery } from "@/api/company";
import { useGetProductQuery } from "@/api/product";
import RemoveIcon from "@/assets/svg/remove.svg";
import { useCreateSaleMutation, useLazyGetSingleSaleQuery } from "@/api/sale";
import { useCreateTransferMutation, useLazyGetSingleTransferQuery } from "@/api/transfer";
import { Header } from "@/components/header";
import { AddOrderProductDrawer } from "@/components/order/add-order-product-drawer";
import { AddSmIcon } from "@/components/shared/add-icon";
import { DataLoader } from "@/components/shared/data-loader";
import { CommonInputDate } from "@/components/shared/form/common-date-input";
import { CommonResourceSelectMenu } from "@/components/shared/form/common-select-menu";
import { CommonTextField } from "@/components/shared/form/common-text-field";
import { Form } from "@/components/ui/form";
import { useAppDispatch } from "@/hooks/redux";
import { CreateSaleForm, createSaleSchema } from "@/schemas/sale";
import { CreateTransferForm, createTransferSchema } from "@/schemas/transfer";
import { openAddOrderProductModal, openDeleteModal } from "@/store/slices/modelSlices";
import { SelectResourceDataRecord } from "@/types/common";
import { Company } from "@/types/company";
import { AddedOrderProduct } from "@/types/order";
import { CONSTANTS, ORDER_TYPES, VALUES } from "@/utils/constants";
import { LABELS, NAMES, PLACEHOLDERS } from "@/utils/form";
import { ERROR_MSG, INFO_MSG, SUCCESS_MSG } from "@/utils/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { formatAmount } from "@/utils/fn";
import { DeleteOrderProductDialog } from "@/components/order/remove-order-product-dialog";
import { ModifyDrawerActions } from "@/components/shared/modify-drawer-actions";
import { moveMessagePortToContext } from "node:worker_threads";
import moment from "moment";


function ModifyDrawer() {
  const { type: orderType, id } = useParams();
  const navigate = useNavigate();
  const [fromCompany, setFromCompany] = useState<number | null>(null);
  const [toCompany, setToCompany] = useState<number | null>(null);
  const [getTransferApi, { isFetching: transferFetching }] = useLazyGetSingleTransferQuery();
  const [getSaleApi, { isFetching: saleFetching }] = useLazyGetSingleSaleQuery();

  const { data: companiesData, isFetching: companiesFetching } = useGetCompanyQuery({});
  const { data: productsData, isFetching: productsFetching } = useGetProductQuery({});

  const [createTransferApi, { isLoading: transferLoading }] = useCreateTransferMutation({});
  const [createSaleApi, { isLoading: saleLoading }] = useCreateSaleMutation({});

  const dispatch = useAppDispatch();

  const companies: SelectResourceDataRecord[] = useMemo(
    () => companiesData?.result?.map((c: Company) => ({ id: c.id, label: c.name })) || [],
    [companiesData]
  );

  const handleFromCompanyChange = useCallback(setFromCompany, []);
  const handleToCompanyChange = useCallback(setToCompany, []);

  const [addedProducts, setAddedProducts] = useState<AddedOrderProduct[]>([]);

  const total = useMemo(() => {
    return addedProducts.reduce((t, p) => {
      t += p.total;
      return t;
    }, 0);
  }, [addedProducts]);


  const addProduct = useCallback(
    (p: AddedOrderProduct) => {
      if (addedProducts.some((ap) => ap.id === p.id)) setAddedProducts(addedProducts.map((ap) => (ap.id === p.id ? p : ap)));
      else setAddedProducts([...addedProducts, p]);
    },
    [addedProducts]
  );

  const removeProduct = useCallback(
    (id: number) => {
      setAddedProducts(addedProducts.filter((p) => p.id !== id));
    },
    [addedProducts]
  );

  const navigateToOrders = () => {
    navigate("/orders");
  };


  const createSaleForm = useForm<CreateSaleForm>({
    resolver: zodResolver(createSaleSchema),
    defaultValues: { saleDate: undefined, customerName: "" }
  })

  const createTransferForm = useForm<CreateTransferForm>({
    resolver: zodResolver(createTransferSchema),
    defaultValues: { transferDate: undefined }
  })

  const openAddOrderCompany = () => {
    dispatch(openAddOrderProductModal({}));
  };

  const deleteAddOrderProduct = (id: number) => {
    dispatch(openDeleteModal({ name: "order-product", id }));
  };


  const createSale = async (body: any) => {

    await createSaleApi(body).unwrap();

    toast.success(SUCCESS_MSG.SALE_CREATE);

    navigateToOrders();

  };

  const createTransfer = async (body: any) => {
    await createTransferApi(body).unwrap();
    toast.success(SUCCESS_MSG.TRANSFER_CREATE);
    navigateToOrders();
  };

  const executeTransferOrder = () => {
    if (!fromCompany) return toast.error(ERROR_MSG.SELECT_FROM_COMPANY);
    if (!toCompany) return toast.error(ERROR_MSG.SELECT_TO_COMPANY);
    if (fromCompany === toCompany) return toast.error(ERROR_MSG.FROM_TO_COMPANIES_NOT_SAME);

    if (!addedProducts.length) return toast.error(ERROR_MSG.ADD_TRANSFER_PRODUCTS);

    const values = createTransferForm.getValues();
    const payload = {
      ...values,
      transferDate: moment(values.transferDate).toISOString(),
      fromCompanyId: fromCompany,
      toCompanyId: toCompany,
      products: addedProducts.map((p) => ({ productId: p.id, quantity: p.quantity, price: p.price })),
      totalAmount: total,
    };
    createTransfer(payload);
  };

  const executeSaleOrder = () => {
    if (!fromCompany) return toast.error(ERROR_MSG.SELECT_FROM_COMPANY);

    if (!addedProducts.length) return toast.error(ERROR_MSG.ADD_SALE_PRODUCTS);

    const values = createSaleForm.getValues();

    const payload = {
      ...values,
      saleDate:  moment(values.saleDate).toISOString(),
      companyId: fromCompany,
      products: addedProducts.map((p) => ({ productId: p.id, quantity: p.quantity, price: p.price })),
      totalAmount: total,
    };
    console.log("first,", payload)

    createSale(payload);
  };

  const submitForm = () => {
    if (orderType === ORDER_TYPES.SALE) createSaleForm.handleSubmit(executeSaleOrder)();
    else createTransferForm.handleSubmit(executeTransferOrder)();
  };
  
  return (
    <>
      <div className="h-full flex flex-col relative">
        <Header title={orderType === ORDER_TYPES.SALE ? CONSTANTS.SALE_PRODUCTS : CONSTANTS.TRANSFER_PRODUCTS} />
        {transferFetching || saleFetching ? (
          <DataLoader className="py-14" />
        ) : (
          <div className="flex-1 min-h-0 px-4 py-4 flex flex-col gap-y-4">
            {orderType === ORDER_TYPES.SALE ? (
              <Form {...createSaleForm}>
                <form id={CONSTANTS.ORDER_FORM} className="w-full flex flex-col gap-y-4">
                  <CommonInputDate
                    name={NAMES.SALE_DATE}
                    label={LABELS.DATE}
                    placeholder={PLACEHOLDERS.DATE}
                    control={createSaleForm.control}
                  />
                  <div className="w-full flex gap-3">
                    <div className="flex-1">
                      <CommonResourceSelectMenu
                        data={companies}
                        value={fromCompany ? String(fromCompany) : undefined}
                        label={LABELS.FROM_COMPANY}
                        placeholder={PLACEHOLDERS.FROM_COMPANY}
                        onChange={handleFromCompanyChange}
                        readOnly={companiesFetching}
                        autoSelect={true}
                        noDataMessgae={INFO_MSG.NO_COMPANY_FOUND}
                      />
                    </div>

                    <div className="flex-1">
                      <CommonTextField
                        name={NAMES.CUSTOMER_NAME}
                        label={LABELS.TO_USER}
                        placeholder={PLACEHOLDERS.TO_USER}
                        control={createSaleForm.control}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            ) : (
              <Form {...createTransferForm}>
                <form id={CONSTANTS.ORDER_FORM} className="w-full flex flex-col gap-y-4">
                  <CommonInputDate
                    name={NAMES.TRANSFER_DATE}
                    label={LABELS.DATE}
                    placeholder={PLACEHOLDERS.DATE}
                    control={createTransferForm.control}
                  />
                  <div className="w-full flex gap-3">
                    <div className="flex-1">
                      <CommonResourceSelectMenu
                        data={companies}
                        value={fromCompany ? String(fromCompany) : undefined}
                        label={LABELS.FROM_COMPANY}
                        placeholder={PLACEHOLDERS.FROM_COMPANY}
                        onChange={handleFromCompanyChange}
                        readOnly={companiesFetching}
                        autoSelect={true}
                        noDataMessgae={INFO_MSG.NO_COMPANY_FOUND}
                      />
                    </div>

                    <div className="flex-1">
                      <CommonResourceSelectMenu
                        data={companies}
                        value={toCompany ? String(toCompany) : undefined}
                        label={LABELS.TO_COMPANY}
                        placeholder={PLACEHOLDERS.TO_COMPANY}
                        onChange={handleToCompanyChange}
                        readOnly={companiesFetching}
                        autoSelect={true}
                        noDataMessgae={INFO_MSG.NO_COMPANY_FOUND}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            )}
            <section className="flex-1 min-h-0">
              <section className="max-h-full rounded-xl shadow-sm flex flex-col bg-background divide-y divide-input overflow-y-auto">
                <div className="sticky top-0 z-10 w-full h-12 bg-background flex justify-between items-center py-2 px-2.5">
                  <h3 className="font-semibold">{CONSTANTS.PRODUCTS}</h3>
                  <AddSmIcon size={28} onClick={openAddOrderCompany} />
                </div>
                {addedProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 py-2 px-2.5">
                    <button onClick={() => deleteAddOrderProduct(p.id)}>
                      <img src={RemoveIcon} />
                    </button>

                    <div className="flex-1 min-w-0 flex justify-between">
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-[15px]">{p.name}</h4>
                        <p className="font-semibold text-[13px] text-app-text-foreground">
                          {p.quantity} x {p.price}
                        </p>
                      </div>

                      <p className="font-semibold text-[13px] text-app-text-foreground">{formatAmount(p.total)}</p>
                    </div>
                  </div>
                ))}
              </section>
            </section>
            <section className="rounded-xl shadow-sm bg-background flex justify-between items-center py-2 px-2.5">
              <h4 className="font-semibold text-[15px]">{CONSTANTS.TOTAL}</h4>
              <p className="font-semibold text-lg text-app-text-foreground">{formatAmount(total)}</p>
            </section>
          </div>
        )}
        {!transferFetching && !saleLoading && (
          <div className="w-full px-4 pb-4 flex gap-3">
            <ModifyDrawerActions
              onCancel={navigateToOrders}
              onSave={submitForm}
              actionChild={orderType === ORDER_TYPES.SALE ? CONSTANTS.SALE : CONSTANTS.TRANSFER}
              isLoading={transferLoading || saleLoading}
            />
          </div>
        )}
      </div>

      <AddOrderProductDrawer productsData={productsData?.result || []} addProduct={addProduct} isLoading={productsFetching} />
      <DeleteOrderProductDialog removeProduct={removeProduct} />
    </>
  );
}

export default ModifyDrawer