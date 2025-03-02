import { Task } from "./Task";

export interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Task;
  isEditing?: boolean;
}
