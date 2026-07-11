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

### Achado bloqueante (2026-07-10) — Resolvido

Não existia autenticação implementada. Decisão do usuário: Opção A (autenticação real agora). Implementada com Supabase Auth + `@supabase/ssr`. Ver SPC-0001, seção 4.1.

Durante a implementação, surgiu um segundo bloqueio real: `insert` em `workspaces` violava RLS mesmo com JWT válido e política correta. Causa raiz identificada por diagnóstico (decodificação de JWT, `fetch` cru direto ao PostgREST, função `debug_auth_uid()` via RPC): o `.insert().select().single()` pedia a linha de volta (`RETURNING`) antes de existir o vínculo em `workspace_members` exigido pela política de SELECT — a linha recém-criada não era "visível" no mesmo instante do insert. Corrigido gerando o `id` no cliente (`crypto.randomUUID()`) e removendo o `RETURNING` do insert de `workspaces`. Confirmado funcionando via teste end-to-end (workspace criado e listado corretamente).

### Entregáveis

- CS-007.-1 — Autenticação básica (Supabase Auth + `@supabase/ssr`) — **Concluído**: `lib/supabase/server.ts`, `lib/supabase/middleware.ts`, `middleware.ts`, `features/auth/` (sign-in/sign-up/sign-out + `LoginForm`), guard em `app/(app)/layout.tsx`, botão Sair no `Sidebar`. `npm install` confirmado.
- CS-007.0 — `workspace_members` + políticas de RLS no Supabase — **Concluído**: `supabase/migrations/002_create_workspace_members_and_rls.sql` aplicada no Supabase; políticas confirmadas via `pg_policy`.
- CS-007.1 — Server Action de criação de Workspace — **Concluído**: `"use server"` adicionado, usa cliente server-side, insere `workspace_members` como `owner`.
- CS-007.2 — Validação com Zod ligada ao formulário — **Concluído** (schema já existia e está correto).
- CS-007.3 — Corrigir `WorkspaceForm` — **Concluído**: agora usa `useFormState`/`useFormStatus` (React 18, compatível com ADR-0001), botão `type="submit"`.
- CS-007.4 — Insert real no Supabase — **Concluído**: testado end-to-end, workspace criado e persistido com sucesso.
- CS-007.5 — Listagem dinâmica — **Concluído**: `WorkspacePage` agora é Server Component async chamando `listWorkspacesQuery()`.
- CS-007.6 — CRUD completo — **Concluído**: `WorkspaceCard` ganhou edição inline e exclusão com confirmação, chamando as Server Actions e forçando `router.refresh()` para atualizar a lista sem reload manual.

**Status:** Done — autenticação, RLS, CRUD completo (create/read/update/delete) testados end-to-end.

## CS-008+ — Módulos seguintes (ainda sem Specification)

**Objetivo:** expandir para os demais módulos do produto. Cada um exige uma Specification (via `cc-engineering-framework`) antes de virar código.

### Ordem confirmada (por dependência de schema, ver DP-007 em cc-engineering-framework)

1. **CS-008 — Products** — **Concluído**. `features/products/` completo (types, validations, services, queries, mutations, actions, components), página `app/(app)/products/page.tsx`. Nenhuma migração nova — reaproveita `products` + `products_member_all` já aplicados desde CS-007. Testado end-to-end: produto criado, persistido e listado com sucesso.
2. **CS-009 — Brands** — **Concluído**. Migração `003_create_brands_and_rls.sql` aplicada no Supabase. Testado end-to-end: marca criada, produto pré-existente (`INSOLE BIOHACKING FIR POWER®`) permaneceu intacto após a migração aditiva, seletor de marca populado corretamente no `ProductForm`, novo produto criado com marca associada, edição do produto original funcionando sem regressão.
3. **CS-010 — Offer Engine** — **Concluído**. Migração `004_create_offers_and_rls.sql` aplicada. Testado end-to-end: "Gerar rascunho" preencheu a copy referenciando o `PR-0001`, oferta salva e listada corretamente.
4. **CS-011 — Landing Page Engine** — **Concluído**. Migração `005_create_landing_pages_and_rls.sql` aplicada no Supabase. Testado end-to-end: landing page "PALMILHA INSOLE" criada com slug `oferta-001-insole` e status "Publicada", conteúdo pré-preenchido a partir da oferta `INSOLE` (copy gerada por IA real), rota pública `/lp/oferta-001-insole` acessível sem login em aba anônima (local).
5. Creative Engine
6. Video Script Engine
7. Marketplace Engine (Shopee, Mercado Livre, Amazon)
8. Email/WhatsApp Engine
9. Publishing Engine (provisionamento Instagram/TikTok/TikTok Shop/YouTube)
10. Analytics Engine
11. Quality Engine + Prompt Lab

