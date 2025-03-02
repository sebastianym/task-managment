import { z } from "zod";

export const schemaTask = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "El título es requerido" }),
  description: z.string().min(5, { message: "La descripción es requerida" }),
  dueDate: z
    .string()
    .nullable()
    .refine(
      (date) => {
        if (date === null) return true;
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate >= new Date(new Date().setHours(0, 0, 0, 0));
      },
      {
        message: "La fecha debe ser hoy o en el futuro",
      }
    ),
  priority: z.enum(["low", "medium", "high"], {
    message: "La prioridad es requerida",
  }),
  category: z.enum(["university", "work", "house", "gym", "other"], {
    message: "La categoría es requerida",
  }),
});
