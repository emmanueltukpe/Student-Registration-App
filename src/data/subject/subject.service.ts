import { SubjectNotExistsError } from "../../common/errors";
import { SubjectRepository } from "./subject.repo";

export class SubjectService {
    constructor(private readonly subjectRepository: SubjectRepository) {}

    public async getSubject(id: string) {
        const subject = await this.subjectRepository.getSubject(id);
        if (!subject) throw new SubjectNotExistsError();
        return subject;
    }

    public async findAllSubjects() {
        return this.subjectRepository.findAllSubjects();
    }

    public async getAllScienceClassSubjects() {
        return this.subjectRepository.getAllScienceClassSubjects();
    }

    public async getAllSocialScienceClassSubjects() { 
        return this.subjectRepository.getAllSocialScienceClassSubjects();
    }

    public static initialize(): SubjectService { 
        return new SubjectService(new SubjectRepository()); 
    }
}