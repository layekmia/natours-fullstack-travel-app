import { z } from "zod";

// GeoJSON Point Schema
const geoPointSchema = z.object({
    type: z.literal("Point"),
    coordinates: z
        .tuple([z.number(), z.number()])
        .refine(
            ([lng, lat]) =>
                lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90,
            {
                message: "coordinates must be valid [lng, lat]",
            }
        ),
});
// Start Location
const startLocationSchema = geoPointSchema.extend({
    description: z
        .string()
        .min(1, "startLocation.description is required"),

    address: z
        .string()
        .min(1, "startLocation.address is required"),
});

// Location (tour stops)
const locationSchema = geoPointSchema.extend({
    description: z
        .string()
        .min(1, "locations.description is required"),

    day: z
        .number()
        .min(1, "locations.day must be >= 1"),
    address: z.string().min(1, "locations.address is required"),
});

// Main Tour Schema
export const tourSchema = z.object({
    name: z
        .string()
        .min(10, "name must be at least 10 characters")
        .max(40, "name must be at most 40 characters"),

    duration: z
        .number()
        .min(1, "duration must be >= 1"),

    maxGroupSize: z
        .number()
        .min(1, "maxGroupSize must be >= 1"),

    difficulty: z.enum(["easy", "medium", "difficult"]),

    ratingAverage: z
        .number()
        .min(1, "ratingAverage must be >= 1")
        .max(5, "ratingAverage must be <= 5")
        .optional(),

    ratingQuantity: z
        .number()
        .min(0, "ratingQuantity must be >= 0")
        .optional(),

    price: z
        .number()
        .min(0, "price must be >= 0"),
    priceDiscount: z.number().optional(),
    summary: z.string().optional(),

    description: z
        .string()
        .min(1, "description is required"),

    imageCover: z
        .string().optional(),

    images: z
        .array(z.string())
        .optional(),

    startDates: z
        .array(z.string().datetime("startDates must be valid ISO datetime")),

    startLocation: startLocationSchema,

    locations: z.array(locationSchema),

    guides: z
        .array(
            z.string().regex(/^[0-9a-fA-F]{24}$/, "invalid guide id")
        ),
}).refine((data) => {
    if (data.priceDiscount === null || data.priceDiscount === undefined) return true;
    return +data.priceDiscount < +data.price;
}, {
    message: "Price Discount must be less than price",
    path: ["priceDiscount"]
});

export type TourFormData = z.infer<typeof tourSchema>