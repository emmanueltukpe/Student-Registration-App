import { SubjectRepository } from "./subject.repo";

const subjectRepo = new SubjectRepository();
const created = async () => await subjectRepo.createManySubjects();
console.log(created());
