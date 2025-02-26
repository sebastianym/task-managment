import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Check, Clock, TriangleAlert } from "lucide-react";

function StatsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-4 mb-6">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total de tareas
            </p>
            <h3 className="text-2xl font-bold mt-1">2000</h3>
          </div>
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Completadas
            </p>
            <h3 className="text-2xl font-bold mt-1">{2000}</h3>
          </div>
          <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Pendientes
            </p>
            <h3 className="text-2xl font-bold mt-1">{2000}</h3>
          </div>
          <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Alta prioridad
            </p>
            <h3 className="text-2xl font-bold mt-1">{20000}</h3>
          </div>
          <div className="size-10 rounded-full bg-red-500/10 flex items-center justify-center">
            <TriangleAlert className="h-5 w-5 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsDashboard;
