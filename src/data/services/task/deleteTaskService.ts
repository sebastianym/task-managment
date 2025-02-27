import { fetchPOST } from "../fetchPOST";

export const deleteTaskService = async (id: number) => {
  const url = new URL("/api/task/delete", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    const responseData = await fetchPOST({
      url: url.toString(),
      body: JSON.stringify({ id }),
      error: "Error al eliminar la tarea.",
    });

    console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
};
