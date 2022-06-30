import {User} from "./user";
import {Subject} from "./subject";

export class Teacher {

  userDTO!: User
  professorOn?: Subject[]
  assistantOn?: Subject[]
}
