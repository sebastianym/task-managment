"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { Task, Priority } from "@/lib/types/Task"

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "favorite" | "completed">) => void
  initialData?: Task
  isEditing?: boolean
}

export function TaskForm({ isOpen, onClose, onSubmit, initialData, isEditing = false }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [tags, setTags] = useState<string>("")
  const [tagInput, setTagInput] = useState("")

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setPriority(initialData.priority)
      setTags(initialData.category)
    }
  }, [initialData])

  // Resetear el formulario al cerrar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        if (!isEditing) {
          setTitle("")
          setDescription("")
          setPriority("medium")
        }
      }, 300)
    }
  }, [isOpen, isEditing])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (title.trim() === "") return

//     onSubmit({
//       title,
//       description,
//       priority,
//       tags,
//     })
//   } 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar tarea" : "Crear nueva tarea"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los detalles de la tarea según sea necesario."
              : "Completa los detalles para crear una nueva tarea."}
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Ingresa el título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe la tarea en detalle"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label>Prioridad</Label>
              {/* <RadioGroup value={priority} onValueChange={(value: any) => setPriority(value as Priority)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="text-red-500 font-medium">
                    Alta
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="text-amber-500 font-medium">
                    Media
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="text-green-500 font-medium">
                    Baja
                  </Label>
                </div>
              </RadioGroup> */}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Guardar cambios" : "Crear tarea"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

