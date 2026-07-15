# Habilidade: Spec-Driven Development (SDD)

Este arquivo de Skill descreve o procedimento passo a passo para planejar e executar alterações em código de produção utilizando desenvolvimento orientado por especificações.

---

## 🛠️ Procedimento do Ciclo SDD

### 1. Especificar (`specs/`)

Antes de iniciar qualquer código de uma nova feature:

- Crie ou use um arquivo de especificação na pasta `specs/` (Exemplo: `specs/01_homepage.md`).
- Utilize o template `specs/template.md` para garantir consistência.
- Defina claramente:
  - **Objetivo**: O que a feature resolve.
  - **Jornada do Usuário**: Comportamento esperado.
  - **Requisitos de UI/UX**: Elementos visuais, paletas de cores, animações.
  - **Requisitos Funcionais**: O que o código deve fazer.

### 2. Planejar (Implementation Plan)

A IA deve mapear como os arquivos da especificação serão implementados:

- Crie ou atualize o artefato `implementation_plan.md`.
- Liste quais rotas do TanStack Router precisam ser criadas em `src/routes/`.
- Liste quais componentes serão criados em `src/components/`.
- **Atenção**: Mantenha o escopo de alterações menor e focado para evitar sobrecarregar o contexto.

### 3. Implementar em Etapas (Tasks)

Durante a execução das mudanças:

- Crie/mantenha o arquivo `task.md` na pasta do histórico da IA para listar os passos.
- Execute as mudanças em pequenas partes.
- Crie testes ou verifique o build ao final de cada etapa principal.

### 4. Verificar e Validar

- Execute `npm run check` para rodar o linting e a checagem do TypeScript.
- Se houver alterações visuais, gere uma descrição e guie o desenvolvedor na validação.
- Crie o artefato `walkthrough.md` resumindo as alterações e evidências de funcionamento.
