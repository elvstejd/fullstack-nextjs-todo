import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <form
        onSubmit={handleSubmit((data) =>
          signIn("credentials", {
            email: data.username,
            ...data,
            callbackUrl: `${window.location.origin}/`,
          })
        )}
      >
        <input {...register("username")} placeholder="username" />
        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
