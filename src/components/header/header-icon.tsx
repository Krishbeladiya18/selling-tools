interface HeaderIconProps {
  icon: string;
  onClick?: () => any;
}

export const HeaderIcon = ({ icon, onClick }: HeaderIconProps) => {
  return (
    <div
      className="w-8 h-8 bg-app-icon-background flex justify-center items-center rounded-full border border-app-primary hover:cursor-pointer"
      onClick={onClick}
    >
      <img src={icon} />
    </div>
  );
};
