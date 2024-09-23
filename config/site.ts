import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Gesco",
  description:
    "Révolutionnez la gestion de votre école avec Gesco ! Notre plateforme de gestion scolaire tout-en-un offre des outils puissants pour l'administration, la communication et l'apprentissage, conçus pour optimiser les opérations éducatives et améliorer l'expérience des élèves, des enseignants et des parents.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/JeSappelleSerge",
    github: "https://github.com/sergewilfried/next",
  },
  mailSupport: "assistance@bangre.co",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "A propos", href: "#" },
      { title: "Entreprise", href: "#" },
      { title: "Conditions d'utilisation", href: "#" },
      { title: "Politique de confidentialité", href: "#" },
    ],
  },
  {
    title: "Produit",
    items: [
      { title: "Sécurité", href: "#" },
      { title: "Clients", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" }
    ],
  },
];
