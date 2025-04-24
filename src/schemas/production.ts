
import { z } from "zod";

export const modifyProductionSchema = z.object({
  startDate: z.date(),
  date: z.date(),
});

export type ModifyProductionForm = z.infer<typeof modifyProductionSchema>;

export const addProductionProductSchema = z.object({
  quantity: z.string()
    .min(1, "Quantity is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a valid number",
    }),
});

export type AddProductionProductForm = z.infer<typeof addProductionProductSchema>;

export const completeProductionSchema = z.object({
  date: z.date(),
});

export type CompleteProductionForm = z.infer<typeof completeProductionSchema>;
