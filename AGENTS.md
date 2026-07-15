# Constituição do Projeto: Arte Manual — Crochê Artesanal

Este documento serve como a **Constituição do Projeto** para agentes de IA e desenvolvedores. Ele define a arquitetura, regras de estilo e práticas de desenvolvimento para garantir consistência e qualidade do código.

---

## 🛠️ Stack Tecnológica

- **Core**: React 19 + TypeScript.
- **Roteamento & State**: TanStack Router & TanStack Start + TanStack React Query.
- **Estilização (CSS)**: TailwindCSS v4 + CSS nativo (evitar utilitários ad-hoc complexos fora do padrão).
- **Design & Ícones**: Lucide React + Componentes customizados Shadcn (via Radix UI).
- **Ambiente de Build**: Vite.

---

## ⚠️ Regras Cruciais (Não Violável)

1. **Roteamento Autogerado**:
   - Jamais edite manualmente o arquivo `src/routeTree.gen.ts`. Esse arquivo é gerado automaticamente pelo compilador do TanStack Router.
   - Qualquer nova página/rota deve ser criada na pasta `src/routes/` seguindo a convenção de arquivos do TanStack Router. O compilador gerará a árvore automaticamente na próxima execução/build.

2. **Aliasing**:
   - Sempre utilize `@/` para apontar para `src/` (exemplo: `import { Button } from "@/components/ui/button"`).

3. **Validação de Código**:
   - Antes de finalizar qualquer alteração, garanta que o projeto passa no linter e no typechecker rodando `npm run check`.

---

## 🎨 Diretrizes de Estética Premium

Para que a interface encante o usuário desde o primeiro contato, siga estas diretrizes:

- **Cores Selecionadas**: Evite cores primárias puras. Use paletas HSL suaves baseadas em tons terrosos, neutros aquecidos ou cores que combinem com a temática de crochê e artesanato (ex: bege, oliva, terracota, rosa queimado).
- **Tipografia**: Use fontes modernas (definidas em `src/styles.css`).
- **Animações**: Adicione micro-interações elegantes em botões, links e cards (efeitos de hover, transições suaves, fade-ins).
- **Imagens**: Para assets e fotos reais, utilize imagens otimizadas (WebP) e, se necessário, use a ferramenta de geração de imagens do assistente (`generate_image`).

---

## 📋 Spec-Driven Development (SDD)

Todas as novas funcionalidades e refatorações complexas devem seguir o fluxo de **Spec-Driven Development**.

- Antes de escrever qualquer linha de código de produção, carregue a habilidade contida em [skills/spec_driven_development.md](file:///c:/Users/CODED-CED/samia_dev/arte-manual-project/skills/spec_driven_development.md) usando o parâmetro `IsSkillFile: true` na ferramenta `view_file`.
- Crie a especificação correspondente na pasta `specs/` (baseando-se em `specs/template.md`).
- Só inicie o desenvolvimento após a especificação e o plano de implementação estarem documentados e alinhados.
