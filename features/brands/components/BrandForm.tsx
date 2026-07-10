"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button, Card, Input, Textarea } from "@/components/ui";
import {
  createBrandAction,
  type CreateBrandActionState,
} from "../actions/create-brand.action";

const initialState: CreateBrandActionState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar Marca"}
    </Button>
  );
}

type BrandFormProps = {
  workspaceId: string;
};

export function BrandForm({ workspaceId }: BrandFormProps) {
  const [state, formAction] = useFormState(createBrandAction, initialState);

  return (
    <Card className="mb-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="workspace_id" value={workspaceId} />

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Nome da marca
          </label>
          <Input name="name" placeholder="Ex: ConnectionCyber" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Slug
          </label>
          <Input name="slug" placeholder="connectioncyber" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Descrição
          </label>
          <Textarea
            name="description"
            placeholder="Descreva rapidamente esta marca"
            rows={3}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Tom de voz
          </label>
          <Textarea
            name="tone_of_voice"
            placeholder="Ex: direto, técnico, confiante — usado depois pelo Offer Engine"
            rows={3}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            URL do logo (opcional)
          </label>
          <Input name="logo_url" placeholder="https://..." />
        </div>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.success && (
          <p className="text-sm text-emerald-400">Marca criada com sucesso.</p>
        )}

        <SubmitButton />
      </form>
    </Card>
  );
}
