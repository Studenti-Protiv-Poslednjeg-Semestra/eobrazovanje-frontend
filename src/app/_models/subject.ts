import { Syllabus } from "./syllabus";

export class Subject {
  id!: number;
  code!: string;
  name!: string;
  semester!: number;
  description!: string;
  ects!: number;
  syllabusDTO: Syllabus = new Syllabus();
}
