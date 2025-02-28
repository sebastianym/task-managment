import { Task } from "./Task";

export interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
}
