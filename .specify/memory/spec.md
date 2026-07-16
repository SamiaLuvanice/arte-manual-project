# Feature Specification: Arte Manual — Crochê Artesanal (Baseline)

**Feature Branch**: `baseline/arte-manual-landing`

**Created**: 2026-07-16

**Status**: Draft

**Input**: "Site vitrine de artesanato em crochê — landing page com galeria de produtos, seção sobre, contato via WhatsApp e estética premium artesanal."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitante descobre a marca e navega pelos produtos (Priority: P1)

Uma potencial compradora acessa o site pelo celular ou desktop e, em segundos,
entende o que é o Arte Manual, sente o clima artesanal e artístico da marca, e
começa a explorar os produtos disponíveis.

**Por que P1**: É o fluxo principal de descoberta — sem ele o site não tem valor.

**Independent Test**: Abrir `http://localhost:8080/` e verificar que a página
carrega com Hero, Marquee, seção de Produtos e Footer sem erros de console.

**Acceptance Scenarios**:

1. **Given** o visitante acessa `/`, **When** a página carrega, **Then** o Navbar,
   HeroSection, Marquee animado, AboutSection, ProductsSection, ContactSection,
   Footer e FloatingWhatsApp são exibidos, nessa ordem, sem quebra de layout.
2. **Given** o visitante está em mobile (< 768px), **When** visualiza a
   ProductsSection, **Then** os cards de produto se adaptam para 1 coluna com
   espaçamento correto.
3. **Given** o visitante clica no botão "Ver Produtos" do Hero, **When** o clique
   ocorre, **Then** a página rola suavemente até a ProductsSection.

---

### User Story 2 — Visitante contata a artesã via WhatsApp (Priority: P2)

O visitante interessa-se por um produto e quer tirar dúvidas ou fazer um pedido.
Ele clica no botão flutuante do WhatsApp ou no link da ContactSection e é
direcionado direto para uma conversa no WhatsApp da artesã.

**Por que P2**: Conversão direta — é o principal canal de vendas.

**Independent Test**: Clicar no `FloatingWhatsApp` e verificar que abre
`https://wa.me/<numero>` com mensagem pré-preenchida.

**Acceptance Scenarios**:

1. **Given** o visitante está em qualquer seção da página, **When** clica no ícone
   flutuante do WhatsApp, **Then** abre o WhatsApp Web/App com número da artesã
   e uma mensagem de boas-vindas pré-definida.
2. **Given** o visitante está na ContactSection, **When** clica em "Enviar
   Mensagem", **Then** é redirecionado para o WhatsApp com contexto do produto
   (se aplicável).
3. **Given** o usuário está em mobile, **When** clica no botão WhatsApp, **Then**
   o app nativo do WhatsApp é aberto (deep link `whatsapp://`).

---

### User Story 3 — Visitante conhece a história da artesã (Priority: P3)

O visitante quer saber quem está por trás das peças antes de comprar. Ele rola
a página e encontra a AboutSection com foto da artesã, história pessoal e valores
da marca.

**Por que P3**: Constrói confiança e conexão emocional — importante para conversão.

**Independent Test**: Verificar que a AboutSection exibe imagem, texto de história
e é responsiva em mobile e desktop.

**Acceptance Scenarios**:

1. **Given** o visitante rola até a AboutSection, **When** a seção fica visível,
   **Then** uma animação de fade-in suave é acionada exibindo foto e texto.
2. **Given** a seção é exibida em mobile, **When** visualizada, **Then** o layout
   empilha foto acima do texto sem sobreposição.

---

### User Story 4 — Visitante vê o Marquee de destaques da marca (Priority: P4)

Logo abaixo do Hero, um Marquee animado exibe palavras-chave e ícones que resumem
a proposta de valor: "Feito à mão", "Amor & Dedicação", "Peças Únicas", etc.

**Por que P4**: Impacto visual imediato — reforça identidade da marca.

**Independent Test**: Verificar que o Marquee anima continuamente sem travar.

**Acceptance Scenarios**:

1. **Given** a página carregou, **When** o Marquee é exibido, **Then** os itens
   se movem da direita para a esquerda de forma contínua e sem interrupção.
