import authBackground from "@/assets/img/auth-bg.jpg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full h-full relative">
      <img src={authBackground} className="absolute w-full h-full object-fill" />
      <div className="absolute z-10 px-4 w-full h-full flex items-center">{children}</div>
    </div>
  );
}
