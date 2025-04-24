import { z } from 'zod';

export const loginSchema = z.object({
    name: z.string().min(2, "Name is required."),
    email: z.string().min(1, "Email is required.").email("Email is invalid."),
    password: z.string().min(8, "Password must be at least 8 characters long.")
});

export const modifyUserSchema = loginSchema;

export type ModifyUserForm = z.infer<typeof modifyUserSchema>;