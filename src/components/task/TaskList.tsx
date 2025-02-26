"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { AlertCircle, Calendar, Check, Clock, Edit, MoreHorizontal, Star, Tag, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Priority = "low" | "medium" | "high"

interface Task {
  id: string
  title: string
  description: string
  createdAt: Date
  priority: Priority
  completed: boolean
  favorite: boolean
  tags: string[]
}

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
  onToggleCompleted: (id: string) => void
  onEdit: (id: string, updatedTask: Partial<Task>) => void
}

export function TaskList({ tasks, onDelete, onToggleFavorite, onToggleCompleted, onEdit }: TaskListProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id)
  }

  const handleEditSubmit = (taskId: string, updatedTask: Partial<Task>) => {
    onEdit(taskId, updatedTask)
    setEditingTaskId(null)
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <div className="size-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="h-3.5 w-3.5 text-red-500" />
          </div>
        )
      case "medium":
        return (
          <div className="size-6 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
          </div>
        )
      case "low":
        return (
          <div className="size-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="h-3.5 w-3.5 text-green-500" />
          </div>
        )
      default:
        return null
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No hay tareas</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          No se encontraron tareas con los filtros actuales. Intenta cambiar los filtros o crea una nueva tarea.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={`overflow-hidden transition-all hover:shadow-md ${task.completed ? "bg-muted/40 opacity-80" : ""}`}
        >
          <CardHeader className="p-4 pb-0">
            <div className="flex items-start gap-3">
              <Checkbox checked={task.completed} onCheckedChange={() => onToggleCompleted(task.id)} className="mt-1" />
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${task.favorite ? "text-yellow-500" : ""}`}
                      onClick={() => onToggleFavorite(task.id)}
                    >
                      <Star className="h-4 w-4" fill={task.favorite ? "currentColor" : "none"} />
                      <span className="sr-only">Favorito</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Más opciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(task)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p
                  className={`text-sm ${task.completed ? "text-muted-foreground line-through" : "text-muted-foreground"}`}
                >
                  {task.description}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-3">
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(task.createdAt, "d MMM, yyyy", { locale: es })}</span>
            </div>
            <div className="flex items-center gap-1">
              {getPriorityIcon(task.priority)}
              <span className="text-xs font-medium capitalize">{task.priority}</span>
            </div>
          </CardFooter>
        </Card>
      ))}

      
    </div>
  )
}

