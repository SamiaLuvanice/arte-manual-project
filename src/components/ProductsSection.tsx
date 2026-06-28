import amigurumiImg from "@/assets/product-amigurumi.jpeg";
import bagImg from "@/assets/product-bag.jpeg";
import blanketImg from "@/assets/product-blanket.jpeg";
import useGsap from "@/hooks/useGsap";
import gsap from "gsap";
import { useEffect, useRef, type ReactElement } from "react";
import SectionHeader from "./SectionHeader";

const PRODUCTS = [
  {
    title: "Acessórios",
    description: "Mantas artesanais perfeitas para aquecer seu lar com estilo e conforto.",
    image: blanketImg,
    price: "A partir de R$ 120",
  },
  {
    title: "Amigurumis",
    description: "Bichinhos de crochê feitos com amor, ideais para presentear.",
    image: amigurumiImg,
    price: "A partir de R$ 45",
  },
  {
    title: "Bolsas & Acessórios",
    description: "Bolsas e acessórios únicos que combinam tradição e modernidade.",
    image: bagImg,
    price: "A partir de R$ 80",
  },
] as const;

export default function ProductsSection(): ReactElement {
  useGsap();
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const titleNode = ".products-title";

      if (!prefersReduced) {
        gsap.from(titleNode, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });

        gsap.from(".product-card", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        });
      } else {
        // Apply final states for reduced motion
        const nodes = listRef.current?.querySelectorAll<HTMLElement>(".product-card") ?? [];
        nodes.forEach((n) => {
          n.style.opacity = "1";
          n.style.transform = "none";
        });
        const titleEl = document.querySelector(titleNode) as HTMLElement | null;
        if (titleEl) titleEl.style.opacity = "1";
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="products-title">
          <SectionHeader
            eyebrow="Nossos Produtos"
            title={
              <>
                Peças feitas com <span className="italic text-primary">carinho</span>
              </>
            }
            description={
              <>Cada peça é única e feita sob encomenda, garantindo exclusividade e qualidade em cada detalhe.</>
            }
          />
        </div>

        <ul ref={listRef} role="list" className="mt-16 grid gap-8 md:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.title} className="product-card">
              <article className="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    width={640}
                    height={640}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {product.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="mt-4 font-body text-sm font-semibold text-primary">
                    {product.price}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
