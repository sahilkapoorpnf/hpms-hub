import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, LogOut } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SIDEBARS, type Role } from "@/lib/modules";
import { useAuth } from "@/lib/auth";

export function AppSidebar({ role }: { role: Role }) {
  const items = SIDEBARS[role];
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { logout } = useAuth();
  const base = `/${role}`;

  const labelMap: Record<Role, string> = { superadmin: "SUPERADMIN", admin: "ADMIN", engineer: "ENGINEER" };

  const isActive = (slug: string) => {
    const full = slug ? `${base}/${slug}` : base;
    return path === full || (slug && path.startsWith(full + "/"));
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar">
        <Link to={base as string} className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground shadow">
            <Building2 className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-wide text-sidebar-foreground">HPMS</span>
              <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">{labelMap[role]} Portal</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.slug || "");
                const Icon = item.icon;
                const linkProps = item.slug
                  ? { to: `${base}/$`, params: { _splat: item.slug } as any }
                  : { to: base as string };
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.label}
                      className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-medium">
                      <Link {...(linkProps as any)}>
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Logout"
              className="text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
