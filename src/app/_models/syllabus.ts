import { Major } from "./major";

export class Syllabus {
  id!: number;
  yearOfCreation!: number;
  majorDTO: Major = new Major();
}
