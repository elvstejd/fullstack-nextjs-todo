import type { NextApiRequest, NextApiResponse } from "next";
import { withAuthentication } from "../../server/common/with-authentication";
import { prisma } from "../../server/db/client";
import {
  createTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
} from "../../server/DTO/task";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const uid = req.headers.uid as string;

  switch (req.method) {
    case "GET":
      const tasks = await prisma.task.findMany({
        where: { userId: uid },
        orderBy: { createdAt: "asc" },
      });
      res.status(200).json(tasks);
      break;

    case "POST":
      try {
        const postTask = createTaskSchema.parse({ ...req.body, userId: uid });
        const createdTask = await prisma.task.create({
          data: { title: postTask.title, userId: postTask.userId },
        });

        res.status(201).json(createdTask);
      } catch (e) {
        res.status(400).json(e);
      }

      break;

    case "PATCH":
      try {
        const patchTask = updateTaskSchema.parse({ ...req.body, userId: uid });
        const updatedTask = await prisma.task.update({
          where: { id: patchTask.id },
          data: patchTask,
        });

        res.status(200).json(updatedTask);
      } catch (e) {
        res.status(400).json(e);
      }
      break;

    case "DELETE":
      try {
        const deleteTask = deleteTaskSchema.parse({ ...req.body, userId: uid });
        const deletedTask = await prisma.task.delete({ where: deleteTask });

        res.status(200).json(deletedTask);
      } catch (e) {
        res.status(400).json(e);
      }

      break;

    default:
      res.status(405).end();
      break;
  }
};

export default withAuthentication(handler);
