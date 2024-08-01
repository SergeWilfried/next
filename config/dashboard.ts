import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      {
        href: "/dashboard/schools",
        icon: "building",
        title: "Schools",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/students",
        icon: "users",
        title: "Students",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/enrollments",
        icon: "clipboard",
        title: "Enrollments",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/applications",
        icon: "fileText",
        title: "Applications",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/payments",
        icon: "creditCard",
        title: "Payments",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/pickup",
        icon: "truck",
        title: "Pickup Management",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/staff",
        icon: "briefcase",
        title: "Staff Management",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/my-children",
        icon: "users",
        title: "My Children",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/billing",
        icon: "billing",
        title: "Billing",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/admin/orders",
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "#/dashboard/posts",
        icon: "post",
        title: "User Posts",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/docs", icon: "bookOpen", title: "Documentation" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
