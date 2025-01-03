import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Home,
  Layers,
  Key,
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { UserMenu } from '../user/UserMenu';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const links = [
    { title: "Get Started", icon: Home, href: "/" },
    { title: "Workspaces", icon: Layers, href: "/workspaces" },
    { title: "API Keys", icon: Key, href: "/api-keys" },
  ];

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "fixed left-0 top-0 h-full bg-background border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}>
        <Header 
          collapsed={collapsed} 
          onToggleCollapse={() => setCollapsed(!collapsed)} 
        />
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-1 p-2">
            {links.map((link) => (
              <Link 
                key={link.href}
                to={link.href}
              >
                <Button
                  variant={location.pathname === link.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed ? "px-2" : "px-4"
                  )}
                >
                  <link.icon size={20} className={cn(
                    "min-w-[20px]",
                    collapsed ? "mr-0" : "mr-3"
                  )} />
                  {!collapsed && link.title}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "px-4"
          )}>
            <UserMenu username="John Doe" />
            {!collapsed && (
              <span className="ml-3 text-sm text-muted-foreground">
                Profile
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}