import { Types } from "mongoose";
import { BaseRepository } from "../base";
import { subjectList } from "./subject.list";
import { ISubject } from "./subject.model";
import SubjectSchema from "./subject.schema";

export class SubjectRepository extends BaseRepository<ISubject> {
    constructor() {
        super("Subject", SubjectSchema);
    }

    public async createManySubjects(): Promise<ISubject[]> {
        return this.createMany(subjectList);
    }

    public async getSubject(id: string): Promise<ISubject> {
        const object_id = Types.ObjectId(id);
        
        return await this.model.findOne(object_id);
    }

    public async findAllSubjects(): Promise<ISubject[]> {
        return this.get({ query: {} });
    }

    public async getAllScienceClassSubjects(): Promise<ISubject[]> {
        return this.model.find({
            $or: [{ class: "compulsory" }, { class: "pure_science" }]
        });
    }

    public async getAllSocialScienceClassSubjects(): Promise<ISubject[]> {
        return this.model.find({
            $or: [{ class: "compulsory" }, { class: "social_science" }]
        });
    }
}
