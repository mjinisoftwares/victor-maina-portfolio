import { z } from "zod"

export const SignupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").max(30, "Name must be under 30 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be under 20 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be under 20 characters"),
})