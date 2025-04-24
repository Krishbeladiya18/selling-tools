import { Navbar } from "@/components/footer";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="w-full h-full bg-app-background flex flex-col">
      <div className="flex-1 min-h-0">{children}</div>
      <Navbar />
    </div>
  );
}
