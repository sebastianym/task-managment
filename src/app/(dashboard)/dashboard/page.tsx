import StatsDashboard from "@/components/dashboard/StatsDashboard";
import TabsDashboard from "@/components/dashboard/TabsDashboard";
import { TaskStats } from "@/components/task/TaskStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function Dashboard() {
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
      <StatsDashboard />

      {/* Lista de tareas */}
      <div className="grid md:grid-cols-3 gap-6">
        <TabsDashboard />
        <div>
          <TaskStats
            totalTasks={28}
            completedTasks={13}
            pendingTasks={10}
            highPriorityTasks={10}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
