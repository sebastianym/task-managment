import { fetchPOST } from "../fetchPOST";

export const updateTaskService = async (id: number) => {
  const url = new URL("/api/task/update", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    const responseData = await fetchPOST({
      url: url.toString(),
      body: JSON.stringify({ id }),
      error: "Error al actualizar la tarea.",
    });

    console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
};
