import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/db/client";
import { CustomUser } from "next-auth";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

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
      session.user = token.user as CustomUser;
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
    CredentialsProvider({
      id: "temp",
      name: "temp",
      credentials: {},
      async authorize() {
        const randomString = Math.random().toString(36).slice(2);
        const tempUser = await prisma.user.create({
          data: {
            username: randomString,
            password: "temp",
            expiresAt: dayjs().add(10, "seconds").toDate(),
          },
        });
        return tempUser;
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      await prisma.accessLog.create({ data: { userId: user.id } });
      console.log({ user });
    },
    async signOut({ token }) {
      const user = token.user as CustomUser;
      await prisma.user.delete({ where: { id: user.id } });
    },
  },
};

export default NextAuth(authOptions);
