import { z } from "zod";
export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().nonnegative(),
  discountPrice: z.coerce.number().nonnegative().nullable().optional(),
  imageUrl: z.string().url(),
  categoryId: z.string().min(1),
  stock: z.coerce.number().int().nonnegative(),
  badge: z.string().nullable().optional(),
  isBestSeller: z.boolean(),
  isPublished: z.boolean(),
});
