import { Length } from "class-validator";

interface arguments {
  username: string;
  password: string;
}

export class Register {
  @Length(3, 12)
  username: string;

  @Length(5, 20)
  password: string;

  constructor(credentials: arguments) {
    this.username = credentials.username;
    this.password = credentials.password;
  }
}
