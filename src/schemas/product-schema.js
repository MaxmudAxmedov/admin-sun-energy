import z, { file } from "zod";

export const ProductSchema = z.object({
  name: z.coerce
    .string()
    .min(2, "Product name is too short")
    .max(20, "Product name is too long"),
  count: z.coerce
    .number()
    .int("Count must be an integer")
    .min(1, "At least 1 item is required"),
  landing: z.coerce.boolean().default(false),
  img: z
    .instanceof(File)
    .refine((file) => file.size <= 2_000_000, "File size must be less than 2MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, or WebP images are allowed"
    )
    .optional(),
  watt: z.string().regex(/^\d+(W|w)$/, "Watt must be like '100W' or '50w'"),
  price: z.coerce.number().positive("Price must be great then 0"),
  mark: z.coerce
    .number()
    .min(0, "Mark cannot be negative")
    .max(100, "Mark cannot exceed 100"),
});
