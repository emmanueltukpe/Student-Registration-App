import { SubjectRepository } from "./subject.repo";

export class SubjectService {
    constructor(private readonly subjectRepository: SubjectRepository) {}

    public async getSubject(id: string) {
        return this.subjectRepository.getSubject(id);
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