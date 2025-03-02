import { fetchPOST } from "../fetchPOST";

interface TaskCompleted {
  id: string;
  completed: boolean;
}

export const updateTaskCompletedService = async (task: TaskCompleted) => {
  const url = new URL(
    "/api/task/updateCompleted",
    process.env.NEXT_PUBLIC_BACKEND_URL
  );

  try {
    const responseData = await fetchPOST({
      url: url.toString(),
      body: task,
      error: "Error al actualizar la tarea.",
    });

    console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
};
