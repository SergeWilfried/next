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
        href: "/admin/accounting",
        icon: "creditCard",
        title: "Financials",
        authorizeOnly: ["ADMIN", "ACCOUNTANT"],
      },
    
      {
        href: "/admin/attendance",
        title: "People",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
        icon: "users",
        children: [
          {
            href: "/admin/staff",
            icon: "briefcase",
            title: "Staff",
            authorizeOnly: ["ADMIN", "ACCOUNTANT"],
          },
          {
            href: "/admin/parents",
            icon: "users",
            title: "Parents",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
        ]
      },
      {
        href: "/admin/class",
        icon: "book",
        title: "Academic",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
        children: [
          {
            href: "/admin/calendar",
            icon: "calendar",
            title: "Schedule",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/students",
            icon: "users",
            title: "Students",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/class",
            icon: "book",
            title: "Classes",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/subjects",
            icon: "book",
            title: "Courses",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/grades",
            icon: "building",
            title: "Grades",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/attendance",
            icon: "clipboard",
            title: "Attendance",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/exams",
            icon: "clipboard",
            title: "Exams",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
        ],
      },
      {
        href: "/admin/enrollments",
        icon: "clipboard",
        title: "Enrollments",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
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
      }
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
