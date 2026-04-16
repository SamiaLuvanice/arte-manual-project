import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroImg from "@/assets/hero-crochet.jpg";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(imgRef.current, { scale: 1.2, opacity: 0, duration: 1.5 })
      .from(titleRef.current, { y: 60, opacity: 0, duration: 1 }, "-=1")
      .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");

    // Parallax on scroll
    const onScroll = () => {
      if (!imgRef.current) return;
      const scrollY = window.scrollY;
      gsap.to(imgRef.current, { y: scrollY * 0.3, duration: 0.5, ease: "none" });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div ref={imgRef} className="absolute inset-0">
        <img src={heroImg} alt="Produtos artesanais em crochê" width={1920} height={1080} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1
          ref={titleRef}
          className="font-display text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-7xl lg:text-8xl"
        >
          Arte <span className="italic text-terracotta" style={{ color: "oklch(0.85 0.1 55)" }}>Manual</span>
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
    </section>
  );
}
