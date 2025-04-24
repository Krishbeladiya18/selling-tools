import { INFO_MSG } from "@/utils/messages";

interface NoDataFoundProps {
  message?: string;
}

export const NoDataFound = ({ message = INFO_MSG.NO_DATA_FOUND }: NoDataFoundProps) => {
  return <div className="w-full text-center py-8 text-sm">{message}</div>;
};
