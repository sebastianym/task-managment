import {
  Calendar,
  Check,
  Clock,
  PencilLine,
  TriangleAlert,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskStatsProps } from "@/lib/types/TaskStatsProps";

export function TaskStats({
  totalTasks,
  completedTasks,
  pendingTasks,
  highPriorityTasks,
}: TaskStatsProps) {
  // Calcular el porcentaje de tareas completadas
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Progreso</CardTitle>
          <CardDescription>Resumen de tus tareas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#595756"
                  strokeWidth="12"
                />
                {/* Círculo de progreso */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="12"
                  strokeDasharray={`${completionPercentage * 2.51327}  251.327`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">
                  {completionPercentage}%
                </span>
                <span className="text-xs text-muted-foreground">
                  Completado
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-medium">{totalTasks}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Completadas</p>
                  <p className="font-medium">{completedTasks}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pendientes</p>
                  <p className="font-medium">{pendingTasks}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <TriangleAlert className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prioritarias</p>
                  <p className="font-medium">{highPriorityTasks}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-700/5 via-indigo-700/10 to-indigo-700/5">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="size-12 rounded-full bg-indigo-600/10 flex items-center justify-center mb-4">
              <PencilLine className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium">Consejos de productividad</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Divide las tareas grandes en subtareas más pequeñas y manejables
              para aumentar tu productividad.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
