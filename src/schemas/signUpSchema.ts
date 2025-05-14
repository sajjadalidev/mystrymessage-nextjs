import { z } from "zod";

export const userNameSchema = z
  .string()
  .min(2, "username must be at least 2 characters long")
  .max(20, "username must be at most 20 characters long")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "username must only contain letters, numbers, and underscores"
  );

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, "username must be at least 2 characters long")
    .max(20, "username must be at most 20 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "username must only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});
