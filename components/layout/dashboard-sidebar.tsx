"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, SidebarNavItem } from "@/types";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";

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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProjectSwitcher from "@/components/dashboard/project-switcher";
import { UpgradeCard } from "@/components/dashboard/upgrade-card";
import { Icons } from "@/components/shared/icons";

interface DashboardSidebarProps {
  links: SidebarNavItem[];
}

export function DashboardSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();

  const { isTablet } = useMediaQuery();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isTablet);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (itemTitle: string) => {
    setExpandedItems(prev => ({ ...prev, [itemTitle]: !prev[itemTitle] }));
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => {
      const Icon = Icons[item.icon || "arrowRight"];
      const isExpanded = expandedItems[item.title] || false;
      
      return (
        <Fragment key={`link-fragment-${item.title}`}>
          <div
            className={cn(
              "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
              path === item.href
                ? "bg-muted"
                : "text-muted-foreground hover:text-accent-foreground",
              item.disabled &&
                "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground",
              `ml-${level * 4}`
            )}
          >
            {item.href ? (
              <Link
                href={item.disabled ? "#" : item.href}
                className="flex flex-1 items-center"
              >
                <Icon className="mr-3 size-5" />
                {isSidebarExpanded && item.title}
              </Link>
            ) : (
              <>
                <Icon className="size-5" />
                {isSidebarExpanded && <span className="flex-1">{item.title}</span>}
              </>
            )}
            {isSidebarExpanded && item.badge && (
              <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                {item.badge}
              </Badge>
            )}
            {isSidebarExpanded && item.children && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto size-8"
                onClick={() => toggleExpand(item.title)}
              >
                {isExpanded ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </Button>
            )}
          </div>
          {isSidebarExpanded && item.children && isExpanded && renderNavItems(item.children, level + 1)}
        </Fragment>
      );
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-6 text-lg font-medium",
        isSidebarExpanded ? "w-64" : "w-20",
        isSidebarExpanded ? "flex" : "hidden md:flex"
      )}
    >
      <nav className="flex flex-1 flex-col gap-y-8">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Icons.logo className="size-6" />
          {isSidebarExpanded && (
            <span className="font-urban text-xl font-bold">
              {siteConfig.name}
            </span>
          )}
        </Link>

        <ProjectSwitcher large={isSidebarExpanded} />

        {links.map((section) => (
          <section
            key={section.title}
            className="flex flex-col gap-0.5"
          >
            {isSidebarExpanded && (
              <p className="text-xs text-muted-foreground">
                {section.title}
              </p>
            )}

            {section.items.map((item) => (
              <Fragment key={`link-fragment-${item.title}`}>
                {renderNavItems([item], 0)}
              </Fragment>
            ))}
          </section>
        ))}

        <div className="mt-auto">
          {isSidebarExpanded && <UpgradeCard />}
        </div>
      </nav>
    </div>
  );
}

export function MobileSheetSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isSm, isMobile } = useMediaQuery();

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (itemTitle: string) => {
    setExpandedItems(prev => ({ ...prev, [itemTitle]: !prev[itemTitle] }));
  };

  const renderMobileNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => {
      const Icon = Icons[item.icon || "arrowRight"];
      const isExpanded = expandedItems[item.title] || false;

      return (
        <Fragment key={`link-fragment-${item.title}`}>
          <div
            className={cn(
              "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
              path === item.href
                ? "bg-muted"
                : "text-muted-foreground hover:text-accent-foreground",
              item.disabled &&
                "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground",
              `ml-${level * 4}`
            )}
          >
            {item.href ? (
              <Link
                onClick={() => {
                  if (!item.disabled) setOpen(false);
                }}
                href={item.disabled ? "#" : item.href}
                className="flex flex-1 items-center"
              >
                <Icon className="mr-3 size-5" />
                {item.title}
              </Link>
            ) : (
              <>
                <Icon className="size-5" />
                <span className="flex-1">{item.title}</span>
              </>
            )}
            {item.badge && (
              <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                {item.badge}
              </Badge>
            )}
            {item.children && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto size-8"
                onClick={() => toggleExpand(item.title)}
              >
                {isExpanded ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </Button>
            )}
          </div>
          {item.children && isExpanded && renderMobileNavItems(item.children, level + 1)}
        </Fragment>
      );
    });
  };

  if (isSm || isMobile) {
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

                <ProjectSwitcher large />

                {links.map((section) => (
                  <section
                    key={section.title}
                    className="flex flex-col gap-0.5"
                  >
                    <p className="text-xs text-muted-foreground">
                      {section.title}
                    </p>

                    {section.items.map((item) => (
                      <Fragment key={`link-fragment-${item.title}`}>
                        {renderMobileNavItems([item], 0)}
                      </Fragment>
                    ))}
                  </section>
                ))}

                <div className="mt-auto">
                  <UpgradeCard />
                </div>
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
