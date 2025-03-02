"use server";

import { createTaskService } from "@/data/services/task/createTaskService";
import { schemaTask } from "@/lib/schemas/schemaTask";

export const createTaskAction = async (prevState: any, formData: FormData) => {
  try {
    const validatedFields = schemaTask.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate"),
      priority: formData.get("priority"),
      category: formData.get("category"),
    });

    if (
      !validatedFields.success ||
      !validatedFields.data.title ||
      !validatedFields.data.description ||
      !validatedFields.data.dueDate ||
      !validatedFields.data.priority ||
      !validatedFields.data.category
    ) {
      return {
        ...prevState,
        apiErrors: null,
        zodErrors: validatedFields.error?.flatten().fieldErrors,
        message: "Faltan campos por completar. No se pudo crear la tarea.",
      };
    }

    const responseData = await createTaskService({
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      dueDate: validatedFields.data.dueDate,
      priority: validatedFields.data.priority,
      category: validatedFields.data.category,
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
        message: "Error al crear la tarea.",
      };
    }

    return {
      ...prevState,
      apiErrors: null,
      zodErrors: null,
      message: "Tarea creada correctamente",
    };
  } catch (error) {
    console.error("Create task action error:", error);
    throw error;
  }
};
