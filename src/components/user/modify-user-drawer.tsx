import { useCreateUserApiMutation } from "@/api/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginSchema, ModifyUserForm } from "@/schemas/user";
import { closeModifyUserModal } from "@/store/slices/modelSlices";
import { setRefetchUsers } from "@/store/slices/refetchSlice";
import { INFO_MSG, SUCCESS_MSG } from "@/utils/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommonModifyDrawer } from "../shared/common-modify-drawer";
import { CONSTANTS } from "@/utils/constants";
import { Form } from "../ui/form";
import { COMMON_AUTH_FORM_FIELDS, USER_FIELDS } from "@/utils/form-fields";
import { CommonTextField } from "../shared/form/common-text-field";
import { PasswordField } from "../shared/form/password-field";
import { LABELS, NAMES, PLACEHOLDERS } from "@/utils/form";
import toast from "react-hot-toast";

export const ModifyUserDrawer = () => {
    const { open, data } = useAppSelector((state) => state.modal.modifyUser);

    const [createUserApi, { isLoading: createUserLoading }] = useCreateUserApiMutation();

    const dispatch = useAppDispatch();

    const isEdit = !!data?.id;

    const modifyUserForm = useForm<ModifyUserForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: "", email: "", password: ""
        }
    })
    // useEffect(() => {
    //     if (data?.id) {
    //         modifyUserForm.setValue("name", data.name);
    //         modifyUserForm.setValue("email", data.email);
    //     }
    // }, [data]);

    const refetchUsers = () => {
        dispatch(setRefetchUsers(true));
    };

    const closeDrawer = () => {
        modifyUserForm.reset();
        dispatch(closeModifyUserModal());
    };

    const createUser = async (body: any) => {
        await createUserApi(body).unwrap();
        toast.success(SUCCESS_MSG.USER_CREATE);
        refetchUsers();
        closeDrawer();
    }


    const handleSave = async () => {
        const values = modifyUserForm.getValues()
        console.log("Submitting user:", values);
        await createUser(values);
    };

    const submitForm = () => {
        modifyUserForm.handleSubmit(handleSave)();
    }

    return (
        <>
            <CommonModifyDrawer
                open={open}
                onClose={closeDrawer}
                title={isEdit ? INFO_MSG.EDIT_USER : INFO_MSG.ADD_USER}
                onSave={submitForm}
                actionChild={isEdit ? CONSTANTS.UPDATE : CONSTANTS.ADD}
                isLoading={createUserLoading}
            >
                <Form {...modifyUserForm}>
                    <form id={CONSTANTS.USER_FORM} className="w-full flex flex-col gap-y-4">
                        {USER_FIELDS.map((f) => (
                            <CommonTextField
                                name={f.name}
                                label={f.label}
                                placeholder={f.placeholder}
                                control={modifyUserForm.control}
                                spaceNotAllowed={f.spaceNotAllowed}
                                readOnly={isEdit}
                            />
                        ))}
                        {COMMON_AUTH_FORM_FIELDS.map((f) => (
                            <CommonTextField
                                key={f.name}
                                name={f.name}
                                label={f.label}
                                placeholder={f.placeholder}
                                spaceNotAllowed={f.spaceNotAllowed}
                                control={modifyUserForm.control}
                            />
                        ))}
                        <CommonTextField
                            name="phoneNumber"
                            label={LABELS.PHONE_NUMBER}
                            placeholder={PLACEHOLDERS.PHONE_NUMBER}
                            control={modifyUserForm.control}
                        />
                        <PasswordField
                            name={NAMES.PASSWORD}
                            label={LABELS.PASSWORD}
                            placeholder={PLACEHOLDERS.PASSWORD}
                            control={modifyUserForm.control}
                        />
                    </form>
                </Form>
            </CommonModifyDrawer>
        </>
    )
}