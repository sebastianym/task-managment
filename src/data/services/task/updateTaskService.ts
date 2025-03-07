import { fetchPOST } from "../fetchPOST";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  category: string;
}

export const updateTaskService = async (task: Task) => {
  const url = new URL("/api/task/update", process.env.NEXT_PUBLIC_BACKEND_URL);

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