**Decisão de escopo (DP-010, cc-engineering-framework, 2026-07-10):** o MVP fechado é CS-007 a CS-010 com IA real ligada ao Offer Engine (ver Release-0002). A retomada dos módulos restantes (DP-011 em diante) começou por CS-011 (Landing Page Engine).

**Status:** CS-008 Done; CS-009 Done; CS-010 Done (IA real ligada e testada); CS-011 Done (migração aplicada, testado end-to-end incluindo acesso público); demais Planned

## Transversais — sem data fixa

- Testes automatizados (`tests/` vazio até o momento) — **decisão confirmada (DP-010, item 7):** ficam fora do escopo do MVP, backlog consciente, não esquecimento. Retomar quando houver necessidade real (ex.: antes de um ambiente de produção real).
- CI (hoje só há deploy automático via Vercel; nenhum workflow de GitHub Actions decidido) — mesma decisão acima.
- Ambientes stage/prod no Supabase (adiado conscientemente até haver necessidade real)

**Status:** Backlog (consciente, não pendência esquecida)

## Histórico de alterações

| Data | Alteração |
|------|-----------|
| 2026-07-09 | Primeira versão, consolidando a análise de fases A a E |
| 2026-07-10 | CS-007 reconciliado para Done: autenticação, RLS e CRUD completo confirmados end-to-end |
| 2026-07-10 | CS-008 (Products) especificado via SPC-0002; ordem de CS-008+ confirmada por dependência de schema |
| 2026-07-10 | CS-008 (Products) implementado: features/products/ completo, página criada, sem migração nova |
| 2026-07-10 | CS-008 (Products) reconciliado para Done: testado end-to-end (criar/listar produto confirmado) |
| 2026-07-10 | CS-009 (Brands) especificado via SPC-0003 |
| 2026-07-10 | CS-009 (Brands) implementado: migração 003, features/brands/ completo, ProductForm integrado, Sidebar atualizado |
| 2026-07-10 | CS-009 (Brands) reconciliado para Done: testado end-to-end, sem regressão em produtos existentes |
| 2026-07-10 | CS-010 (Offer Engine) especificado via SPC-0004; STD-0007 expandido para 0.2.0 |
| 2026-07-10 | CS-010 (Offer Engine) implementado: migração 004, features/offer-engine/ completo, PR-0001, página criada |
| 2026-07-10 | CS-010 (Offer Engine) reconciliado para Done: testado end-to-end (gerar rascunho + salvar oferta confirmado) |
| 2026-07-10 | Escopo do MVP confirmado pelo usuário (DP-010): CS-011 a CS-018 (Landing Page a Quality Engine) ficam fora do escopo de "finalizar" por agora |
| 2026-07-10 | Gemini API (gemini-3.1-flash-lite) ligado a generateOfferCopy(); testado end-to-end com copy real gerada e oferta salva |
| 2026-07-11 | CS-011 (Landing Page Engine) implementado: migração 005, features/landing-pages/ completo, página de gestão e rota pública `/lp/[slug]` criadas |
| 2026-07-11 | CS-011 reconciliado para Done: migração 005 aplicada no Supabase, testado end-to-end (criação, preenchimento automático de conteúdo, acesso público sem login em aba anônima) |
