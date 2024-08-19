import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: ["ADMIN", "ACCOUNTANT"],
      },
      {
        href: "/admin/students",
        icon: "users",
        title: "Students",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
      },
      {
        href: "/admin/staff",
        icon: "briefcase",
        title: "Staff",
        authorizeOnly: ["ADMIN", "ACCOUNTANT"],
      },
      {
        href: "/admin/accounting",
        icon: "creditCard",
        title: "Accounting",
        authorizeOnly: ["ADMIN", "ACCOUNTANT"],
      },
      {
        href: "/admin/calendar",
        icon: "calendar",
        title: "Calendar",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
      },
      {
        href: "/admin/classes",
        icon: "book",
        title: "Classes",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
        children: [
          {
            href: "/admin/grades",
            icon: "building",
            title: "Grades",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/enrollments",
            icon: "clipboard",
            title: "Enrollments",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
        ],
      },
      {
        href: "/admin/applications",
        icon: "fileText",
        title: "Applications",
        authorizeOnly: ["ADMIN", "TEACHER"],
      },
      {
        href: "/admin/reports",
        icon: "fileText",
        title: "Reports",
        badge: 2,
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
      },
      {
        href: "/admin/donations",
        icon: "package",
        title: "Donations",
        badge: 5,
        authorizeOnly: ["ADMIN"],
        disabled: false,
      },
      {
        href: "/dashboard",
        icon: "home",
        title: "Dashboard",
        authorizeOnly: ["USER"],
        children: [
          {
            href: "/dashboard/my-children",
            icon: "users",
            title: "My Children",
            authorizeOnly: ["USER"],
          },
          {
            href: "/dashboard/billing",
            icon: "billing",
            title: "Billing",
            authorizeOnly: ["USER"],
          },
          {
            href: "#/dashboard/portal",
            icon: "post",
            title: "Children Portal",
            authorizeOnly: ["ADMIN", "PARENT"],
          },
        ],
      },
      {
        href: "/dashboard/parents",
        icon: "users",
        title: "Parents",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
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
        authorizeOnly: ["USER"],
        disabled: true,
      },
    ],
  },
];
