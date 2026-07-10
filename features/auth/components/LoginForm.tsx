"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button, Card, Input } from "@/components/ui";
import { authAction, type AuthActionState } from "../actions/sign-in.action";

const initialState: AuthActionState = { error: null };

function SubmitButton({
  label,
  intent,
  className = "",
}: {
  label: string;
  intent: "sign-in" | "sign-up";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      name="intent"
      value={intent}
      disabled={pending}
      className={className}
    >
      {label}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(authAction, initialState);

  return (
    <Card className="w-full max-w-sm">
      <form action={formAction} className="space-y-4">
        <div>
          <img src="/logo.png" alt="ConnectionCyber" className="mx-auto mb-2 h-8 w-auto" />
          <p className="text-center text-sm text-neutral-400">Commerce Studio</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            E-mail
          </label>
          <Input name="email" type="email" required placeholder="voce@exemplo.com" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Senha
          </label>
          <Input name="password" type="password" required placeholder="********" />
        </div>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.message && (
          <p className="text-sm text-emerald-400">{state.message}</p>
        )}

        <div className="flex gap-3">
          <SubmitButton label="Entrar" intent="sign-in" className="flex-1" />
          <SubmitButton
            label="Criar conta"
            intent="sign-up"
            className="flex-1 border-neutral-800 bg-transparent hover:border-neutral-600"
          />
        </div>
      </form>
    </Card>
  );
}
