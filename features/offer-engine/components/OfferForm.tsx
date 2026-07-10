"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import type { Product } from "@/features/products";
import type { Brand } from "@/features/brands";
import {
  createOfferAction,
  generateOfferCopyAction,
  type CreateOfferActionState,
} from "../actions";

const initialState: CreateOfferActionState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar Oferta"}
    </Button>
  );
}

type OfferFormProps = {
  workspaceId: string;
  products: Product[];
  brands: Brand[];
};

export function OfferForm({ workspaceId, products, brands }: OfferFormProps) {
  const [state, formAction] = useFormState(createOfferAction, initialState);
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [brandId, setBrandId] = useState("");
  const [copy, setCopy] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!productId) return;
    setIsGenerating(true);
    setGenerateError(null);

    const result = await generateOfferCopyAction(productId, brandId || null);

    if (result.error) {
      setGenerateError(result.error);
    } else if (result.copy) {
      setCopy(result.copy);
    }

    setIsGenerating(false);
  }

  if (products.length === 0) {
    return (
      <Card className="mb-6">
        <p className="text-sm text-neutral-400">
          Cadastre um produto antes de criar uma oferta.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="workspace_id" value={workspaceId} />
        <input type="hidden" name="copy" value={copy} />

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Título da oferta
          </label>
          <Input name="title" placeholder="Ex: Oferta de lançamento" required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Produto
          </label>
          <Select
            name="product_id"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            required
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>
        </div>

        {brands.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              Marca (opcional)
            </label>
            <Select
              name="brand_id"
              value={brandId}
              onChange={(event) => setBrandId(event.target.value)}
            >
              <option value="">Sem marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Select>
          </div>
        )}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-neutral-300">
              Copy da oferta
            </label>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !productId}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
            >
              {isGenerating ? "Gerando rascunho..." : "Gerar rascunho"}
            </button>
          </div>
          <Textarea
            value={copy}
            onChange={(event) => setCopy(event.target.value)}
            placeholder="Escreva a copy ou clique em 'Gerar rascunho'"
            rows={6}
          />
          {generateError && (
            <p className="mt-1 text-xs text-red-400">{generateError}</p>
          )}
          <p className="mt-1 text-xs text-neutral-500">
            "Gerar rascunho" hoje monta um texto manual a partir do prompt PR-0001 —
            nenhum provedor de IA está ligado ainda (ver SPC-0004).
          </p>
        </div>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.success && (
          <p className="text-sm text-emerald-400">Oferta criada com sucesso.</p>
        )}

        <SubmitButton />
      </form>
    </Card>
  );
}
