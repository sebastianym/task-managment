import { Task } from "./Task";

export interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    task: Omit<Task, "id" | "createdAt" | "favorite" | "completed">
  ) => void;
  initialData?: Task;
  isEditing?: boolean;
}
