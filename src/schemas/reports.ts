import { z } from "zod";

export const ganrateReportSchema = z.object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
});

export type GanrateReport = z.infer<typeof ganrateReportSchema>;
