
import { BackBtn } from "../shared/back-btn";
import {CONSTANTS, VALUES } from "@/utils/constants";
import { memo } from "react";
import { HeaderIcon } from "./header-icon";
import LogoutIcon from "@/assets/svg/logout.svg";
import UserIcon from "@/assets/svg/user.svg";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

export const Header = memo(({ title }: HeaderProps) => {
  
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
    window.location.replace("/login");
  }

  return (
    <header
      className="sticky z-10 w-full top-0 bg-background flex justify-between items-center px-4 shadow-sm"
      style={{ height: VALUES.HEADER_HEIGHT }}
    >
      <div className="flex gap-2 items-center">
        <BackBtn />
        <h1 className="font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
      <HeaderIcon icon={UserIcon} onClick={() => navigate('/permissions')}/>
      <HeaderIcon icon={LogoutIcon} onClick={logoutUser}/>
      </div>
    </header>
  );
});
