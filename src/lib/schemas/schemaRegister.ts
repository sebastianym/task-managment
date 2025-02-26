import { z } from "zod";

export const schemaRegister = z.object({
  firstName: z
    .string({ message: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  lastName: z
    .string({ message: "El apellido es requerido" })
    .min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  email: z
    .string({ message: "El correo electrónico es requerido" })
    .email({ message: "Dirección de correo electrónico no válida" }),
  password: z
    .string({ message: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  passwordConfirmation: z
    .string({ message: "La confirmación de la contraseña es requerida" })
    .min(6, {
      message:
        "La confirmación de la contraseña debe tener al menos 6 caracteres",
    }),
});