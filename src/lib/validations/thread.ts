import { z } from "zod";

export const ThreadValidationSchema = z.object({
  thread: z.string().min(3, { message: '输入内容请尽量不少于3个字符' }).max(1000),
  accountId: z.string().nonempty()
})

export const ThreadCommentValidationSchema = z.object({
  thread: z.string().min(3, { message: '输入内容请尽量不少于3个字符' }).max(1000)
})