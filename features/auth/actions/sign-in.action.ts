"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error: string | null;
  message?: string;
};

/**
 * Ação única de autenticação: o formulário envia um campo oculto "intent"
 * ("sign-in" ou "sign-up") indicando qual botão foi clicado. Unificado em
 * um único useFormState no LoginForm para evitar que erros de tentativas
 * diferentes (entrar / criar conta) fiquem acumulados na tela ao mesmo tempo.
 */
export async function authAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const intent = String(formData.get("intent") ?? "sign-in");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  const supabase = createClient();

  if (intent === "sign-up") {
    if (password.length < 6) {
      return { error: "A senha deve possuir no mínimo 6 caracteres." };
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return { error: error.message };
    }

    return {
      error: null,
      message: "Conta criada. Verifique seu e-mail para confirmar o acesso.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/workspace");
}
