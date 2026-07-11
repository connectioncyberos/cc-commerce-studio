# Changelog

## [Unreleased] - 2026-07-10

### Added

- Autenticação real (Supabase Auth + `@supabase/ssr`): sign-in/sign-up/sign-out, guard de rota em `app/(app)/layout.tsx`.
- `workspace_members` + políticas de RLS multi-tenant aplicadas no Supabase.
- CS-007 completo: create/read/update/delete de Workspace testado end-to-end.

### Fixed

- Bug de RLS no insert de `workspaces` (linha não visível no `RETURNING` antes de existir o vínculo em `workspace_members`). Corrigido gerando `id` no cliente e removendo `.select().single()` do insert.

## [Unreleased] - 2026-07-10 (2)

### Added

- CS-008 — módulo Products completo (SPC-0002): `features/products/` (types, validations, services, queries, mutations, actions, components), página `app/(app)/products/page.tsx`. Reaproveita schema e RLS de `products` já existentes desde CS-007, sem migração nova.

## [Unreleased] - 2026-07-10 (3)

### Added

- CS-009 — módulo Brands completo (SPC-0003): migração `003_create_brands_and_rls.sql` (tabela `brands`, RLS `brands_member_all`, `brand_id` aditivo em `products`), `features/brands/` completo, página `app/(app)/brands/page.tsx`.
- Seletor de marca (opcional) no `ProductForm`, novo componente `components/ui/Select.tsx`.
- Entrada "Marcas" no Sidebar.

## [Unreleased] - 2026-07-10 (4)

### Added

- CS-010 — módulo Offer Engine completo (SPC-0004): migração `004_create_offers_and_rls.sql` (tabela `offers` + RLS `offers_member_all`), `features/offer-engine/` completo, primeiro Prompt (`PR-0001`, `features/offer-engine/prompts/offer-copy.md`, status `Ready` conforme STD-0007 0.2.0), página `app/(app)/offers/page.tsx`.
- `generateOfferCopy()` isolada em `offer.service.ts` — hoje devolve rascunho manual; nenhum provedor de IA configurado ainda (ver SPC-0004, achado 4.1).

## [Unreleased] - 2026-07-10 (5)

### Changed

- Escopo do MVP confirmado (ver DP-010 em cc-engineering-framework): próximos passos são ligar IA real ao Offer Engine; demais 8 módulos do CS-008+ ficam fora do escopo por agora.

## [Unreleased] - 2026-07-10 (6)

### Changed

- `generateOfferCopy()`/`generateOfferCopyAction()` agora tratam explicitamente resposta vazia/bloqueada pelo filtro de segurança e falhas de rede/cota do Gemini, conforme STD-0007 §4.8 (0.3.0).

## [Unreleased] - 2026-07-10 (7)

### Decided

- Testes automatizados e CI ficam fora do escopo do MVP — backlog consciente, ver `cc-engineering-framework/releases/Release-0002.md`.

MVP fechado: Workspace (CS-007), Products (CS-008), Brands (CS-009), Offer Engine com IA real (CS-010).

## [Unreleased] - 2026-07-11

### Added

- CS-011 — módulo Landing Page Engine completo (SPC-0005): migração `005_create_landing_pages_and_rls.sql` (tabela `landing_pages` + RLS `landing_pages_member_all` + `landing_pages_select_public_published`), `features/landing-pages/` completo, página de gestão `app/(app)/landing-pages/page.tsx`, rota pública `app/lp/[slug]/page.tsx` (fora do grupo `(app)`, sem exigir login).

### Fixed

- Migração 005 não estava aplicada no Supabase, causando `Could not find the table 'public.landing_pages' in the schema cache` tanto localmente quanto em produção. Corrigido aplicando a migração via SQL Editor.

Testado end-to-end: landing page criada com slug `oferta-001-insole`, status "Publicada", conteúdo pré-preenchido a partir da oferta com copy gerada por IA, rota pública acessível sem login em aba anônima.

## [0.1.0-alpha.3] - 2026-07-08

### Changed

- Alinhado `app/layout.tsx` ao padrão global do ecossistema ConnectionCyber.
- Alinhado `app/globals.css` aos tokens visuais oficiais.
- Alinhado `tailwind.config.ts` à escala oficial de espaçamento e tokens de estado.
- Atualizada homepage para usar `/logo.png` e padrão visual escuro/emerald.
