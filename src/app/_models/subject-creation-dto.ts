export class SubjectCreationDto {
  code!: string;
  name!: string;
  semester!: number;
  description!: string;
  ects!: number;
  syllabusId!: number;
  responsibilityDefinitions: String[] = [];
}
