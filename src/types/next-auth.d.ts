import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface CustomUser extends DefaultSession["user"] {
    id: string;
    username: string;
    expiresAt?: Date;
  }

  interface Session {
    user?: CustomUser;
  }

  interface DefaultJWT {
    user?: CustomUser;
  }
}
