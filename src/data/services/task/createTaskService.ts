import { fetchPOST } from "../fetchPOST";

export const createTaskService = async (id: number) => {
  const url = new URL("/api/task/create", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    const responseData = await fetchPOST({
      url: url.toString(),
      body: JSON.stringify({ id }),
      error: "Error al crear la tarea.",
    });

    console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
};
