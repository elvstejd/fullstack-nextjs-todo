import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { registerSchema } from "../../../server/DTO/register";
import bcrypt from "bcrypt";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const credentials = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    await prisma.user.create({
      data: {
        username: credentials.username,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "User created" });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json(err);
    res.status(500).end();
  }
};

export default handler;
