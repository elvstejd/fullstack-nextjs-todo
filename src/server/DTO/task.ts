import { IsOptional, Length } from "class-validator";

interface createTaskArgs {
  title: string;
  userId: string;
}

export class CreateTask {
  @Length(2, 30)
  title: string;
  userId: string;

  constructor(data: createTaskArgs) {
    this.title = data.title;
    this.userId = data.userId;
  }
}

interface updateTaskArgs {
  id: string;
  title?: string;
  userId: string;
  completed?: boolean;
}

export class UpdateTask {
  id: string;

  @IsOptional()
  @Length(2, 30)
  title: string;

  @IsOptional()
  completed: boolean;

  constructor(data: updateTaskArgs) {
    this.id = data.id;
    if (data.title) this.title = data.title;
    if (data.completed) this.completed = data.completed;
  }
}
