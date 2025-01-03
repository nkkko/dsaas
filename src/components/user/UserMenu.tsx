import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from '../theme/ThemeProvider';

interface UserMenuProps {
  username?: string;
}

export function UserMenu({ username = "User" }: UserMenuProps) {
  const { theme, setTheme } = useTheme();
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <User size={16} />
          {username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="cursor-pointer"
        >
          {theme === 'light' ? (
            <>
              <Moon className="mr-2" size={16} />
              Dark Mode
            </>
          ) : (
            <>
              <Sun className="mr-2" size={16} />
              Light Mode
            </>
          )}
        </DropdownMenuItem>
        <Link to="/logout">
          <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
            <LogOut className="mr-2" size={16} />
            Logout
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}