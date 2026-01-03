"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  Home,
  MapPin,
  Users,
  User,
  PanelLeft,
  Search,
  LogIn
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { WanderlinkLogo } from "@/components/icons/wanderlink-logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/destinations", icon: MapPin, label: "Destinations" },
  { href: "/groups", icon: Users, label: "Groups" },
  { href: "/profile", icon: User, label: "Profile" },
];

function MainSidebar() {
    const pathname = usePathname();
    const { state } = useSidebar();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <WanderlinkLogo className="size-8 text-primary" />
                    <span className="text-lg font-headline group-data-[collapsible=icon]:hidden">WanderLink</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.href}
                                tooltip={{
                                  children: item.label,
                                }}
                            >
                                <Link href={item.href}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <div className="border rounded-lg p-4 text-sm group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:bg-card">
                    <h3 className="font-semibold group-data-[collapsible=icon]:hidden">Ready to sign in?</h3>
                    <p className="text-muted-foreground mt-1 group-data-[collapsible=icon]:hidden">Create an account to save your trips and preferences.</p>
                     <Button asChild className="w-full mt-3">
                        <Link href="/login">
                            <LogIn />
                            <span className="group-data-[collapsible=icon]:hidden">Login</span>
                        </Link>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-sidebar text-sidebar-foreground p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
                <WanderlinkLogo className="size-8 text-primary" />
                <span className="text-lg font-headline">WanderLink</span>
            </div>
            <nav className="grid gap-2 text-lg font-medium p-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 mt-auto">
                 <Button asChild className="w-full">
                    <Link href="/login">
                        <LogIn className="mr-2"/>
                        Login
                    </Link>
                </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <UserNav />
    </header>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <MainSidebar />
        <SidebarInset>
            <div className="flex flex-col">
              <MobileHeader />
              <main className="flex-1 p-4 sm:p-6">{children}</main>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
