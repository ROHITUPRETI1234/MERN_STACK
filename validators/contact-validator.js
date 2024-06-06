const { z } = require("zod");

const contactValidationSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  message: z
    .string({ required_error: "Message is required" })
    .min(10, { message: "Message must be at least 10 characters" })
    .regex(/^(?!.*<script>).+$/i, {
      message: "Message contains invalid content",
    })
    .refine((msg) => msg.split("\n").length <= 7, {
      message: "Message is too big. write in short.",
    }),
});

module.exports = contactValidationSchema;
