import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import blanketImg from "@/assets/product-blanket.jpg";
import amigurumiImg from "@/assets/product-amigurumi.jpg";
import bagImg from "@/assets/product-bag.jpg";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: "Mantas & Cobertores",
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
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".products-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="products-title text-center">
          <div className="flex items-baseline justify-center gap-4">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Nossos Produtos
            </span>
          </div>

          <h2 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Peças feitas com <span className="italic text-primary">carinho</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-base text-muted-foreground">
            Cada peça é única e feita sob encomenda, garantindo exclusividade e qualidade em cada detalhe.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {products.map((product, i) => (
            <div
              key={product.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
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
                <h3 className="font-display text-xl font-semibold text-foreground">{product.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                <p className="mt-4 font-body text-sm font-semibold text-primary">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
