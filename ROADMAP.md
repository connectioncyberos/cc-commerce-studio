# Roadmap — ConnectionCyber Commerce Studio

Este roadmap cobre o produto. Padrões e governança ficam em `cc-engineering-framework`.

## Housekeeping — pendências antes de nova sprint

**Objetivo:** fechar dívida técnica identificada antes de abrir CS-007.

### Itens

- Confirmar no GitHub que `cc-engineering-framework` não recebeu o commit acidental de bootstrap do Commerce Studio. — **Concluído**. `git log --oneline` confirmou: commit mais antigo é `db853b5 chore: bootstrap CCEF repository`, sem vestígio do bootstrap do Commerce Studio.
- Remover `.git-accidental-backup` (raiz de `C:\Projetos\connectioncyber`) após a confirmação acima. — **Liberado**, aguardando execução do usuário (fora do alcance de Read/Write/Edit).
- Resolver o checkpoint pendente: `Sidebar.tsx`, `Topbar.tsx`, `WorkspaceToolbar.tsx` + migração para `app/(app)/`. — **Concluído**. Os três componentes já estavam limpos (nada a commitar); o commit `refactor(app): migrate to app shell routing` (52c7021) isolou a migração de rotas sozinho, com Git detectando o rename de `app/workspace/page.tsx` para `app/(app)/workspace/page.tsx`. Push confirmado (`f6209df..52c7021`).
- Adicionar `.gitattributes` ao `cc-commerce-studio`. — **Concluído**.
- Decidir: manter Next.js 14.2.23 / React 18.3.1 ou migrar para Next 15 / React 19. — **Concluído**: ADR-0001 em `cc-engineering-framework`. Mantido Next 14 / React 18.

### Comando pendente (rodar em `C:\Projetos\connectioncyber`)

```powershell
Remove-Item -Recurse -Force "C:\Projetos\connectioncyber\.git-accidental-backup"
```

### Comando pendente (rodar em `C:\Projetos\connectioncyber\cc-commerce-studio`)

```powershell
git add ROADMAP.md
git commit -m "docs: add product roadmap"
git push
git status
```

Resultado esperado: `nothing to commit, working tree clean`.

**Status:** Done — restam apenas as duas execuções manuais acima (fora do alcance do assistente).

## CS-007 — Persistência real do Workspace

**Objetivo:** salvar Workspace no Supabase usando o formulário, com isolamento multi-tenant real.

**Especificação:** `cc-engineering-framework/artifacts/specifications/0001-workspace-persistence.md` (SPC-0001)

### Achado bloqueante (2026-07-10)

Não existe autenticação implementada (`lib/auth/` vazio, `@supabase/ssr` não instalado, cliente Supabase só com chave anônima). `workspace_members` + RLS por usuário não funcionam sem isso. Decisão pendente do usuário: Opção A (autenticação real agora) ou Opção B (placeholder de usuário único, adiando multi-tenant real). Ver SPC-0001, seção 4.1.

### Entregáveis

- CS-007.-1 — Autenticação básica (Supabase Auth + `@supabase/ssr`) — **Concluído (código)**: `lib/supabase/server.ts`, `lib/supabase/middleware.ts`, `middleware.ts`, `features/auth/` (sign-in/sign-up/sign-out + `LoginForm`), guard em `app/(app)/layout.tsx`, botão Sair no `Topbar`. Falta rodar `npm install @supabase/ssr`.
- CS-007.0 — `workspace_members` + políticas de RLS no Supabase — **Concluído (código)**: `supabase/migrations/002_create_workspace_members_and_rls.sql`. Falta aplicar no Supabase.
- CS-007.1 — Server Action de criação de Workspace — **Concluído**: `"use server"` adicionado, usa cliente server-side, insere `workspace_members` como `owner`.
- CS-007.2 — Validação com Zod ligada ao formulário — **Concluído** (schema já existia e está correto).
- CS-007.3 — Corrigir `WorkspaceForm` — **Concluído**: agora usa `useFormState`/`useFormStatus` (React 18, compatível com ADR-0001), botão `type="submit"`.
- CS-007.4 — Insert real no Supabase — **Concluído (código)**, pendente de teste após aplicar a migration.
- CS-007.5 — Listagem dinâmica — **Concluído**: `WorkspacePage` agora é Server Component async chamando `listWorkspacesQuery()`.
- CS-007.6 — CRUD completo — **Concluído**: `WorkspaceCard` ganhou edição inline e exclusão com confirmação, chamando as Server Actions e forçando `router.refresh()` para atualizar a lista sem reload manual.

**Status:** In Progress — falta rodar `npm install`, aplicar a migration, e testar end-to-end

## CS-008+ — Módulos seguintes (ainda sem Specification)

**Objetivo:** expandir para os demais módulos do produto. Cada um exige uma Specification (via `cc-engineering-framework`) antes de virar código.

### Candidatos (ordem sugerida, não fechada)

- Products (mesmo padrão em camadas do Workspace)
- Brands
- Offer Engine
- Landing Page Engine
- Creative Engine
- Video Script Engine
- Marketplace Engine (Shopee, Mercado Livre, Amazon)
- Email/WhatsApp Engine
- Publishing Engine (provisionamento Instagram/TikTok/TikTok Shop/YouTube)
- Analytics Engine
- Quality Engine + Prompt Lab

**Status:** Planned

## Transversais — sem data fixa

- Testes automatizados (`tests/` vazio até o momento)
- CI (hoje só há deploy automático via Vercel; nenhum workflow de GitHub Actions decidido)
- Ambientes stage/prod no Supabase (adiado conscientemente até haver necessidade real)

**Status:** Backlog

## Histórico de alterações

| Data | Alteração |
|------|-----------|
| 2026-07-09 | Primeira versão, consolidando a análise de fases A a E |
