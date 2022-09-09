// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { Register } from "../../../server/DTO/register";
import { validate } from "class-validator";
import bcrypt from "bcrypt";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const credentials = new Register(req.body);
  const errors = await validate(credentials);
  if (errors.length) return res.status(400).json(errors);

  const hashedPassword = await bcrypt.hash(credentials.password, 10);

  await prisma.user.create({
    data: {
      username: credentials.username,
      password: hashedPassword,
    },
  });

  res.status(200).json({ message: "User created" });
};

export default register;
