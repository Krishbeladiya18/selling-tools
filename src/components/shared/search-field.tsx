import { Input } from "../ui/input";
import SearchIcon from "@/assets/svg/search.svg";

interface SeachFieldProps {
  value: string;
  placeholder: string;
  onChange: (arg: string) => any;
}

export const SearchField = ({ value, placeholder, onChange }: SeachFieldProps) => {
  return (
    <div className="h-full w-full relative">
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full bg-background py-1.5 pl-3 pr-9 rounded-md"
      />
      <div className="absolute h-full top-0 right-3 flex justify-center items-center">
        <img src={SearchIcon} alt="Search" className="" />
      </div>
    </div>
  );
};
