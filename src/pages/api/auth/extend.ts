// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { withAuthentication } from "../../../server/common/with-authentication";
import dayjs from "dayjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const uid = req.headers.uid as string;

  const user = await prisma.user.findUnique({ where: { id: uid } });

  await prisma.user.update({
    where: { id: uid },
    data: { expiresAt: dayjs(user.expiresAt).add(30, "minutes").toDate() },
  });

  res.status(200).json({ message: "User life extended" });
};

export default withAuthentication(handler);
