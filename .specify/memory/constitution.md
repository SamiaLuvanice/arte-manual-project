<!-- Sync Impact Report
Version change: N/A → 1.0.0 (initial ratification)
Added sections: Core Principles (I–V), Stack Tecnológica, Workflow SDD, Governance
Templates requiring updates:
  - .specify/templates/spec-template.md ✅ (referenciado)
  - .specify/templates/plan-template.md ✅ (referenciado)
  - .specify/templates/tasks-template.md ✅ (referenciado)
Deferred TODOs: nenhum
-->

# Arte Manual — Crochê Artesanal: Constitution

## Core Principles

### I. Roteamento Autogerado (NÃO-VIOLÁVEL)
Jamais edite manualmente o arquivo `src/routeTree.gen.ts`. Esse arquivo é gerado
automaticamente pelo compilador do TanStack Router.  
Qualquer nova página ou rota DEVE ser criada em `src/routes/` seguindo a convenção
de arquivos do TanStack Router (file-based routing). O compilador regerará a árvore
na próxima execução ou build.  
**Rationale**: edições manuais causam divergências de tipos e erros em runtime
difíceis de rastrear.

### II. Path Aliasing Obrigatório
Sempre utilize o alias `@/` para importações que apontem para `src/`.  
Exemplo: `import { Button } from "@/components/ui/button"`.  
Caminhos relativos longos (../../..) são PROIBIDOS fora de testes.  
**Rationale**: mantém os imports consistentes, refatoráveis e independentes da
profundidade da pasta.

### III. Validação de Código Antes de Finalizar
Antes de finalizar qualquer alteração de código, o projeto DEVE passar no linter e
no typechecker rodando `npm run check` (eslint + tsc --noEmit).  
Pull Requests com erros de lint ou tipo NÃO serão aceitos.  
**Rationale**: garante coerência de tipos e estilo em toda a base de código.

### IV. Estética Premium (NÃO-NEGOCIÁVEL)
A interface DEVE encantar o usuário desde o primeiro contato:
- **Cores**: paletas HSL suaves baseadas em tons terrosos, neutros aquecidos e
  temáticos de crochê/artesanato (bege, oliva, terracota, rosa queimado).
  Cores primárias puras (vermelho, azul, verde puros) são PROIBIDAS.
- **Tipografia**: fontes modernas definidas em `src/styles.css` (Google Fonts).
- **Animações**: micro-interações elegantes em botões, links e cards (hover,
  transições suaves, fade-ins).
- **Imagens**: assets WebP otimizados; quando necessário, usar a ferramenta
  `generate_image` do assistente para gerar assets de demonstração.

### V. Spec-Driven Development (SDD)
Todas as novas funcionalidades e refatorações complexas DEVEM seguir o fluxo SDD:
1. Criar especificação em `.specify/memory/` (ou `specs/`) antes de escrever código.
2. Gerar plano de implementação técnica.
3. Quebrar o plano em tarefas atômicas.
4. Implementar as tarefas conforme o plano.
5. Verificar com `npm run check` + revisão da spec antes de fechar.  
Código escrito sem spec aprovada não será aceito em funcionalidades novas.

## Stack Tecnológica

- **Core**: React 19 + TypeScript (strict mode).
- **Roteamento & State**: TanStack Router (file-based) + TanStack Start + TanStack React Query.
- **Estilização**: TailwindCSS v4 + CSS nativo. Utilitários ad-hoc complexos fora do
  padrão são desencorajados; preferir classes semânticas e design tokens.
- **Componentes UI**: Shadcn UI (via Radix UI) + Lucide React para ícones.
- **Build**: Vite. `npm run dev` para desenvolvimento; `npm run build` somente
  quando explicitamente solicitado ou para validação de produção.
- **Qualidade**: ESLint + Prettier + TypeScript (`npm run check`).

## Workflow de Desenvolvimento

1. **Especificar** — descrever o que e por quê (spec em `.specify/memory/`).
2. **Planejar** — definir stack, arquitetura e decisões técnicas.
3. **Tarefas** — lista atômica de passos de implementação.
4. **Implementar** — escrever código conforme spec e plano aprovados.
5. **Validar** — `npm run check` + revisão humana da spec vs. código.
6. **Convergir** — usar `/speckit.converge` para detectar desvios pendentes.

## Governance

- Esta constituição SUPERA todas as outras convenções ou preferências individuais.
- Emendas requerem: documentação da mudança, justificativa, bump de versão semântica,
  e atualização dos templates dependentes em `.specify/templates/`.
- Toda PR deve verificar conformidade com os princípios I–V acima.
- Complexidade adicional DEVE ser justificada explicitamente na spec ou no PR.
- O arquivo `AGENTS.md` na raiz do repositório espelha os princípios desta
  constituição e serve como referência rápida para agentes de IA.

**Version**: 1.0.0 | **Ratified**: 2026-07-16 | **Last Amended**: 2026-07-16
