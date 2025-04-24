import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { CommonModifyDrawer } from "../shared/common-modify-drawer";
import { INFO_MSG, SUCCESS_MSG } from "@/utils/messages";
import { LABELS, PLACEHOLDERS } from "@/utils/form";
import { CONSTANTS } from "@/utils/constants";
import { closeModifyPermissionModal } from "@/store/slices/modelSlices";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useGetCompanyQuery } from "@/api/company";
import { Company, UserCompany } from "@/types/company";
import { SelectResourceDataRecord } from "@/types/common";
import { setRefetchUsers } from "@/store/slices/refetchSlice";
import toast from "react-hot-toast";
import { CheckBoxList } from "../ui/checkbox";
import { SCREEN_LIST } from "@/utils/data";
import { useCreatePermissionApiMutation } from "@/api/user";
import { CommonResourceSelectMenu } from "../shared/form/common-select-menu";
import { useGetScreenApiQuery, useLazyGetScreenApiQuery } from "@/api/screen";
import { Permission } from "@/types/permission";

export const ModifyPermissionDrawer = () => {
    const { open, data } = useAppSelector((state) => state.modal.modifyPermission);
    const dispatch = useAppDispatch();

    const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);

    const { data: companiesData, isFetching: companiesFetching } = useGetCompanyQuery({ includeAll: true });
    const [checkboxes, setCheckboxes] = useState(SCREEN_LIST);


    useEffect(() => {
        if (Array.isArray(data?.companies) && data.companies.length > 0) {
            setSelectedCompanies(data.companies.map((c: UserCompany) => c.companyId));
        }
    }, [data]);

    const companies: SelectResourceDataRecord[] = useMemo(
        () => companiesData?.result?.map((c: Company) => ({ id: c.id, label: c.name })) || [],
        [companiesData]
    );

    const closeDrawer = () => {
        setSelectedCompanies([]);
        setCheckboxes(checkboxes.map(chb => ({ ...chb, checked: false })));
        dispatch(closeModifyPermissionModal());
    };


    const refetchUsers = () => {
        dispatch(setRefetchUsers(true));
    };

    const [createPermissionApi, { isLoading: updateUserLoading }] = useCreatePermissionApiMutation();

    const createPermission = async (body: any) => {
        await createPermissionApi(body).unwrap();
        toast.success(SUCCESS_MSG.PERMISSON_UPDATE);
        refetchUsers();
        closeDrawer();
    };

    const [screenApi] = useLazyGetScreenApiQuery();

    const handlePermissionForCompany = async (companyId: number) => {
        setSelectedCompanies([companyId]);
        const { data: res } = await screenApi({ userId: data.id, companyId });
        setCheckboxes(prevCheckboxes => {
            return prevCheckboxes.map(chb => {
                const permission = res?.data?.find((p: any) => p.screen.toLowerCase() === chb.lable.toLowerCase());
                return { ...chb, checked: permission ? permission.canAccess : false };
            });
        });
    };

    const handleSave = async () => {
        if (!data?.id) return;

        const permissions: Permission[] = checkboxes.map((chb) => ({
            screen: chb.lable.toLowerCase(),
            canAccess: chb.checked,
          }));
          console.log("first ", permissions)
        const payload = {
            userId: data.id,
            companyId: selectedCompanies[0],
            permissions: permissions,
        };
        console.log("payload", payload)
        await createPermission(payload);
    };

    return (
        <CommonModifyDrawer
            open={open}
            onClose={closeDrawer}
            title={INFO_MSG.GIVE_PERMISSION}
            onSave={handleSave}
            actionChild={CONSTANTS.SAVE}
            isLoading={updateUserLoading}
        >
            <div className="w-full flex flex-col gap-y-4">
                <CommonResourceSelectMenu
                    data={companies}
                    value={selectedCompanies ? String(selectedCompanies) : undefined}
                    label={LABELS.COMPANY}
                    placeholder={PLACEHOLDERS.COMPANY}
                    onChange={(value) => {
                        const numericValue = Number(value);
                        if (!isNaN(numericValue)) {
                            handlePermissionForCompany(numericValue);
                        }
                    }}
                    readOnly={companiesFetching}
                    autoSelect={true}
                    noDataMessgae={INFO_MSG.NO_COMPANY_FOUND}
                />
                <label className="block font-medium mb-1">Screen List</label>
                {checkboxes.map((chb, index) => (
                    <CheckBoxList
                        key={index}
                        label={chb.lable}
                        checked={chb.checked}
                        onChange={(e) => {
                            setCheckboxes(prevCheckboxes =>
                                prevCheckboxes.map((checkbox, i) =>
                                    i === index ? { ...checkbox, checked: e.target.checked } : checkbox
                                )
                            );
                        }}
                    />
                ))}
            </div>
        </CommonModifyDrawer>
    );
};
