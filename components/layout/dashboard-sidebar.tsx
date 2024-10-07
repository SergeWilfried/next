"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { MainNavItem, SidebarNavItem } from "@/types";
import { Menu, PanelLeftClose, PanelRightClose } from "lucide-react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProjectSwitcher from "@/components/dashboard/project-switcher";
import { UpgradeCard } from "@/components/dashboard/upgrade-card";
import { Icons } from "@/components/shared/icons";
import { School } from "@prisma/client";

interface DashboardSidebarProps {
  links: SidebarNavItem[];
  user: {
    role: string;
    // Add other relevant user properties
  };
  schools: School[];
}

function NavItem({ item, path, isSidebarExpanded }: { item: MainNavItem; path: string; isSidebarExpanded: boolean }) {
  const [isOpen, setIsOpen] = useState(path.startsWith(item.href));
  const Icon = Icons[item.icon || "arrowRight"];

  if (item.children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="relative flex items-center">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-2 py-1.5 text-sm font-medium"
            >
              <div className="flex items-center">
                <Icon className="mr-2 size-4" />
                {item.title}
              </div>
              <ChevronRight
                className={cn(
                  "size-4 transition-transform duration-200",
                  isOpen ? "rotate-90" : ""
                )}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pl-4 pt-1">
          <ul className="grid gap-1">
            {item.children.map((child) => (
              <NavItem key={child.title} item={child} path={path} isSidebarExpanded={isSidebarExpanded} />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return isSidebarExpanded ? (
    <Link
      href={item.disabled ? "#" : item.href}
      className={cn(
        "flex items-center gap-3 rounded-md p-2 text-sm font-medium",
        "hover:bg-muted",
        path === item.href
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-accent-foreground",
        item.disabled && "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground"
      )}
    >
      <Icon className="size-5" />
      <span>{item.title}</span>
      {item.badge && (
        <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
          {item.badge}
        </Badge>
      )}
    </Link>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center justify-center rounded-md py-2",
            "hover:bg-muted",
            path === item.href
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-accent-foreground",
            item.disabled && "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground"
          )}
        >
          <Icon className="size-5" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        {item.title}
      </TooltipContent>
    </Tooltip>
  );
}

export function DashboardSidebar({ links, user, schools }: DashboardSidebarProps) {
  const path = usePathname();
  if (!user) redirect("/login");
  if (user.role === "USER" || user.role === 'PARENT') {
    redirect("/dashboard");
  } else {
    redirect("/admin");
  }

  const { isTablet } = useMediaQuery();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isTablet);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <div className="sticky top-0 h-full">
      <ScrollArea className="h-full overflow-y-auto border-r">
        <aside
          className={cn(
            "transition-width duration-300 ease-in-out",
            isSidebarExpanded ? "w-64" : "w-[68px]",
            "hidden h-screen md:block"
          )}
        >
          <div className="flex h-full max-h-screen flex-1 flex-col gap-2">
            <div className="flex h-14 items-center justify-between px-4 lg:h-[60px]">
              {isSidebarExpanded && <ProjectSwitcher schools={schools || []} />}
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto size-8"
                onClick={toggleSidebar}
              >
                {isSidebarExpanded ? (
                  <PanelLeftClose className="size-4" />
                ) : (
                  <PanelRightClose className="size-4" />
                )}
              </Button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 px-2 pt-2">
              {links.map((section) => (
                <div key={section.title} className="flex flex-col gap-1">
                  {isSidebarExpanded && (
                    <p className="px-2 text-xs font-medium text-muted-foreground">
                      {section.title}
                    </p>
                  )}
                  <ul className="grid gap-1">
                    {section.items.map((item) => (
                      <NavItem key={item.title} item={item} path={path} isSidebarExpanded={isSidebarExpanded} />
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* {isSidebarExpanded && (
              <div className="mt-auto p-4">
                <UpgradeCard />
              </div>
            )} */}
          </div>
        </aside>
      </ScrollArea>
    </div>
  );
}

export function MobileSheetSidebar({ links, user, schools }: DashboardSidebarProps) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isMobile } = useMediaQuery();
  if (!user || user.role !== "ADMIN") redirect("/login");

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 md:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <ScrollArea className="h-full overflow-y-auto">
            <div className="flex h-screen flex-col">
              <nav className="flex flex-1 flex-col gap-y-8 p-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Icons.logo className="size-6" />
                  <span className="font-urban text-xl font-bold">
                    {siteConfig.name}
                  </span>
                </Link>

                <ProjectSwitcher schools={schools || []} large />

                {links.map((section) => (
                  <section key={section.title} className="flex flex-col gap-0.5">
                    <p className="text-xs text-muted-foreground">{section.title}</p>
                    {section.items.map((item) => (
                      <NavItem key={item.title} item={item} path={path} isSidebarExpanded={true} />
                    ))}
                  </section>
                ))}

                {/* <div className="mt-auto">
                  <UpgradeCard />
                </div> */}
              </nav>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex size-9 animate-pulse rounded-lg bg-muted md:hidden" />
  );
}
