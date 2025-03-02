"use server";

import { updateTaskService } from "@/data/services/task/updateTaskService";
import { schemaTask } from "@/lib/schemas/schemaTask";

export const editTaskAction = async (prevState: any, formData: FormData) => {
  try {
    const validatedFields = schemaTask.safeParse({
      id: formData.get("idTask"),
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate"),
      priority: formData.get("priority"),
      category: formData.get("category"),
    });

    if (
      !validatedFields.success ||
      !validatedFields.data.id ||
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
        message: "Faltan campos por completar. No se pudo editar la tarea.",
      };
    }

    const responseData = await updateTaskService({
      id: validatedFields.data.id,
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      dueDate: validatedFields.data.dueDate,
      priority: validatedFields.data.priority,
      category: validatedFields.data.category,
    });

    console.log("responseData", responseData);

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
        message: "Error al editar la tarea.",
      };
    }

    return {
      ...prevState,
      apiErrors: null,
      zodErrors: null,
      message: "Tarea actualizada correctamente",
    };
  } catch (error) {
    console.error("Edit action error:", error);
    throw error;
  }
};
