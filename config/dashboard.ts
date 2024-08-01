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
        authorizeOnly: [UserRole.ADMIN, UserRole.ACCOUNTANT],
      },
      {
        href: "/dashboard/schools",
        icon: "building",
        title: "Schools",
        authorizeOnly: [UserRole.ADMIN, UserRole.ACCOUNTANT, UserRole.TEACHER],
      },
      {
        href: "/dashboard/students",
        icon: "users",
        title: "Students",
        authorizeOnly: [UserRole.ADMIN, UserRole.ACCOUNTANT, UserRole.TEACHER],
      },
      {
        href: "/dashboard/enrollments",
        icon: "clipboard",
        title: "Enrollments",
        authorizeOnly: [UserRole.ADMIN, UserRole.ACCOUNTANT, UserRole.TEACHER],
      },
      {
        href: "/dashboard/applications",
        icon: "fileText",
        title: "Applications",
        authorizeOnly: [UserRole.ADMIN, UserRole.TEACHER],
      },
      {
        href: "/dashboard/accounting",
        icon: "creditCard",
        title: "Accounting",
        authorizeOnly: [UserRole.ADMIN, UserRole.ACCOUNTANT],
      },
      {
        href: "/dashboard/staff",
        icon: "briefcase",
        title: "Staff",
        authorizeOnly: [UserRole.ADMIN, UserRole.ACCOUNTANT],
      },
      {
        href: "/dashboard/my-children",
        icon: "users",
        title: "My Children",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/reports",
        icon: "fileText",
        title: "Reports",
        authorizeOnly: [UserRole.ADMIN, UserRole.ACCOUNTANT, UserRole.TEACHER],
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
        disabled: true,
      },
      {
        href: "#/dashboard/portal",
        icon: "post",
        title: "Children Portal",
        authorizeOnly: [UserRole.ADMIN, UserRole.PARENT],
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
