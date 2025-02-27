import { fetchGET } from "../fetchGET";

export const getTasksService = async () => {
  const url = new URL("/api/task/get", process.env.NEXT_PUBLIC_BACKEND_URL);
  try {
    const responseData = await fetchGET({
      url: url.toString(),
      error: "Error al traer las tareas.",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};
