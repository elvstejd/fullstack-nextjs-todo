import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(2, "El titulo de la tarea debe ser mayor o igual a 2 caracteres")
    .max(60, "El titulo de la tarea no puede sobrepasar los 50 caracteres."),
  userId: z.string(),
});

export const updateTaskSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  title: z
    .string()
    .min(2, "El titulo de la tarea debe ser mayor o igual a 2 caracteres")
    .max(60, "El titulo de la tarea no puede sobrepasar los 50 caracteres.")
    .optional(),
  completed: z.boolean().optional(),
});

export const deleteTaskSchema = z.object({
  id: z.string().cuid(),
});
