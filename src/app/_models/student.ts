import { Major } from "./major";
import { User } from "./user";

export class Student {
  id!: number;
  userDTO: User = new User();
  funds!: number;
  semester!: number;
  majorDTO: Major = new Major();
}
