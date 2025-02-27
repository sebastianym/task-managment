"use server";

import { registerService } from "@/data/services/auth/registerService";
import { schemaRegister } from "@/lib/schemas/schemaRegister";

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
        apiErrors: responseData.error,
        zodErrors: null,
        message: "Error al registrar.",
      };
    }

    return {
      ...prevState,
      apiErrors: null,
      zodErrors: null,
      message: "Registro exitoso",
    };
  } catch (error) {
    console.error("Register action error:", error);
    throw error;
  }
};
