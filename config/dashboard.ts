import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Tableau de bord",
        authorizeOnly: ["ADMIN", "ACCOUNTANT"],
      },
      {
        href: "/admin/map",
        icon: "map",
        title: "Carte",
        authorizeOnly: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        href: "/admin/accounting",
        icon: "creditCard",
        title: "Finances",
        authorizeOnly: ["ADMIN", "ACCOUNTANT"],
      },
      {
        href: "/admin/staff",
        icon: "briefcase",
        title: "Enseignants",
        authorizeOnly: ["ADMIN", "ACCOUNTANT"],
      },
      {
        href: "/admin/parents",
        icon: "users",
        title: "Parents",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
      },
      {
        href: "/admin/class",
        icon: "book",
        title: "Classes",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
      },
      {
        href: "/admin/students",
        icon: "users",
        title: "Étudiants",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
      },
      {
        href: "#",
        icon: "book",
        title: "Curriculum",
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
        children: [
          {
            href: "/admin/calendar",
            icon: "calendar",
            title: "Emploi du temps",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/subjects",
            icon: "book",
            title: "Cours",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/grades",
            icon: "building",
            title: "Notes",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/attendance",
            icon: "check",
            title: "Présence",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
          {
            href: "/admin/exams",
            icon: "clipboard",
            title: "Examens",
            authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
          },
        ],
      },
      {
        href: "/admin/applications",
        icon: "fileText",
        title: "Candidatures",
        authorizeOnly: ["ADMIN", "TEACHER"],
      },
      {
        href: "/admin/reports",
        icon: "fileText",
        title: "Rapports",
        badge: 2,
        authorizeOnly: ["ADMIN", "ACCOUNTANT", "TEACHER"],
      },
      {
        href: "/dashboard",
        icon: "home",
        title: "Tableau de bord",
        authorizeOnly: ["USER"],
        children: [
          {
            href: "/dashboard/my-children",
            icon: "users",
            title: "Mes enfants",
            authorizeOnly: ["USER"],
          },
          {
            href: "/dashboard/billing",
            icon: "billing",
            title: "Facturation",
            authorizeOnly: ["USER"],
          },
          {
            href: "#/dashboard/portal",
            icon: "post",
            title: "Portail Parent",
            authorizeOnly: ["ADMIN", "PARENT"],
          },
        ],
      }
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Paramètres" },
      { href: "/", icon: "home", title: "Accueil" },
      { href: "#", icon: "bookOpen", title: "Documentation" },
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
