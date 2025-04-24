import { z } from "zod";

export const commonCategorySchema = z.object({
  name: z.string().min(1, "Category Name is required."),
});

export const modifyCategorySchema = commonCategorySchema;

export type ModifyCategoryForm = z.infer<typeof modifyCategorySchema>;
