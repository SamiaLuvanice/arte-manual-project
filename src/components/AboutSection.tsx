import { useEffect, useRef } from "react";
import gsap from "gsap";
import useGsap from "@/hooks/useGsap";
import aboutImg from "@/assets/about-crochet.jpg";
import StatCounter from "./ui/StatCounter";
import { STATS, StatItem } from "@/lib/constants";

export default function AboutSection() {
  useGsap();
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgWrapRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.from(textRef.current?.children ?? [], {
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
        <div ref={imgWrapRef} className="overflow-hidden rounded-3xl min-h-[480px] md:min-h-[560px]">
          <img
            ref={imgRef}
            src={aboutImg}
            alt="Novelos de lã coloridos"
            width={800}
            height={1000}
            loading="lazy"
            className="h-full w-full object-cover scale-110 lg:scale-105"
          />
        </div>
        <div ref={textRef}>
          <div className="flex items-baseline gap-4">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Nossa História
            </span>
          </div>

          <h2 id="about-heading" className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight text-cream-foreground md:text-6xl lg:text-7xl">
            Feito com as mãos,<br />
            <span className="italic text-primary">sentido no coração</span>
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
            A Arte Manual nasceu do amor pelo crochê e pela vontade de criar peças que
            aquecem não só o corpo, mas também a alma. Cada produto é cuidadosamente
            confeccionado à mão, com materiais de qualidade e atenção a cada detalhe.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
            Acreditamos que o artesanato é uma forma de expressão e conexão. Nossas peças
            carregam a tradição do crochê com um toque moderno, perfeitas para presentear
            quem você ama ou decorar seu lar com carinho.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6" role="list">
            {STATS.map((stat: StatItem, i) => (
              <StatCounter key={stat.label} stat={stat} delay={0.2 + i * 0.15} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
