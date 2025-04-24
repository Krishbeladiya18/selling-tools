import { z } from "zod";

export const createSaleSchema = z.object({
  saleDate: z.date(),
  customerName: z.string().min(1, "User Name is required."),
});

export type CreateSaleForm = z.infer<typeof createSaleSchema>;
