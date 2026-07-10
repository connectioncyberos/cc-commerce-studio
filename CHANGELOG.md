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

## [0.1.0-alpha.3] - 2026-07-08

### Changed

- Alinhado `app/layout.tsx` ao padrão global do ecossistema ConnectionCyber.
- Alinhado `app/globals.css` aos tokens visuais oficiais.
- Alinhado `tailwind.config.ts` à escala oficial de espaçamento e tokens de estado.
- Atualizada homepage para usar `/logo.png` e padrão visual escuro/emerald.
