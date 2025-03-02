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
import { CalendarIcon, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormState } from "react-dom";
import { createTaskAction } from "@/data/actions/task/createTaskAction";
import { editTaskAction } from "@/data/actions/task/editTaskAction";
import { ZodErrors } from "../custom/ZodErrors";
import { SubmitButton } from "../custom/SubmitButton";
import { ApiErrors } from "../custom/ApiErrors";
import { toast } from "sonner";

const INITIAL_STATE = {
  apiErrors: null,
  zodErrors: null,
  data: null,
  message: null,
};

export function TaskForm({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  isEditing = false,
}: TaskFormProps) {
  const [idTask, setIdTask] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<any>(null);
  const [priority, setPriority] = useState<Priority | "">("low");
  const [category, setCategory] = useState("university");
  const [formState, formAction] = useFormState(
    isEditing ? editTaskAction : createTaskAction,
    INITIAL_STATE
  );

  useEffect(() => {
    console.log("mensaje inicio: ", formState);
    if (
      formState.message === "Tarea actualizada correctamente" ||
      formState.message === "Tarea creada correctamente"
    ) {
      toast.success(
        isEditing
          ? "Tarea actualizada correctamente"
          : "Tarea creada correctamente"
      );
      onSuccess();
      onClose();
      console.log("mensaje inicio: ", formState);
    }
    console.log("mensaje inicio: ", formState);
  }, [formState]);

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (initialData) {
      setIdTask(initialData.id);
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDueDate(new Date(initialData.due_date));
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
          setPriority("");
          setCategory("");
          setDueDate(null);
        }
      }, 300);
    }
  }, [isOpen, isEditing]);

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
        <form action={formAction}>
          <input type="hidden" value={idTask} name="idTask" />
          <div className="grid gap-4 py-4">
            <div className="grid">
              <div className="gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ingresa el título de la tarea"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <ZodErrors error={formState?.zodErrors?.title} />
            </div>

            <div className="grid">
              <div className="gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe la tarea en detalle"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <ZodErrors error={formState?.zodErrors?.description} />
            </div>

            <div className="grid">
              <div className="gap-2">
                <Label htmlFor="dueDate">Fecha de vencimiento</Label>
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
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <input
                  type="hidden"
                  name="dueDate"
                  value={dueDate ? dueDate.toISOString() : ""}
                />
              </div>
              <ZodErrors error={formState?.zodErrors?.dueDate} />
            </div>

            <div className="grid">
              <div className="gap-2">
                <Label>Prioridad</Label>
                <Select
                  name="priority"
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
              <ZodErrors error={formState?.zodErrors?.priority} />
            </div>

            <div className="grid">
              <div className="gap-2">
                <Label>Categoría</Label>
                <Select
                  name="category"
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
              <ZodErrors error={formState?.zodErrors?.category} />
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
            <SubmitButton
              className="w-full"
              text={isEditing ? "Guardar cambios" : "Crear tarea"}
              loadingText="Cargando"
              color="blue"
              size="medium"
            />
            <ApiErrors error={formState.apiErrors} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
