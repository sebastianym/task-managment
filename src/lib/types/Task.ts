export type Priority = "low" | "medium" | "high";
type Category = "university" | "work" | "house" | "gym" | "other";

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: Date;
  priority: Priority;
  completed: boolean;
  category: Category;
  userId: Number;
  createdAt: Date;
  updatedAt: Date;
}
