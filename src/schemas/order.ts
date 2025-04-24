import { z } from "zod";

export const addOrderProductSchema = z.object({
  quantity: z.string()
  .min(1, "Quantity is required"),
  price: z
  .string()
  .min(1, "Price is required")
  .refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number",
  }),
});

export type AddOrderProductForm = z.infer<typeof addOrderProductSchema>;
