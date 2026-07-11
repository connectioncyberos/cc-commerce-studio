"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import type { Offer } from "@/features/offer-engine";
import {
  createVideoScriptAction,
  generateVideoScriptAction,
  type CreateVideoScriptActionState,
} from "../actions";

const initialState: CreateVideoScriptActionState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar Roteiro"}
    </Button>
  );
}

type VideoScriptFormProps = {
  workspaceId: string;
  offers: Offer[];
};

export function VideoScriptForm({ workspaceId, offers }: VideoScriptFormProps) {
  const [state, formAction] = useFormState(createVideoScriptAction, initialState);
  const [offerId, setOfferId] = useState(offers[0]?.id ?? "");
  const [script, setScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!offerId) return;
    setIsGenerating(true);
    setGenerateError(null);

    const result = await generateVideoScriptAction(offerId);

    if (result.error) {
      setGenerateError(result.error);
    } else if (result.script) {
      setScript(result.script);
    }

    setIsGenerating(false);
  }

  if (offers.length === 0) {
    return (
      <Card className="mb-6">
        <p className="text-sm text-neutral-400">
          Cadastre uma oferta antes de criar um roteiro de vídeo.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="workspace_id" value={workspaceId} />
        <input type="hidden" name="script" value={script} />

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Título do roteiro
          </label>
          <Input name="title" placeholder="Ex: VSL de lançamento" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Oferta de origem
          </label>
          <Select
            name="offer_id"
            value={offerId}
            onChange={(event) => setOfferId(event.target.value)}
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
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-neutral-300">
              Roteiro
            </label>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !offerId}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
            >
              {isGenerating ? "Gerando roteiro..." : "Gerar roteiro"}
            </button>
          </div>
          <Textarea
            value={script}
            onChange={(event) => setScript(event.target.value)}
            placeholder="Escreva o roteiro ou clique em 'Gerar roteiro'"
            rows={8}
          />
          {generateError && (
            <p className="mt-1 text-xs text-red-400">{generateError}</p>
          )}
          <p className="mt-1 text-xs text-neutral-500">
            "Gerar roteiro" usa o Gemini 3.1 Flash-Lite (PR-0002) a partir da copy da oferta selecionada.
          </p>
        </div>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.success && (
          <p className="text-sm text-emerald-400">Roteiro criado com sucesso.</p>
        )}

        <SubmitButton />
      </form>
    </Card>
  );
}
