import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/db/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user as { id: string };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUniqueOrThrow({
          where: { username: credentials?.username },
        });
        console.log(user);

        if (
          credentials?.password &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            username: user.username,
          };
        }
        return null;
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      await prisma.accessLog.create({ data: { userId: user.id } });
      console.log({ user });
    },
  },
};

export default NextAuth(authOptions);
