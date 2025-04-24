import { User } from "@/types/user"
import { EditBtn } from "../shared/edit-btn";
import KeyIcon from "@/assets/svg/key-icon.svg";
import { openModifyPermissionModal, openModifyUserModal } from "@/store/slices/modelSlices";
import { useAppDispatch } from "@/hooks/redux";

interface UserCardProps {
    data: User;
}
export const UserCard = ({ data }: UserCardProps) => {

    const { id, name, email } = data;

    const dispatch = useAppDispatch();

    const givePermission = () => {
        dispatch(openModifyPermissionModal(data));
    };

    // const editUser = () => {
    //     dispatch(openModifyUserModal(data));
    // };

    return (
        <>
            <div className="flex justify-between items-center rounded-xl bg-background p-2.5">
                <div className="divide-y">
                    <h4 className="font-semibold">{name}</h4>
                    <p className="flex font-semibold">{email}</p>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={givePermission}>
                        <img src={KeyIcon} alt="Permission" className="h-8 w-8"/>
                    </button>
                    {/* <EditBtn onClick={editUser} /> */}
                </div>
            </div>
        </>
    )
}