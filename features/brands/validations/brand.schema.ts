import { z } from "zod";

export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve possuir no mínimo 2 caracteres.")
    .max(100, "O nome deve possuir no máximo 100 caracteres."),

  slug: z
    .string()
    .trim()
    .min(2, "O slug deve possuir no mínimo 2 caracteres.")
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

  tone_of_voice: z
    .string()
    .trim()
    .max(1000, "O tom de voz deve possuir no máximo 1000 caracteres.")
    .optional(),

  logo_url: z
    .string()
    .trim()
    .url("Informe uma URL válida.")
    .optional()
    .or(z.literal("")),
});

export type BrandSchema = z.infer<typeof brandSchema>;
