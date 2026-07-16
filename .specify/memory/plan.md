# Implementation Plan: Arte Manual — Crochê Artesanal (Baseline)

**Branch**: `baseline/arte-manual-landing` | **Date**: 2026-07-16 | **Spec**: [spec.md](.specify/memory/spec.md)

---

## Summary

O projeto já possui uma landing page funcional com as seções principais (Navbar,
HeroSection, Marquee, AboutSection, ProductsSection, ContactSection, Footer e
FloatingWhatsApp). O plano de implementação foca em **elevar a qualidade existente**:
centralizar os dados de produto e da artesã em uma fonte única, adicionar acessibilidade
(aria-labels), otimizar as imagens existentes (lazy loading / WebP), adicionar
fallback de imagem nos cards de produto, melhorar responsividade e garantir que
`npm run check` passe com 0 erros.

Não há backend — todos os dados são estáticos (arquivo `src/data/`).

---

## Technical Context

| Campo | Valor |
|-------|-------|
| **Language/Version** | TypeScript 5.8 + React 19 |
| **Framework** | TanStack Router (file-based) + TanStack Start |
| **Estilização** | TailwindCSS v4 + CSS nativo (`src/styles.css`) |
| **Componentes UI** | Shadcn UI (Radix UI) + Lucide React |
| **Animações** | GSAP 3 + ScrollTrigger |
| **Build** | Vite 7 |
| **Storage** | N/A — dados estáticos em `src/data/` |
| **Testing** | Manual (Lighthouse + npm run check) |
| **Target Platform** | Web — mobile-first, Chrome/Firefox/Safari latest |
| **Performance Goal** | Lighthouse Performance ≥ 80 na rota `/` |
| **Constraints** | Sem backend; imagens WebP; sem carrinho/checkout na v1 |
| **Scale/Scope** | 1 rota (`/`), 8 componentes, ~10 produtos estáticos |

---

## Constitution Check

| Princípio | Status | Ação |
|-----------|--------|------|
| I. Roteamento Autogerado | ✅ | Não criar rotas manualmente — apenas `src/routes/index.tsx` |
| II. Path Aliasing `@/` | ✅ | Todos imports já usam `@/` — manter |
| III. `npm run check` | ✅ | Executar ao final de cada fase |
| IV. Estética Premium | ✅ | Paleta já definida em `styles.css` — manter e expandir |
| V. Spec-Driven Development | ✅ | Este plano é o documento de partida |

---

## Project Structure

```text
src/
├── assets/                     # Imagens otimizadas (WebP)
│   ├── hero-crochet.jpg        # EXISTENTE — considerar converter para WebP
│   ├── product-amigurumi.jpeg  # EXISTENTE — substituir por WebP
│   ├── product-bag.jpeg        # EXISTENTE — substituir por WebP
│   └── product-blanket.jpeg    # EXISTENTE — substituir por WebP
├── data/                       # [NEW] Fonte única de dados estáticos
│   ├── products.ts             # [NEW] Array tipado de produtos
│   └── artisan.ts              # [NEW] Dados da artesã (nome, bio, whatsapp, instagram)
├── components/
│   ├── HeroSection.tsx         # EXISTENTE — sem mudanças estruturais
│   ├── Marquee.tsx             # EXISTENTE — adicionar pause-on-hover
│   ├── AboutSection.tsx        # EXISTENTE — usar dados de artisan.ts
│   ├── ProductsSection.tsx     # EXISTENTE — usar products.ts + fallback de imagem
│   ├── ContactSection.tsx      # EXISTENTE — usar artisan.ts (whatsapp)
│   ├── FloatingWhatsApp.tsx    # EXISTENTE — usar artisan.ts (whatsapp)
│   ├── Navbar.tsx              # EXISTENTE — melhorar aria-labels
│   ├── Footer.tsx              # EXISTENTE — usar artisan.ts
│   └── SectionHeader.tsx       # EXISTENTE — sem mudanças
├── hooks/
│   └── useGsap.ts              # EXISTENTE — sem mudanças
├── routes/
│   └── index.tsx               # EXISTENTE — sem mudanças estruturais
└── styles.css                  # EXISTENTE — adicionar Google Fonts import se ausente
```

**Structure Decision**: Single-page SPA. Dados extraídos para `src/data/` para
centralizar e facilitar a substituição por conteúdo real pela artesã. Sem nova
rota — toda a app vive em `/`.

---

## Implementation Phases

### Fase 0 — Preparação e Dados Centralizados

**Objetivo**: criar a fonte única de dados e os tipos TypeScript.

