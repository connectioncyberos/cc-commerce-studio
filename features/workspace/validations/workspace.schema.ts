import { z } from "zod";

export const workspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "O nome deve possuir no mínimo 3 caracteres.")
    .max(100, "O nome deve possuir no máximo 100 caracteres."),

  slug: z
    .string()
    .trim()
    .min(3, "O slug deve possuir no mínimo 3 caracteres.")
    .max(100, "O slug deve possuir no máximo 100 caracteres.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "O slug deve conter apenas letras minúsculas, números e hífens.",
    ),

  description: z
    .string()
    .trim()
    .max(500, "A descrição deve possuir no máximo 500 caracteres.")
    .optional(),
});

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;