"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Priority } from "@/lib/types/Task";
import { TaskFormProps } from "@/lib/types/TaskFormProps";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<Priority>("low");
  const [category, setCategory] = useState("");

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDueDate(initialData.due_date);
      setCategory(initialData.category);
      setPriority(initialData.priority);
    }
  }, [initialData]);

  // Resetear el formulario al cerrar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        if (!isEditing) {
          setTitle("");
          setDescription("");
          setPriority("low");
          setCategory("");
          setDueDate(null);
        }
      }, 300);
    }
  }, [isOpen, isEditing]);

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
          <DialogTitle>
            {isEditing ? "Editar tarea" : "Crear nueva tarea"}
          </DialogTitle>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full pl-3 text-left font-normal text-muted-foreground"
                  >
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate ?? undefined}
                    onSelect={(date) => setDueDate(date ?? null)}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Prioridad</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as Priority)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Prioridad baja</SelectItem>
                  <SelectItem value="medium">Prioridad media</SelectItem>
                  <SelectItem value="high">Prioridad alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Categoría</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="university">Universidad</SelectItem>
                  <SelectItem value="work">Trabajo</SelectItem>
                  <SelectItem value="house">Casa</SelectItem>
                  <SelectItem value="gym">Gimnasio</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="bg-red-600 text-white"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-indigo-600 text-white">
              {isEditing ? "Guardar cambios" : "Crear tarea"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