2. **Given** o visitante passa o mouse sobre o Marquee (desktop), **When** o hover
   ocorre, **Then** a animação pausa.

---

### Edge Cases

- O que acontece se o número do WhatsApp não estiver configurado? → Exibir link
  de fallback para Instagram ou e-mail.
- O que acontece se uma imagem de produto não carregar? → Exibir placeholder
  com ícone artesanal e cor de fundo da paleta.
- O que acontece se o usuário estiver offline? → A página deve ser parcialmente
  acessível (assets cacheados via Vite); o link do WhatsApp dará erro de rede
  mas o conteúdo visual permanece.
- Acessibilidade: todos os botões e links DEVEM ter `aria-label` descritivo.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE exibir uma landing page única (`/`) com as seções:
  Navbar, HeroSection, Marquee, AboutSection, ProductsSection, ContactSection,
  Footer e FloatingWhatsApp.
- **FR-002**: O sistema DEVE permitir navegação suave (smooth scroll) entre seções
  via links do Navbar.
- **FR-003**: O FloatingWhatsApp DEVE estar fixo na tela em todas as seções e
  abrir o WhatsApp com número e mensagem configuráveis.
- **FR-004**: A ProductsSection DEVE exibir cards de produtos com foto, nome,
  descrição curta e indicação de disponibilidade (sob encomenda / disponível).
- **FR-005**: O site DEVE ser totalmente responsivo: mobile (≥ 320px), tablet
  (≥ 768px) e desktop (≥ 1280px).
- **FR-006**: O sistema DEVE aplicar a paleta de cores artesanal (tons terrosos,
  bege, terracota, rosa queimado) em todos os componentes.
- **FR-007**: Todas as imagens DEVEM ser otimizadas (formato WebP, lazy loading).
- **FR-008**: O sistema DEVE incluir meta tags de SEO (title, description, og:*)
  na rota `/`.
- **FR-009**: O Marquee DEVE pausar no hover (desktop) e animar continuamente
  em mobile.
- **FR-010**: O site DEVE passar em `npm run check` (eslint + tsc) sem erros.

### Key Entities

- **Produto**: representa uma peça artesanal de crochê.
  Atributos: `id`, `nome`, `descrição`, `categoria` (manta | amigurumi | bolsa |
  acessório), `imagem` (WebP), `disponivel` (boolean), `sob_encomenda` (boolean).
- **Artesã**: perfil da criadora.
  Atributos: `nome`, `bio`, `foto`, `whatsapp` (número E.164), `instagram`.
- **Seção**: bloco de conteúdo da landing page — ordenadas e independentes.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A página carrega em menos de 3s em conexão 4G (Lighthouse
  Performance ≥ 80).
- **SC-002**: O botão do WhatsApp é clicável e funcional em 100% dos testes
  manuais em mobile e desktop.
- **SC-003**: A landing page é exibida sem erros de console em Chrome, Firefox
  e Safari (latest).
- **SC-004**: `npm run check` retorna 0 erros de lint e 0 erros de tipo.
- **SC-005**: Lighthouse Accessibility score ≥ 90 na rota `/`.
- **SC-006**: Todos os cards de produto exibem imagem corretamente ou o
  placeholder artesanal como fallback.

---

## Assumptions

- O projeto é uma **landing page de página única** (SPA); não há backend próprio,
  autenticação ou banco de dados nessa fase.
- Os dados de produtos e da artesã são **estáticos** (hardcoded nos componentes
  ou em arquivos JSON/TS) — sem CMS na v1.
- O número de WhatsApp e o texto da mensagem de boas-vindas são configurados
  diretamente no código (variável ou constante).
- Mobile-first: a experiência mobile é prioritária; desktop é progressivamente
  aprimorada.
- Não há funcionalidade de carrinho ou checkout nessa fase — todas as compras
  são negociadas via WhatsApp.
- Imagens de produtos serão geradas com `generate_image` para demonstração,
  e substituídas por fotos reais pela artesã.
- O suporte a PWA (instalação no homescreen) está fora do escopo da v1.
