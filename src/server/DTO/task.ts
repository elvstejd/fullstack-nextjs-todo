import { Length } from "class-validator";

interface arguments {
  title: string;
  userId: string;
}

export class CreateTask {
  @Length(2, 30)
  title: string;
  userId: string;

  constructor(data: arguments) {
    this.title = data.title;
    this.userId = data.userId;
  }
}
