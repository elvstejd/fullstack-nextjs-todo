// src/pages/api/examples.ts
import { validate } from "class-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuthentication } from "../../server/common/with-authentication";
import { prisma } from "../../server/db/client";
import { CreateTask } from "../../server/DTO/task";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const uid = req.headers.uid as string;

  switch (req.method) {
    case "GET":
      const tasks = await prisma.task.findMany({ where: { userId: uid } });
      res.status(200).json(tasks);
      break;

    case "POST":
      const task = new CreateTask(req.body);
      task.userId = uid;

      const errors = await validate(task);
      if (errors.length) return res.status(400).json(errors);

      const createdTask = await prisma.task.create({
        data: { title: task.title, userId: task.userId },
      });
      res.status(201).json(createdTask);
      break;

    default:
      res.status(405).end();
      break;
  }
};

export default withAuthentication(examples);
