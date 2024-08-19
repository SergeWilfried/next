import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Empower Your School",
    description:
      "Unlock the full potential of your educational institution with our comprehensive school information management system. Streamline operations, enhance communication, and improve learning outcomes.",
    image: "/_static/illustrations/school-management.jpg",
    list: [
      {
        title: "Efficient",
        description: "Automate administrative tasks and save valuable time.",
        icon: "clock",
      },
      {
        title: "Innovative",
        description: "Leverage AI-powered tools for personalized learning experiences.",
        icon: "brain",
      },
      {
        title: "Scalable",
        description: "Adapt to your school's needs as it grows and evolves.",
        icon: "trendingUp",
      },
    ],
  },
  {
    title: "Seamless Integration",
    description:
      "EduManager integrates effortlessly into your existing school ecosystem. Connect with your favorite educational tools and services for a unified experience.",
    image: "/_static/illustrations/integration.jpg",
    list: [
      {
        title: "Flexible",
        description: "Customize features to match your school's unique requirements.",
        icon: "settings",
      },
      {
        title: "Connected",
        description: "Sync data across multiple platforms and devices.",
        icon: "link",
      },
      {
        title: "Secure",
        description: "Ensure data privacy and compliance with educational standards.",
        icon: "shield",
      },
    ],
  },
];

export const features: FeatureLdg[] = [
  {
    title: "Student Management",
    description: "Efficiently manage student records, admissions, and track academic progress with ease.",
    link: "/features/student-management",
    icon: "user",
  },
  {
    title: "AI-Powered E-Learning",
    description: "Leverage artificial intelligence for personalized learning experiences and adaptive content delivery.",
    link: "/features/ai-elearning",
    icon: "brain",
  },
  {
    title: "Multi-Channel Communication",
    description: "Stay connected with staff, students, and parents via SMS, WhatsApp, and in-app messaging.",
    link: "/features/communication",
    icon: "messageSquare",
  },
  {
    title: "Payment Reminders",
    description: "Automate fee reminders and streamline payment tracking for parents and guardians.",
    link: "/features/payments",
    icon: "dollarSign",
  },
  {
    title: "Parents Portal",
    description: "Provide parents with real-time access to their child's academic information and school updates.",
    link: "/features/parents-portal",
    icon: "users",
  },
  {
    title: "Attendance Tracking",
    description: "Simplify attendance recording and generate comprehensive reports for students and staff.",
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
      "EduManager has revolutionized how we run our school. The AI-powered e-learning platform has significantly improved student engagement and performance. It's been a game-changer for us.",
  },
  {
    name: "Michael Chen",
    job: "IT Administrator",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review:
      "The ease of implementation and robust features of EduManager impressed me. It seamlessly integrated with our existing systems, and the support team was incredibly helpful throughout the process.",
  },
  {
    name: "Emily Rodriguez",
    job: "Teacher",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    review:
      "As a teacher, I love how EduManager simplifies attendance tracking and grade management. The AI-powered learning tools have helped me provide more personalized instruction to my students.",
  },
  {
    name: "David Okafor",
    job: "Parent",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    review:
      "The parents portal is fantastic! I can easily track my child's progress, communicate with teachers, and receive important updates. The payment reminder feature is also very helpful.",
  },
  {
    name: "Lisa Patel",
    job: "School Administrator",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    review:
      "EduManager has streamlined our administrative tasks tremendously. The multi-channel communication feature, including SMS and WhatsApp, has greatly improved our engagement with parents.",
  },
  {
    name: "Thomas Müller",
    job: "Finance Manager",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    review:
      "The payment tracking and reminder system in EduManager has significantly improved our fee collection process. It's user-friendly for parents and has reduced our administrative workload.",
  },
];