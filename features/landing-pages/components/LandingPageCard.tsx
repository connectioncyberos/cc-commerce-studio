"use client";

import { useState } from "react";
import type { FormEvent, SVGProps } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import type { LandingPage } from "../types/landing-page.types";
import { updateLandingPageAction, deleteLandingPageAction } from "../actions";

type LandingPageCardProps = {
  landingPage: LandingPage;
};

export function LandingPageCard({ landingPage }: LandingPageCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      await updateLandingPageAction(landingPage.id, {
        title: formData.get("title"),
        slug: formData.get("slug"),
        content: formData.get("content") || undefined,
        status: formData.get("status"),
      });
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar landing page.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Excluir a landing page "${landingPage.title}"? Essa ação não pode ser desfeita.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteLandingPageAction(landingPage.id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir landing page.");
      setIsDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <Card>
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Título
            </label>
            <Input name="title" defaultValue={landingPage.title} required />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Slug
            </label>
            <Input name="slug" defaultValue={landingPage.slug} required />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Conteúdo
            </label>
            <Textarea name="content" defaultValue={landingPage.content ?? ""} rows={5} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Status
            </label>
            <Select name="status" defaultValue={landingPage.status}>
              <option value="draft">Rascunho</option>
              <option value="published">Publicada</option>
            </Select>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-2">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setError(null);
                setIsEditing(false);
              }}
              className="bg-transparent"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-neutral-100">
            {landingPage.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-500">/lp/{landingPage.slug}</p>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            title="Editar"
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-800 hover:text-emerald-400"
          >
            <IconEdit className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Excluir"
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-800 hover:text-red-400"
          >
            <IconTrash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs capitalize text-neutral-500">{landingPage.status}</p>

      {landingPage.status === "published" && (
        <a
          href={`/lp/${landingPage.slug}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-xs font-medium text-emerald-400 hover:text-emerald-300"
        >
          Ver página pública →
        </a>
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </Card>
  );
}

function IconEdit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

function IconTrash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
