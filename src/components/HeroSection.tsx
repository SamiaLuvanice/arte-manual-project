import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/hero-crochet.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const arteRef = useRef<HTMLSpanElement>(null);
  const manualRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(imgRef.current, { scale: 1.2, opacity: 0, duration: 1.5 })
      .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.8")
      .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");

    const ctx = gsap.context(() => {
      // Set initial offscreen positions for the title words
      gsap.set(arteRef.current, { xPercent: -180, opacity: 0 });
      gsap.set(manualRef.current, { xPercent: 180, opacity: 0 });

      // Pin the hero and animate words toward center on scroll
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        animation: gsap
          .timeline()
          .to(arteRef.current, { xPercent: 0, opacity: 1, ease: "power2.out" }, 0)
          .to(manualRef.current, { xPercent: 0, opacity: 1, ease: "power2.out" }, 0)
          .to(imgRef.current, { scale: 1.08, ease: "none" }, 0),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative flex h-screen items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div ref={imgRef} className="absolute inset-0">
          <img src={heroImg} alt="Produtos artesanais em crochê" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
          <h1 className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 overflow-hidden font-display text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
            <span ref={arteRef} className="inline-block will-change-transform">
              Arte
            </span>
            <span
              ref={manualRef}
              className="inline-block italic will-change-transform"
              style={{ color: "oklch(0.85 0.1 55)" }}
            >
              Manual
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="mx-auto mt-6 max-w-xl font-body text-lg font-light leading-relaxed text-primary-foreground/80 md:text-xl"
          >
            Peças únicas feitas à mão com carinho e dedicação. Cada ponto conta uma história de tradição e amor pelo artesanato.
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button onClick={() => scrollTo("products")} className="btn-primary">
              Ver Produtos
            </button>
            <button onClick={() => scrollTo("about")} className="btn-outline" style={{ borderColor: "oklch(0.9 0.02 75)", color: "oklch(0.95 0.01 75)" }}>
              Nossa História
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.95 0.01 75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
