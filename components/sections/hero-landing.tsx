import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          href="#features"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "full" }),
            "px-4",
          )}
        >
          <span className="mr-3">📚</span>
          <span>Découvrez nos fonctionnalités</span>
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          La meilleure façon de gérer votre{" "}
          <TypeAnimation
            sequence={[
              'école',
              1000,
              'université',
              1000,
              'institut',
              1000,
              'académie',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            style={{
              display: 'inline-block',
              minWidth: '200px', // Adjust as needed
            }}
            className="text-gradient_indigo-purple"
          />
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Gérez efficacement les dossiers des élèves, les paiements, la présence, les notes et plus encore avec notre logiciel complet de gestion scolaire.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="https://cal.com/sergewilfried/30min"
            target="_blank"
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2",
            )}
          >
            <span>Demander une démo</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "px-5",
            )}
          >
            <Icons.mail className="mr-2 size-4" />
            <p>Contactez-nous</p>
          </Link>
        </div>
      </div>
    </section>
  );
}