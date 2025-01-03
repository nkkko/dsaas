import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Header({ collapsed, onToggleCollapse }: HeaderProps) {
  return (
    <div className="flex h-14 items-center justify-between px-4 border-b">
      {!collapsed && <span className="font-semibold">Daytona</span>}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onToggleCollapse}
        className={cn("ml-auto")}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </Button>
    </div>
  );
}