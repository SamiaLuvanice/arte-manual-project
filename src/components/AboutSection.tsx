import aboutImg from "@/assets/about-crochet.jpg";
import useGsap from "@/hooks/useGsap";
import { STATS, StatItem } from "@/lib/constants";
import gsap from "gsap";
import { useEffect, useRef, type ReactElement } from "react";
import SectionHeader from "./SectionHeader";
import StatCounter from "./ui/StatCounter";

export default function AboutSection(): ReactElement {
  useGsap();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-img-wrap", {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.to(".about-img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.from(".about-text > *", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-cream"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div className="about-img-wrap overflow-hidden rounded-3xl min-h-120 md:min-h-140">
          <img
            src={aboutImg}
            alt="Novelos de lã coloridos"
            width={800}
            height={1000}
            loading="lazy"
            className="about-img h-full w-full object-cover scale-110 lg:scale-105"
          />
        </div>
        <div className="about-text">
          <SectionHeader
            eyebrow="Nossa História"
            titleId="about-heading"
            title={
              <>
                Feito com as mãos,
                <br />
                <span className="italic text-primary">sentido no coração</span>
              </>
            }
            description={
              <>
                A Arte Manual nasceu do amor pelo crochê e pela vontade de criar peças que aquecem
                não só o corpo, mas também a alma. Cada produto é cuidadosamente confeccionado à
                mão, com materiais de qualidade e atenção a cada detalhe.
                <br />
                <br />
                Acreditamos que o artesanato é uma forma de expressão e conexão. Nossas peças
                carregam a tradição do crochê com um toque moderno, perfeitas para presentear quem
                você ama ou decorar seu lar com carinho.
              </>
            }
            align="left"
            titleClassName="text-cream-foreground"
          />

          <ul className="mt-8 grid grid-cols-3 gap-6" role="list">
            {STATS.map((stat: StatItem, i) => (
              <li key={stat.label}>
                <StatCounter stat={stat} delay={0.2 + i * 0.15} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
