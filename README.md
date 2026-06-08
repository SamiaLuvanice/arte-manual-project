# Arte Manual — Crochê Artesanal

Projeto frontend usando Vite, React e TanStack (router + start).

Visão rápida

- Ambiente: React + TypeScript + TailwindCSS
- Roteamento gerado por TanStack: **não editar** `src/routeTree.gen.ts`
- Alias TypeScript: `@/*` -> `src/*`

Scripts úteis

```bash
# desenvolvimento
npm run dev

# build de produção
npm run build

# pré-visualizar build
npm run preview

# lint e formatação
npm run lint
npm run format

# checagem de tipos (sem emitir arquivos)
npm run typecheck

# verificação completa (lint + typecheck)
npm run check
```

Notas rápidas

- O arquivo `vite.config.ts` usa o preset `@lovable.dev/vite-tanstack-config`. Evite adicionar plugins duplicados no `vite.config.ts`.
- O arquivo `src/routeTree.gen.ts` é gerado automaticamente pelo TanStack Router — jamais editar manualmente.
- Imagens importantes (hero/products) podem se beneficiar de otimização (WebP/AVIF, srcset).

Próximos passos sugeridos (opcionais): adicionar `src/components/index.ts` e `src/components/ui/index.ts` (barrel exports), criar um README mais detalhado com convenções de commit e CI.
