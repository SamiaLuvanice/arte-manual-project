import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button onClick={() => scrollTo("hero")} className="font-display text-2xl font-bold tracking-tight text-foreground">
          Arte <span className="text-primary">Manual</span>
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "Início", id: "hero" },
            { label: "Sobre", id: "about" },
            { label: "Produtos", id: "products" },
            { label: "Contato", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-body text-sm font-medium tracking-wide text-foreground/70 transition-colors duration-300 hover:text-primary"
            >
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo("contact")} className="btn-primary hidden md:inline-flex">
          Encomende
        </button>
      </div>
    </nav>
  );
}
