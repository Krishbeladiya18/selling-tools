import { VALUES } from "@/utils/constants";
import { NavbarItem } from "./navbar-item";
import { NAVBAR_SECTIONS } from "@/utils/data";


export const Navbar = () => {
  return (
    <footer className="bg-background w-full flex shadow-sm" style={{ height: VALUES.NAVBAR_HEIGHT }}>
         {NAVBAR_SECTIONS.map((s) => (
        <NavbarItem key={s.path} data={s} />
      ))}
    </footer>
  );
};
