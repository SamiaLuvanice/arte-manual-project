import heroImg from "@/assets/hero-crochet.jpg";
import useGsap from "@/hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactElement } from "react";

export default function HeroSection(): ReactElement {
  useGsap();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const arteRef = useRef<HTMLSpanElement | null>(null);
  const manualRef = useRef<HTMLSpanElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const wordTargets = titleRef.current?.querySelectorAll<HTMLElement>("[data-word]") ?? [];

      const introDuration = prefersReduced ? 0 : 1.4;
      const introOffset = prefersReduced ? 0 : 24;

      const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      introTl
        .from(imgRef.current, {
          scale: 1.15,
          opacity: 0,
          duration: introDuration,
          ease: "power2.out",
        })
        .from(
          eyebrowRef.current,
          { y: 16, opacity: 0, duration: introDuration * 0.45 },
          `-=${Math.min(0.9, introDuration)}`,
        )
        .from(
          subtitleRef.current,
          { y: 28, opacity: 0, duration: introDuration * 0.5 },
          `-=${Math.min(0.5, introDuration)}`,
        )
        .from(
          ctaRef.current,
          { y: 24, opacity: 0, duration: introDuration * 0.45 },
          `-=${Math.min(0.35, introDuration)}`,
        );

      gsap.set(titleRef.current, {
        y: introOffset,
        scale: prefersReduced ? 1.02 : 1.06,
        filter: prefersReduced ? "none" : "blur(2px)",
        opacity: 0,
      });
      gsap.set(wordTargets, {
        yPercent: prefersReduced ? 40 : 110,
        opacity: 0,
      });
      gsap.set([arteRef.current, manualRef.current], { xPercent: 0 });

      const titleStartY = prefersReduced ? 24 : 72;
      const titleEndY = prefersReduced ? -8 : -28;
      const titleStartScale = prefersReduced ? 1.02 : 1.08;
      const titleEndScale = prefersReduced ? 1 : 0.98;
      const wordStart = prefersReduced ? 40 : 110;
      const imageStart = prefersReduced ? 4 : 12;
      const sideStart = prefersReduced ? 48 : 120;
      const clamp01 = gsap.utils.clamp(0, 1);

      const trigger = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: prefersReduced ? "+=95%" : "+=140%",
        scrub: prefersReduced ? 0.5 : 0.8,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const eyebrowProgress = clamp01(progress / 0.34);
          const arteProgress = clamp01((progress - 0.03) / 0.58);
          const manualProgress = clamp01((progress - 0.11) / 0.66);
          const subtitleProgress = clamp01((progress - 0.18) / 0.56);
          const ctaProgress = clamp01((progress - 0.28) / 0.44);

          if (eyebrowRef.current) {
            gsap.set(eyebrowRef.current, {
              y: (1 - eyebrowProgress) * 16,
              opacity: eyebrowProgress,
              letterSpacing: `${0.4 - eyebrowProgress * 0.12}em`,
            });
          }

          if (titleRef.current) {
            const y = titleStartY + (titleEndY - titleStartY) * progress;
            const scale = titleStartScale + (titleEndScale - titleStartScale) * progress;
            const blur = prefersReduced ? 0 : (1 - progress) * 2;
            const titleOpacity = clamp01(progress / 0.06);
            gsap.set(titleRef.current, {
              y,
              scale,
              filter: `blur(${blur}px)`,
              opacity: titleOpacity,
            });
          }

          gsap.set(arteRef.current, {
            xPercent: -sideStart * (1 - arteProgress),
            rotate: (1 - arteProgress) * -3,
            yPercent: (1 - arteProgress) * 10,
            opacity: clamp01((progress - 0.02) / 0.16),
          });
          gsap.set(manualRef.current, {
            xPercent: sideStart * (1 - manualProgress),
            rotate: (1 - manualProgress) * 3,
            yPercent: (1 - manualProgress) * 6,
            opacity: clamp01((progress - 0.08) / 0.16),
          });

          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, {
              y: (1 - subtitleProgress) * 22,
              opacity: subtitleProgress,
              filter: `blur(${(1 - subtitleProgress) * 1.2}px)`,
            });
          }

          if (ctaRef.current) {
            gsap.set(ctaRef.current, {
              y: (1 - ctaProgress) * 18,
              opacity: ctaProgress,
              scale: 0.98 + ctaProgress * 0.02,
            });
          }
          gsap.set(imgRef.current, {
            yPercent: imageStart * progress,
          });
        },
      });

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <div ref={imgRef} className="absolute inset-0">
          <img
            src={heroImg}
            alt="Produtos artesanais em crochê"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
          <span
            ref={eyebrowRef}
            className="mb-6 inline-block font-body text-[0.7rem] font-medium uppercase tracking-[0.4em] text-primary-foreground/70 md:text-xs"
          >
            — Crochê artesanal · Desde 2019 —
          </span>
          <h1
            ref={titleRef}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-6xl font-bold leading-[0.9] tracking-tighter text-primary-foreground md:text-8xl lg:text-[10rem]"
          >
            <span className="inline-block overflow-hidden pb-[0.12em]">
              <span ref={arteRef} data-word className="inline-block will-change-transform">
                Arte
              </span>
            </span>
            <span className="inline-block overflow-hidden pb-[0.12em]">
              <span
                ref={manualRef}
                data-word
                className="inline-block italic text-accent-warm will-change-transform"
              >
                Manual
              </span>
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="mx-auto mt-6 max-w-xl font-body text-lg font-light leading-relaxed text-primary-foreground/80 md:text-xl"
          >
            Peças únicas feitas à mão com carinho e dedicação. Cada ponto conta uma história de
            tradição e amor pelo artesanato.
          </p>
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <button onClick={() => scrollTo("products")} className="btn-primary">
              Ver Produtos
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="btn-outline border-accent-warm-foreground/80 text-accent-warm-foreground"
            >
              Nossa História
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-accent-warm-foreground"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}