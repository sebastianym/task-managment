"use client";
import StatsDashboard from "@/components/dashboard/StatsDashboard";
import TabsDashboard from "@/components/dashboard/TabsDashboard";
import { TaskStats } from "@/components/task/TaskStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getTasksService } from "@/data/services/task/getTasksService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Task } from "@/lib/types/Task";

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<Task[]>([]);
  const [tasksPending, setTasksPending] = useState<Task[]>([]);
  const [tasksHighPriority, setTasksHighPriority] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasksService();
        console.log(data);
        const completedTasks = data.filter((task: Task) => task.completed);
        const pendingTasks = data.filter((task: Task) => !task.completed);
        const highPriorityTasks = data.filter(
          (task: Task) => task.priority === "high"
        );

        setTasks(data);
        setTasksCompleted(completedTasks);
        setTasksPending(pendingTasks);
        setTasksHighPriority(highPriorityTasks);
      } catch (error) {
        toast.error("Error al traer las tareas");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Tareas</h1>
          <p className="text-muted-foreground">
            Gestiona tus tareas y mantén el control de tus proyectos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="md:flex gap-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 px-4 py-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4" />
            Nueva tarea
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <StatsDashboard
        totalTasks={tasks.length}
        completedTasks={tasksCompleted.length}
        pendingTasks={tasksPending.length}
        highPriorityTasks={tasksHighPriority.length}
      />

      {/* Lista de tareas */}
      <div className="grid md:grid-cols-3 gap-6">
        <TabsDashboard tasks={tasks} />
        <div>
          <TaskStats
            totalTasks={tasks.length}
            completedTasks={tasksCompleted.length}
            pendingTasks={tasksPending.length}
            highPriorityTasks={tasksHighPriority.length}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
