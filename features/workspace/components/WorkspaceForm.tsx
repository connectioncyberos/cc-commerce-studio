"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button, Card, Input, Textarea } from "@/components/ui";
import {
  createWorkspaceAction,
  type CreateWorkspaceActionState,
} from "../actions/create-workspace.action";

const initialState: CreateWorkspaceActionState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar Workspace"}
    </Button>
  );
}

export function WorkspaceForm() {
  const [state, formAction] = useFormState(createWorkspaceAction, initialState);

  return (
    <Card className="mb-6">
      <form action={formAction} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Nome do workspace
          </label>
          <Input name="name" placeholder="Ex: Minha Loja Online" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Slug
          </label>
          <Input name="slug" placeholder="minha-loja-online" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Descrição
          </label>
          <Textarea
            name="description"
            placeholder="Descreva rapidamente este workspace"
            rows={4}
          />
        </div>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.success && (
          <p className="text-sm text-emerald-400">Workspace criado com sucesso.</p>
        )}

        <SubmitButton />
      </form>
    </Card>
  );
}
