import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, LoginFormForSubmit } from "../types/form";
import { useLogin } from "@/api/generated/api";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { DecodedToken } from "../types/token";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginForm),
  });

  const { mutate } = useLogin({
    mutation: {
      onSuccess: (data) => {
        console.log("ログイン成功:", data);
        const { accessToken, expiresIn } = data;

        Cookies.set("accessToken", accessToken, {
          secure: true,
          sameSite: "lax",
          expires: expiresIn,
        });

        try {
          const decoded: DecodedToken = jwtDecode(accessToken);
          Cookies.set("role", decoded.role, {
            secure: true,
            sameSite: "lax",
            expires: 1,
          });
          if (decoded.role === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/user");
          }
        } catch (e) {
          console.error("トークンの解析に失敗しました:", e);
          setError("不正なトークンです");
        }
      },
      onError: (error) => {
        console.error("ログインに失敗しました:", error);
        setError("ログインに失敗しました");
      },
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutate({
      data: LoginFormForSubmit(data),
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          ログイン
        </h1>
        {error && (
          <p className="text-red-600 font-medium mb-4 text-center">{error}</p>
        )}

        <label className="block mb-2 text-gray-700 font-medium">
          メールアドレス <span className="text-red-500 text-sm">*</span>
        </label>
        <input
          type="email"
          placeholder="example@example.com"
          {...register("email", { required: "メールアドレスは必須です" })}
          className="border border-gray-400 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 text-gray-800 placeholder-gray-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
        )}

        <label className="block mb-2 text-gray-700 font-medium">
          パスワード <span className="text-red-500 text-sm">*</span>
        </label>
        <input
          type="password"
          placeholder="パスワードを入力"
          {...register("password", { required: "パスワードは必須です" })}
          className="border border-gray-400 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 text-gray-800 placeholder-gray-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded font-semibold hover:bg-blue-700 transition duration-200"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
