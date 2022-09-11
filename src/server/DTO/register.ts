import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "El nombre de usuario es requerido" })
    .min(5, "El nombre de usuario debe tener 5 carateres o más.")
    .max(15, "El nombre de usuario debe tener 15 caracteres o menos"),
  password: z
    .string()
    .min(5, "La contraseña debe contener 5 caracteres o más.")
    .max(20, "La contraseña no puede superar los 20 caracteres."),
});
