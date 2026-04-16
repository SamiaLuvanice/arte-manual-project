import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content > *", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-cream">
      <div className="mx-auto max-w-3xl text-center contact-content">
        <span className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
          Contato
        </span>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-cream-foreground md:text-5xl">
          Vamos criar algo <span className="text-primary">especial</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-base text-muted-foreground">
          Entre em contato para encomendar sua peça personalizada ou tirar dúvidas. Ficaremos felizes em atender você!
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 space-y-5 text-left"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="font-body text-sm font-medium text-cream-foreground">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-cream-foreground">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="font-body text-sm font-medium text-cream-foreground">Mensagem</label>
            <textarea
              rows={4}
              placeholder="Descreva o que você gostaria..."
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn-primary">
              Enviar Mensagem
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
