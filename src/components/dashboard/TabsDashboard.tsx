"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskList } from "../task/TaskList";
import { useState } from "react";
import { Priority, Task } from "@/lib/types/Task";
import { toast } from "sonner";

function TabsDashboard({ tasks }: { tasks: Task[] }) {
  const [activeFilter, setActiveFilter] = useState<"all" | Priority>("all");
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Filtrar tareas según la prioridad seleccionada
  const filteredTasks = tasks.filter(
    (task) => activeFilter === "all" || task.priority === activeFilter
  );

  // Añadir nueva tarea
  const addTask = (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">
  ) => {
    setIsAddingTask(false);
    toast.success("La tarea se ha creado exitosamente");
  };

  // Eliminar tarea
  const deleteTask = (id: string) => {
    toast.success("La tarea se ha eliminado exitosamente");
  };

  // Marcar como completada
  const toggleCompleted = (id: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate && !taskToUpdate.completed) {
      toast.success("Has completado una tarea exitosamente");
    }
  };

  // Editar tarea
  const editTask = (id: string, updatedTask: Partial<Task>) => {
    toast.success("La tarea se ha actualizado exitosamente");
  };

  return (
    <div className="md:col-span-2">
      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => setActiveFilter(value as any)}
      >
        <TabsList className="w-full justify-start mb-4 bg-muted/50 p-1">
          <TabsTrigger value="all" className="flex-1">
            Todas
          </TabsTrigger>
          <TabsTrigger value="high" className="flex-1">
            Alta
          </TabsTrigger>
          <TabsTrigger value="medium" className="flex-1">
            Media
          </TabsTrigger>
          <TabsTrigger value="low" className="flex-1">
            Baja
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0">
          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleCompleted={toggleCompleted}
            onEdit={editTask}
          />
        </TabsContent>
        <TabsContent value="high" className="mt-0">
          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleCompleted={toggleCompleted}
            onEdit={editTask}
          />
        </TabsContent>
        <TabsContent value="medium" className="mt-0">
          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleCompleted={toggleCompleted}
            onEdit={editTask}
          />
        </TabsContent>
        <TabsContent value="low" className="mt-0">
          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleCompleted={toggleCompleted}
            onEdit={editTask}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabsDashboard;
