import { z } from "zod";

export const schemaLogin = z.object({
  email: z
    .string({ message: "El correo electrónico es requerido" })
    .email({ message: "Dirección de correo electrónico no válida" }),
  password: z
    .string({ message: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
