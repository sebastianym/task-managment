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


"use server";

import { loginService } from "@/data/services/auth/loginService";
import { config } from "@/lib/config/auth/cookiesConfig";
import { schemaLogin } from "@/lib/schemas/schemaLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (prevState: any, formData: FormData) => {
  let redirectPath: string | null = null;

  try {
    const validatedFields = schemaLogin.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConfirmation: formData.get("passwordConfirmation"),
    });

    if (
      !validatedFields.success ||
      !validatedFields.data.firstName ||
      !validatedFields.data.lastName ||
      !validatedFields.data.email ||
      !validatedFields.data.password ||
      !validatedFields.data.passwordConfirmation
    ) {
      return {
        ...prevState,
        apiErrors: null,
        zodErrors: validatedFields.error?.flatten().fieldErrors,
        message: "Faltan campos por completar. No se pudo iniciar sesión.",
      };
    }

    const responseData = await loginService({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    });

    if (!responseData) {
      return {
        ...prevState,
        apiErrors: responseData.error,
        zodErrors: null,
        message: "Ocurrió un error. Por favor, intenta de nuevo.",
      };
    }

    if (responseData.error) {
      return {
        ...prevState,
        apiErrors: responseData.error.message,
        zodErrors: null,
        message: "Error al iniciar sesión.",
      };
    }

    if (responseData.jwt) {
      cookies().set("jwt", responseData.jwt, config);
      redirectPath = `/dashboard`;
    }
  } catch (error) {
    console.error("Login action error:", error);
    throw error;
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
};