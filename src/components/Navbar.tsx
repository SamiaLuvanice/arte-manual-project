import logoImg from "@/assets/logo-arte-manual.png";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactElement } from "react";

export default function Navbar(): ReactElement {
  const navRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const node = navRef.current;
    if (node) {
      if (prefersReduced) {
        node.style.transform = "none";
        node.style.opacity = "1";
      } else {
        gsap.from(node, {
          y: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        });
      }
    }

    let rafId = 0 as number | null;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId as number);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  };

  const links = [
    { label: "Início", id: "hero" },
    { label: "Sobre", id: "about" },
    { label: "Produtos", id: "products" },
    { label: "Contato", id: "contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 h-[88px] transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-md border-b border-border/60"
          : "bg-background/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="Arte Manual logo"
            width={40}
            height={40}
            className="h-10 w-10 drop-shadow-sm transition-opacity duration-300 ease-out"
          />
          <span className="font-display text-xl font-bold tracking-tight text-foreground transition-colors duration-300 ease-out">
            Arte <span className="text-primary">Manual</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative font-body text-sm font-semibold tracking-wide text-foreground/90 transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button onClick={() => scrollTo("contact")} className="btn-primary hidden md:inline-flex">
          Encomende
        </button>

        <button
          ref={menuButtonRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:text-primary md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full bg-background/95 backdrop-blur-md shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="rounded-md px-3 py-3 text-left font-body text-base font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary mt-2 w-full text-center"
            >
              Encomende
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
