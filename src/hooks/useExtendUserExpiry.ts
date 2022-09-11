import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

export function useExtendUserExpiry() {
  const { data: session } = useSession();

  return useMutation(
    async () => {
      const { data } = await axios.get("/api/auth/extend");
      return data;
    },
    { onSuccess: () => signIn("temp-extend", { id: session?.user?.id }) }
  );
}
