import { Syllabus } from "./syllabus";

export class Subject {
  id!: number;
  name!: string;
  semester!: number;
  description!: string;
  ECTS!: number;
  syllabusDTO: Syllabus = new Syllabus();
}
