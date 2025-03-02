import { fetchPOST } from "../fetchPOST";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  category: string;
}

export const createTaskService = async (task: Task) => {
  const url = new URL("/api/task/create", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    const responseData = await fetchPOST({
      url: url.toString(),
      body: task,
      error: "Error al crear la tarea.",
    });

    console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
};
