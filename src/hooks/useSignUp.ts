import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { showNotification } from "@mantine/notifications";
import { ZodError } from "zod";

interface args {
  username: string;
  password: string;
}

async function mutation(credentials: args) {
  const { data } = await axios.post("/api/auth/register", credentials);
  return data;
}

export function useSignUp() {
  return useMutation(mutation, {
    onError(axiosError: AxiosError) {
      const zodError = axiosError.response?.data as ZodError;
      const errors = zodError.issues;

      showNotification({
        color: "red",
        title: "Error",
        message: errors?.[0]?.message,
      });
    },
    onSuccess(_, variables) {
      signIn("credentials", {
        email: variables.username,
        ...variables,
        callbackUrl: `${window.location.origin}/`,
      });
    },
  });
}
