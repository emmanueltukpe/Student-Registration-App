import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { SubjectService } from "../../data/subject/subject.service";

export class SubjectController extends BaseController {
    public async getSubject(req: Request, res: Response) {
        try {
            const subjectRepo = SubjectService.initialize();
            const data = await subjectRepo.getSubject(req.params.id);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async getAllSubjects(req: Request, res: Response) {
        try {
            const subjectRepo = SubjectService.initialize();
            const data = await subjectRepo.findAllSubjects();

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async getAllScienceClassSubjects(req: Request, res: Response) {
        try {
            const subjectRepo = SubjectService.initialize();
            const data = await subjectRepo.getAllScienceClassSubjects();

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async getAllSocialScienceClassSubjects(req: Request, res: Response) {
        try {
            const subjectRepo = SubjectService.initialize();
            const data = await subjectRepo.getAllSocialScienceClassSubjects();

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }
}
