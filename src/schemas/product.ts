import { z } from "zod";
import { commonCategorySchema } from "./category"; 

export const commonProductSchema = z.object({
  name: z.string().min(1, "Product Name is required."),
  price: z
  .string()
  .min(1, "Price is required")
  .refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number",
  }),

  category: commonCategorySchema, 
});

export const modifyProductSchema = commonProductSchema;

export type ModifyProductForm = z.infer<typeof modifyProductSchema>;
