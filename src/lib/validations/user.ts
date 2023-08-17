import * as z from "zod"

export const UserValidationSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少为2个字符。",
  }).max(20),
  name: z.string().min(2).max(20),
  bio: z.string().min(3).max(1000),
  profile_photo: z.string().url().nonempty()
})


