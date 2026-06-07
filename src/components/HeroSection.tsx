import heroImg from "@/assets/hero-crochet.jpg";
import useGsap from "@/hooks/useGsap";
import gsap from "gsap";
import { useEffect, useRef, type ReactElement } from "react";

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

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const wordTargets = titleRef.current?.querySelectorAll<HTMLElement>("[data-word]") ?? [];

      const introDuration = prefersReduced ? 0 : 1.6;
      const smallDur = prefersReduced ? 0 : 0.7;

      // Intro timeline (image + eyebrow + subtitle + CTA) on mount
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(imgRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: introDuration,
        ease: "power2.out",
      })
        .from(
          eyebrowRef.current,
          { y: 16, opacity: 0, duration: smallDur },
          `-=${Math.min(1, introDuration)}`,
        )
        .from(
          subtitleRef.current,
          { y: 28, opacity: 0, duration: prefersReduced ? 0 : 0.8 },
          `-=${Math.min(0.6, introDuration)}`,
        )
        .from(
          ctaRef.current,
          { y: 24, opacity: 0, duration: prefersReduced ? 0 : 0.6 },
          `-=${Math.min(0.4, introDuration)}`,
        );

      if (!prefersReduced) {
        // Pin the hero and drive the word reveal + parallax with a light scrub
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=80%",
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        scrubTl
          .fromTo(
            wordTargets,
            { yPercent: 110 },
            { yPercent: 0, ease: "power3.out", stagger: 0.25, duration: 1 },
            0,
          )
          .fromTo(
            arteRef.current,
            { xPercent: -120 },
            { xPercent: 0, ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            manualRef.current,
            { xPercent: 120 },
            { xPercent: 0, ease: "none", duration: 1 },
            0,
          )
          .to(imgRef.current, { yPercent: 12, ease: "none", duration: 1 }, 0);
      } else {
        // If reduced motion is preferred, ensure final states are applied immediately
        wordTargets.forEach((el) => (el.style.transform = "translateY(0)"));
        if (arteRef.current) arteRef.current.style.transform = "translateX(0)";
        if (manualRef.current) manualRef.current.style.transform = "translateX(0)";
        if (imgRef.current) imgRef.current.style.transform = "translateY(0)";
        if (eyebrowRef.current) eyebrowRef.current.style.opacity = "1";
        if (subtitleRef.current) subtitleRef.current.style.opacity = "1";
        if (ctaRef.current) ctaRef.current.style.opacity = "1";
      }
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
        {/* Background image with overlay */}
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

        {/* Content */}
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

        {/* Scroll indicator */}
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
