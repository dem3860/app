import { LoginBody } from "@/api/generated/schemas";
import { z } from "zod";

export const LoginForm = z.object({
  email: z.string().email(),
  password: z.string().min(1, "パスワードは必須です"),
});

export type LoginForm = z.infer<typeof LoginForm>;

export const LoginFormForSubmit = (input: LoginForm): LoginBody => {
  return {
    email: input.email,
    password: input.password,
  };
};
