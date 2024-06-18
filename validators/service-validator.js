const { z } = require("zod");

const serviceSchema = z.object({
  provider: z
    .string()
    .min(3, { message: "Provider must be at least 3 characters long" })
    .max(20, { message: "Provider must be at most 20 characters long" }),

  service: z
    .string()
    .min(3, { message: "Service must be at least 3 characters long" })
    .max(20, { message: "Service must be at most 20 characters long" }),

  price: z
    .string()
    .min(1, { message: "Price must be at least 1 character long" })
    .max(10, { message: "Price must be at most 10 characters long" }),

  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" })
    .max(250, { message: "Description must be at most 250 characters long" }),

  imageUrl: z
    .string()
    .refine((url) => url.startsWith("http") || url.startsWith("https"), {
      message: "Image URL must start with http or https",
    }),
});

module.exports = { serviceSchema };
