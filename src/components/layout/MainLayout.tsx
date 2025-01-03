import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar className="z-50" />
      <main className={cn(
        "pl-64 min-h-screen transition-all duration-300 ease-in-out",
        className
      )}>
        <div className="container py-6">
          {children}
        </div>
      </main>
    </div>
  );
}