import { z } from "zod";
export const UserView = z.object({
  id: z.string(),
  name: z.string(),
  prefecture: z.string(),
  city: z.string(),
  gender: z.string(),
  birthday: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UserView = z.infer<typeof UserView>;
