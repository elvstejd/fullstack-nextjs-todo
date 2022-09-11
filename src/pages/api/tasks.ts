import { validate } from "class-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuthentication } from "../../server/common/with-authentication";
import { prisma } from "../../server/db/client";
import { CreateTask, DeleteTask, UpdateTask } from "../../server/DTO/task";

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
      const postTask = new CreateTask(req.body);
      postTask.userId = uid;

      const postErrors = await validate(postTask);
      if (postErrors.length) return res.status(400).json(postErrors);

      const createdTask = await prisma.task.create({
        data: { title: postTask.title, userId: postTask.userId },
      });
      res.status(201).json(createdTask);
      break;

    case "PATCH":
      const patchTask = new UpdateTask(req.body);

      const patchErrors = await validate(patchTask);
      if (patchErrors.length) return res.status(400).json(patchErrors);

      const updatedTask = await prisma.task.update({
        where: { id: patchTask.id },
        data: patchTask,
      });

      res.status(200).json(updatedTask);
      break;

    case "DELETE":
      const deleteTask = new DeleteTask(req.body);
      console.log(deleteTask);
      const deletedTask = await prisma.task.delete({ where: deleteTask });
      res.status(204).json(deletedTask);
      break;

    default:
      res.status(405).end();
      break;
  }
};

export default withAuthentication(handler);
