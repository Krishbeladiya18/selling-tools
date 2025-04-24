import { z } from "zod";

export const createTransferSchema = z.object({
    transferDate: z.date(),
});

export type CreateTransferForm = z.infer<typeof createTransferSchema>;
