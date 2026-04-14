import z from "zod";

export const reviewSchema = z.object({
    review: z
        .string()
        .min(5, "Review must be at least 5 characters")
        .max(500, "Review too long"),
    rating: z.number().min(1, "Please select a rating").max(5),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;