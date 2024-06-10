const { z } = require("zod");

const contactValidationSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" })
    .regex(/^(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>).+$/i, {
      message: "Name contains invalid content",
    })
    .refine(
      (name) =>
        !/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|mp4|mp3|avi|mov|zip|rar|exe|bat|sh|js|html)$/i.test(
          name
        ),
      {
        message: "Name must not contain file links or extensions",
      }
    )
    .refine((name) => !/(https?:\/\/[^\s]+)/g.test(name), {
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
  message: z
    .string({ required_error: "Message is required" })
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message is too big. write in short." })
    .regex(/^(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>).+$/i, {
      message: "Message contains invalid content",
    })
    .refine(
      (msg) =>
        !/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|mp4|mp3|avi|mov|zip|rar|exe|bat|sh|js|html)$/i.test(
          msg
        ),
      {
        message: "Message must not contain file links or extensions",
      }
    )
    .refine((msg) => !/(https?:\/\/[^\s]+)/g.test(msg), {
      message: "Message must not contain URLs",
    })
    .refine((msg) => msg.split("\n").length <= 5, {
      message: "Message is too big. write in short.",
    }),
});

module.exports = contactValidationSchema;