**Arquivos a criar/modificar**:

#### [NEW] `src/data/products.ts`
```ts
export type ProductCategory = "manta" | "amigurumi" | "bolsa" | "acessorio";

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;         // caminho do asset WebP
  price: string;
  category: ProductCategory;
  available: boolean;
  madeToOrder: boolean;
}

export const PRODUCTS: Product[] = [ /* ... */ ];
```

#### [NEW] `src/data/artisan.ts`
```ts
export interface Artisan {
  name: string;
  bio: string;
  photo: string;         // caminho do asset WebP
  whatsapp: string;      // número E.164, ex: "5511999999999"
  whatsappMessage: string; // mensagem pré-preenchida
  instagram: string;
}

export const ARTISAN: Artisan = { /* ... */ };
```

---

### Fase 1 — Componentização e Acessibilidade

**Objetivo**: conectar os componentes aos dados centralizados e melhorar aria-labels.

**Arquivos a modificar**:

#### `src/components/ProductsSection.tsx`
- Importar `PRODUCTS` de `@/data/products`.
- Adicionar `aria-label` nos cards (`article`).
- Adicionar fallback visual quando a imagem não carregar (`onError`).
- Garantir `loading="lazy"` em todas as imagens.

#### `src/components/FloatingWhatsApp.tsx`
- Importar `ARTISAN` de `@/data/artisan`.
- Usar `ARTISAN.whatsapp` e `ARTISAN.whatsappMessage` no link.

#### `src/components/ContactSection.tsx`
- Importar `ARTISAN` de `@/data/artisan`.
- Usar `ARTISAN.whatsapp` no link de contato.
- Adicionar `aria-label` no botão de WhatsApp.

#### `src/components/AboutSection.tsx`
- Importar `ARTISAN` de `@/data/artisan`.
- Usar `ARTISAN.photo` e `ARTISAN.bio`.

#### `src/components/Footer.tsx`
- Importar `ARTISAN` de `@/data/artisan`.
- Usar `ARTISAN.instagram` e `ARTISAN.whatsapp`.

#### `src/components/Navbar.tsx`
- Adicionar `aria-label="Navegação principal"` na `<nav>`.
- Garantir que os links de seção tenham aria-labels descritivos.

---

### Fase 2 — Marquee: Pause on Hover

**Objetivo**: implementar `animation-play-state: paused` no hover do Marquee.

#### `src/components/Marquee.tsx`
- Adicionar grupo Tailwind com `group` na `div` container.
- Adicionar classe condicional `group-hover:[animation-play-state:paused]` na `.marquee-track`.
- Adicionar `aria-label="Destaques da marca"` e `role="marquee"` (ou `aria-live="off"`).

#### `src/styles.css`
- Adicionar regra `.marquee-track:hover, .marquee-wrapper:hover .marquee-track` com
  `animation-play-state: paused`.

---

### Fase 3 — SEO e Meta Tags

**Objetivo**: garantir que as meta tags de SEO estejam corretas e completas.

#### `src/routes/index.tsx`
- Verificar e completar: `title`, `description`, `og:title`, `og:description`,
  `og:image`, `twitter:card`.
- Adicionar `<link rel="canonical">` se suportado pelo TanStack Start.

---

### Fase 4 — Validação Final

**Objetivo**: garantir conformidade com todos os critérios de sucesso da spec.

```bash
# 1. Linter + Type-check
npm run check

# 2. Dev server sem erros de console
npm run dev
# → Abrir http://localhost:8080/ e verificar console

# 3. Testar WhatsApp link manualmente (desktop + mobile)

# 4. Testar responsividade: 320px, 768px, 1280px
```

---

## Complexity Tracking

Sem violações de constituição identificadas. Nenhuma complexidade adicional é
necessária além do que já existe no projeto.

---

## Open Questions / Decisões Pendentes

| # | Questão | Impacto | Recomendação |
|---|---------|---------|-------------|
| 1 | Converter imagens JPEG → WebP? | Performance (SC-001) | Converter via `generate_image` para demonstração; artesã substituirá por fotos reais |
| 2 | Número real do WhatsApp? | Funcionalidade core (FR-003, US-2) | Usar placeholder `5500000000000` até artesã fornecer |
| 3 | Texto da mensagem de boas-vindas do WhatsApp? | UX de conversão | Sugestão: "Olá! Vi suas peças no site e tenho interesse. Pode me contar mais?" |
| 4 | Google Fonts (Inter) já está carregando via CSS? | Performance | Verificar — `styles.css` define `Inter` mas não importa do Google Fonts explicitamente |
