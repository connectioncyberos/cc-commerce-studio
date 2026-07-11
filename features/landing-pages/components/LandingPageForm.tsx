"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import type { Offer } from "@/features/offer-engine";
import {
  createLandingPageAction,
  type CreateLandingPageActionState,
} from "../actions/create-landing-page.action";

const initialState: CreateLandingPageActionState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar Landing Page"}
    </Button>
  );
}

type LandingPageFormProps = {
  workspaceId: string;
  offers: Offer[];
};

export function LandingPageForm({ workspaceId, offers }: LandingPageFormProps) {
  const [state, formAction] = useFormState(createLandingPageAction, initialState);
  const [offerId, setOfferId] = useState(offers[0]?.id ?? "");
  const [content, setContent] = useState(offers[0]?.copy ?? "");

  function handleOfferChange(id: string) {
    setOfferId(id);
    const offer = offers.find((item) => item.id === id);
    setContent(offer?.copy ?? "");
  }

  if (offers.length === 0) {
    return (
      <Card className="mb-6">
        <p className="text-sm text-neutral-400">
          Crie uma oferta antes de montar uma landing page.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="workspace_id" value={workspaceId} />
        <input type="hidden" name="content" value={content} />

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Título da página
          </label>
          <Input name="title" placeholder="Ex: Página da Oferta de Lançamento" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Slug (URL pública: /lp/&lt;slug&gt;)
          </label>
          <Input name="slug" placeholder="oferta-lancamento" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Oferta de origem
          </label>
          <Select
            name="offer_id"
            value={offerId}
            onChange={(event) => handleOfferChange(event.target.value)}
            required
          >
            {offers.map((offer) => (
              <option key={offer.id} value={offer.id}>
                {offer.title}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Conteúdo (pré-preenchido com a copy da oferta, editável)
          </label>
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={6}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Status
          </label>
          <Select name="status" defaultValue="draft">
            <option value="draft">Rascunho (não visível publicamente)</option>
            <option value="published">Publicada</option>
          </Select>
        </div>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.success && (
          <p className="text-sm text-emerald-400">Landing page criada com sucesso.</p>
        )}

        <SubmitButton />
      </form>
    </Card>
  );
}
