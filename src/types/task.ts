import { z } from "zod";

export const schemaTask = z.object({
  taskName: z
    .string()
    .min(1, "nome é obrigatorio")
    .min(3, "nome deve ter pelo menos 3 caracteres")
    .max(25, "nome deve ter no maximo 25 caracteres"),
  description: z.string().optional(),
  priority: z.enum(["Low", "Medium", "Max"]),
});

export type Task = z.infer<typeof schemaTask>;

export type CreatTask = z.infer<typeof schemaTask> & {
  id: string;
  status: "peding" | "in-progress" | "completed";
  date: Date;
};

export type UpdateTaskInput = Omit<Task, "id" | "status">;
