import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, ChevronRight, Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth, type Role } from "@/lib/auth";
import { SIDEBARS } from "@/lib/modules";
import { useEffect, useState } from "react";

export function Topbar({ role }: { role: Role }) {
  const { user, logout } = useAuth();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(document.documentElement.classList.contains("dark"));
  };

  const base = `/${role}`;
  const segs = path.replace(base, "").split("/").filter(Boolean);
  const items = SIDEBARS[role];
  const currentLabel = segs.length === 0
    ? "Dashboard"
    : (items.find((i) => i.slug === segs[0])?.label || segs[0]);

  const initials = (user?.name || "U").split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to={base as any} className="font-medium hover:text-foreground">{role === "superadmin" ? "SuperAdmin" : role === "admin" ? "Admin" : "Engineer"}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{currentLabel}</span>
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search anything..." className="h-9 w-[260px] pl-8" />
        </div>
        <Button size="icon" variant="ghost" className="h-9 w-9" onClick={toggleTheme}>
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-destructive p-0 px-1 text-[10px] text-destructive-foreground">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["New MB submitted for review","Bill #BIL-9003 approved","Project PRJ-5005 assigned to you"].map((n) => (
              <DropdownMenuItem key={n} className="flex flex-col items-start py-2">
                <span className="text-sm">{n}</span>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback></Avatar>
              <div className="hidden text-left md:block">
                <div className="text-xs font-medium leading-tight">{user?.name}</div>
                <div className="text-[10px] capitalize leading-tight text-muted-foreground">{user?.role}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to={`${base}/$` as any} params={{ _splat: "profile" } as any}>My Profile</Link></DropdownMenuItem>
            {role === "superadmin" && <DropdownMenuItem asChild><Link to={`${base}/$` as any} params={{ _splat: "settings" } as any}>Settings</Link></DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
