import { type ReactElement } from "react";

const WORDS = ["Crochê", "Artesanal", "Único", "Feito à mão"] as const;

export default function Marquee(): ReactElement {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-border bg-cream py-8 md:py-10"
    >
      {/* Fades laterais */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent md:w-40" />

      <div className="marquee-track flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {WORDS.map((word, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-10 px-10 font-display text-4xl font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl"
              >
                {word}
                <span className="text-3xl text-primary md:text-5xl lg:text-6xl" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
