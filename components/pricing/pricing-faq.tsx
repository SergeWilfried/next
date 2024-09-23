import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "Quel est le coût du plan gratuit ?",
    answer:
      "Notre plan gratuit est totalement gratuit, sans frais mensuels ni annuels. C&apos;est un excellent moyen de commencer et d&apos;explorer nos fonctionnalités de base.",
  },
  {
    id: "item-2",
    question: "Combien coûte le plan Basique Mensuel ?",
    answer:
      "Le plan Basique Mensuel coûte 15 € par mois. Il donne accès à nos fonctionnalités principales et est facturé mensuellement.",
  },
  {
    id: "item-3",
    question: "Quel est le prix du plan Pro Mensuel ?",
    answer:
      "Le plan Pro Mensuel est disponible pour 25 € par mois. Il offre des fonctionnalités avancées et est facturé mensuellement pour plus de flexibilité.",
  },
  {
    id: "item-4",
    question: "Proposez-vous des abonnements annuels ?",
    answer:
      "Oui, nous proposons des abonnements annuels pour plus d&apos;économies. Le plan Basique Annuel est à 144 € par an, et le plan Pro Annuel à 300 € par an.",
  },
  {
    id: "item-5",
    question: "Y a-t-il une période d&apos;essai pour les plans payants ?",
    answer:
      "Nous offrons un essai gratuit de 14 jours pour les plans Pro Mensuel et Pro Annuel. C&apos;est idéal pour tester toutes les fonctionnalités avant de s&apos;engager.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Questions Fréquemment Posées"
        subtitle="Explorez notre FAQ complète pour trouver rapidement des réponses aux questions courantes. Pour plus d&apos;aide, n&apos;hésitez pas à nous contacter."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
