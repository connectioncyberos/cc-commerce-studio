"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button, Card, Input, Textarea } from "@/components/ui";
import {
  createProductAction,
  type CreateProductActionState,
} from "../actions/create-product.action";

const initialState: CreateProductActionState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar Produto"}
    </Button>
  );
}

type ProductFormProps = {
  workspaceId: string;
};

export function ProductForm({ workspaceId }: ProductFormProps) {
  const [state, formAction] = useFormState(createProductAction, initialState);

  return (
    <Card className="mb-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="workspace_id" value={workspaceId} />

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Nome do produto
          </label>
          <Input name="name" placeholder="Ex: Curso de Marketing Digital" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Descrição
          </label>
          <Textarea
            name="description"
            placeholder="Descreva rapidamente este produto"
            rows={4}
          />
        </div>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.success && (
          <p className="text-sm text-emerald-400">Produto criado com sucesso.</p>
        )}

        <SubmitButton />
      </form>
    </Card>
  );
}
