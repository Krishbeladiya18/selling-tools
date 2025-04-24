import { Spinner } from "../ui/spinner";


export const Loader = () => {
  return (
    <div className="w-full h-full bg-app-background flex justify-center items-center">
      <Spinner size={36} color="var(--app-primary)" />
    </div>
  );
};
