import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import axios from "axios";

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
    onSuccess(_, variables) {
      signIn("credentials", {
        email: variables.username,
        ...variables,
        callbackUrl: `${window.location.origin}/`,
      });
    },
  });
}
