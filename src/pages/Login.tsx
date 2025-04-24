import { usePostLoginDataMutation } from "@/api/auth";
import AppLogo from "@/assets/svg/app-logo.svg";
import { CommonTextField } from "@/components/shared/form/common-text-field";
import { PasswordField } from "@/components/shared/form/password-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, ModifyUserForm } from "@/schemas/user";
import { CONSTANTS } from "@/utils/constants";
import { LABELS, NAMES, PLACEHOLDERS } from "@/utils/form";
import { COMMON_AUTH_FORM_FIELDS } from "@/utils/form-fields";
import { INFO_MSG, SUCCESS_MSG } from "@/utils/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Login() {

    const [loginUserApi, { isLoading }] = usePostLoginDataMutation();

    const loginForm = useForm<ModifyUserForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

     const handleLogin = async (values: ModifyUserForm) => {
        try {
            const result= await loginUserApi(values).unwrap();
            const token = result?.token;
        
            if (token) {
              localStorage.setItem(CONSTANTS.AUTH_TOKEN, JSON.stringify(token));
              toast.success(SUCCESS_MSG.LOGIN_SUCCESS);
              window.location.replace("/");
            } else {
              // toast.error("Token not found in response");
              console.error("Token not found in response");
            }
          } catch (error) {
            console.error("Login failed: ", error);
            toast.error("Invalid email or password");
          }
    }
    return (
        <div className="w-full bg-background rounded-4xl flex flex-col items-center gap-y-4 py-6">
            <img src={AppLogo} />
            <div className="w-full flex flex-col gap-y-1 items-center">
                <h1 className="text-2xl font-bold">{CONSTANTS.LOGIN}</h1>
                <p className="text-app-text-foreground text-sm">{INFO_MSG.WELCOME_LOGIN}</p>
            </div>
            <Form {...loginForm}>
                <form id={CONSTANTS.LOGIN_FORM} onSubmit={loginForm.handleSubmit(handleLogin)} className="w-full px-4 flex flex-col gap-y-4">
                    {COMMON_AUTH_FORM_FIELDS.map((f) => (
                        <CommonTextField
                            key={f.name}
                            name={f.name}
                            label={f.label}
                            placeholder={f.placeholder}
                            spaceNotAllowed={f.spaceNotAllowed}
                            control={loginForm.control}
                        />
                    ))}
                    <div className="flex flex-col gap-y-1 items-end">
                        <PasswordField name={NAMES.PASSWORD} label={LABELS.PASSWORD} placeholder={PLACEHOLDERS.PASSWORD} control={loginForm.control} />
                        <p className="text-app-primary font-semibold text-sm hover:cursor-pointer select-none">{INFO_MSG.FORGOT_PASSWORD}</p>
                    </div>
                    <Button className="font-bold w-full rounded-full h-10 flex justify-center items-center mt-6">
                    {isLoading ? <Spinner /> : CONSTANTS.LOGIN}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Login