import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Donnez du Pouvoir à Votre École",
    description:
      "Libérez tout le potentiel de votre établissement éducatif avec notre système complet de gestion de l&apos;information scolaire. Rationalisez les opérations, améliorez la communication et optimisez les résultats d&apos;apprentissage.",
    image: "/_static/illustrations/call-waiting.svg",
    list: [
      {
        title: "Efficace",
        description: "Automatisez les tâches administratives et gagnez un temps précieux.",
        icon: "clock",
      },
      {
        title: "Innovant",
        description: "Tirez parti des outils alimentés par l&apos;IA pour des expériences d&apos;apprentissage personnalisées.",
        icon: "brain",
      }
    ],
  },
  {
    title: "Intégration Transparente",
    description:
      "GeSco s&apos;intègre sans effort dans votre écosystème scolaire existant. Connectez-vous à vos outils et services éducatifs préférés pour une expérience unifiée.",
    image: "/_static/illustrations/rocket-crashed.svg",
    list: [
      {
        title: "Flexible",
        description: "Personnalisez les fonctionnalités pour répondre aux besoins uniques de votre école.",
        icon: "settings",
      },
      {
        title: "Connecté",
        description: "Synchronisez les données sur plusieurs plateformes et appareils.",
        icon: "link",
      },
      {
        title: "Sécurisé",
        description: "Assurez la confidentialité des données et la conformité aux normes éducatives.",
        icon: "shield",
      },
    ],
  },
];

export const features: FeatureLdg[] = [
  {
    title: "Gestion des Étudiants",
    description: "Gérez efficacement les dossiers des étudiants, les admissions et suivez facilement les progrès académiques.",
    link: "/features/student-management",
    icon: "user",
  },
  {
    title: "E-Learning Alimenté par l&apos;IA",
    description: "Utilisez l&apos;intelligence artificielle pour des expériences d&apos;apprentissage personnalisées et une diffusion de contenu adaptative.",
    link: "/features/ai-elearning",
    icon: "brain",
  },
  {
    title: "Communication Multicanale",
    description: "Restez en contact avec le personnel, les étudiants et les parents via SMS, WhatsApp et la messagerie intégrée.",
    link: "/features/communication",
    icon: "messageSquare",
  },
  {
    title: "Rappels de Paiement",
    description: "Automatisez les rappels de frais et simplifiez le suivi des paiements pour les parents et les tuteurs.",
    link: "/features/payments",
    icon: "dollarSign",
  },
  {
    title: "Portail Parents",
    description: "Offrez aux parents un accès en temps réel aux informations académiques de leur enfant et aux mises à jour de l&apos;école.",
    link: "/features/parents-portal",
    icon: "users",
  },
  {
    title: "Suivi des Présences",
    description: "Simplifiez l&apos;enregistrement des présences et générez des rapports complets pour les étudiants et le personnel.",
    link: "/features/attendance",
    icon: "checkSquare",
  },
];

export const testimonials: TestimonialType[] = [
  {
    name: "Sarah Johnson",
    job: "School Principal",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "GeSco a révolutionné la façon dont nous gérons notre école. La plateforme d&apos;e-learning alimentée par l&apos;IA a considérablement amélioré l&apos;engagement et les performances des élèves. Ça a été un véritable changement pour nous.",
  },
  {
    name: "Michael Chen",
    job: "IT Administrator",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review:
      "La facilité de mise en œuvre et les fonctionnalités robustes de GeSco m&apos;ont impressionné. Il s&apos;est intégré parfaitement à nos systèmes existants, et l&apos;équipe de support a été incroyablement utile tout au long du processus.",
  },
  {
    name: "Emily Rodriguez",
    job: "Teacher",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    review:
      "En tant qu&apos;enseignante, j&apos;adore la façon dont GeSco simplifie le suivi des présences et la gestion des notes. Les outils d&apos;apprentissage alimentés par l&apos;IA m&apos;ont aidée à fournir un enseignement plus personnalisé à mes élèves.",
  },
  {
    name: "David Okafor",
    job: "Parent",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    review:
      "Le portail parents est fantastique ! Je peux facilement suivre les progrès de mon enfant, communiquer avec les enseignants et recevoir des mises à jour importantes. La fonction de rappel de paiement est également très utile.",
  },
  {
    name: "Lisa Patel",
    job: "School Administrator",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    review:
      "GeSco a considérablement rationalisé nos tâches administratives. La fonction de communication multicanale, y compris SMS et WhatsApp, a grandement amélioré notre engagement auprès des parents.",
  },
  {
    name: "Thomas Müller",
    job: "Finance Manager",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    review:
      "Le système de suivi et de rappel des paiements de GeSco a considérablement amélioré notre processus de collecte des frais. Il est convivial pour les parents et a réduit notre charge de travail administrative.",
  },
];