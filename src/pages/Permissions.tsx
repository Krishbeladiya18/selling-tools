import { useGetUserApiQuery } from "@/api/user";
import { Header } from "@/components/header";
import { AddIcon } from "@/components/shared/add-icon";
import { DataLoader } from "@/components/shared/data-loader";
import { NoDataFound } from "@/components/shared/no-data-found";
import { SearchField } from "@/components/shared/search-field";
import { ModifyPermissionDrawer } from "@/components/user/modify-permission-drawer";
import { ModifyUserDrawer } from "@/components/user/modify-user-drawer";
import { UserCard } from "@/components/user/user-card";
import { useAppDispatch } from "@/hooks/redux";
import { openModifyUserModal } from "@/store/slices/modelSlices";
import { User } from "@/types/user";
import { CONSTANTS } from "@/utils/constants";
import { PLACEHOLDERS } from "@/utils/form";
import { INFO_MSG } from "@/utils/messages";
import { useState } from "react";

export default function Permissions() {

    const [text, setText] = useState("");
    const { data: permissions = [], isFetching } = useGetUserApiQuery({})

    const dispatch = useAppDispatch();

    const openModifyUser = () => {
        dispatch(openModifyUserModal({}));
    };
    return (
        <>
            <div className="h-full relative overflow-y-auto">
                <Header title={CONSTANTS.PERMISSION_MANAGEMENT} />
                <div className="space-y-4 px-4 py-4">
                    <section className="flex gap-3 h-10">
                        <SearchField value={text} placeholder={PLACEHOLDERS.SEARCH} onChange={setText} />
                        <AddIcon onClick={openModifyUser} />
                    </section>

                    {!isFetching && !permissions.length && <NoDataFound message={INFO_MSG.NO_USER_FOUND} />}

                    <section className="space-y-3">
                        {permissions.map((c: User) => (
                            <UserCard key={c.id} data={c} />
                        ))}
                    </section>

                    {isFetching && <DataLoader dataPresent={!!permissions.length} />}
                </div>
            </div>
            <ModifyUserDrawer />
            <ModifyPermissionDrawer />
        </>
    )
}