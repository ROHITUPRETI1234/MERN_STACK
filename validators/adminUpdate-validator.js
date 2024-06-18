const { z } = require("zod");

const adminUpdateSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" })
    .regex(/^(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>).+$/i, {
      message: "Name contains invalid content",
    })
    .refine(
      (username) =>
        !/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|mp4|mp3|avi|mov|zip|rar|exe|bat|sh|js|html)$/i.test(
          username
        ),
      {
        message: "Name must not contain file links or extensions",
      }
    )
    .refine((username) => !/(https?:\/\/[^\s]+)/g.test(username), {
      message: "Name must not contain URLs",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" })
    .regex(/^(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>).+$/i, {
      message: "Email contains invalid content",
    })
    .refine(
      (email) =>
        !/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|mp4|mp3|avi|mov|zip|rar|exe|bat|sh|js|html)$/i.test(
          email
        ),
      {
        message: "Email must not contain file links or extensions",
      }
    )
    .refine((email) => !/(https?:\/\/[^\s]+)/g.test(email), {
      message: "Email must not contain URLs",
    }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" })
    .regex(/^(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>).+$/i, {
      message: "Phone contains invalid content",
    })
    .refine(
      (phone) =>
        !/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|mp4|mp3|avi|mov|zip|rar|exe|bat|sh|js|html)$/i.test(
          phone
        ),
      {
        message: "Phone must not contain file links or extensions",
      }
    )
    .refine((phone) => !/(https?:\/\/[^\s]+)/g.test(phone), {
      message: "Phone must not contain URLs",
    }),
});

module.exports = { adminUpdateSchema };
