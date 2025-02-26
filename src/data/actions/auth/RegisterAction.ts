"use server";

import { registerService } from "@/data/services/auth/registerService";
import { config } from "@/lib/config/auth/cookiesConfig";
import { schemaRegister } from "@/lib/schemas/schemaRegister";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const registerAction = async (prevState: any, formData: FormData) => {
  let redirectPath: string | null = null;

  try {
    const validatedFields = schemaRegister.safeParse({
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
        message:
          "Faltan campos por completar. No se pudo realizar el registro.",
      };
    }

    if (
      validatedFields.data.password !==
      validatedFields.data.passwordConfirmation
    ) {
      return {
        ...prevState,
        apiErrors: null,
        zodErrors: {
          passwordConfirmation: [
            "La confirmación de la contraseña no coincide con la contraseña.",
          ],
        },
        message: "Las contraseñas no coinciden.",
      };
    }

    const responseData = await registerService({
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lastName,
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
        message: "Error al registrar.",
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
