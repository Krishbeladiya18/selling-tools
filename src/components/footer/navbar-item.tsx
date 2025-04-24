
import { cn } from "@/lib/utils";
import { NavbarSection } from "@/types/common";
import { Link, useLocation } from "react-router-dom";

interface NavbarItem {
    data: NavbarSection;
}

export const NavbarItem = ({ data }: NavbarItem) => {
    const {path, icon: Icon, label} = data
    const location = useLocation();
    
    const isActive = location.pathname === path;
    return (
        <Link to={path} className="flex-1 flex flex-col items-center overflow-hidden">
            <div className={cn("w-8 h-1.5", isActive ? "bg-app-primary" : "bg-transparent")} />

            <div className="w-full flex-1 flex flex-col justify-center items-center gap-y-1">
                <div className="h-5 flex justify-center items-center">
                    <Icon color={isActive ? "var(--app-primary)" : ""} />
                </div>
                <p className={cn("text-sm font-semibold", isActive ? "text-app-primary" : "text-app-text-foreground")}>{label}</p>
            </div>
        </Link>
    );

};
