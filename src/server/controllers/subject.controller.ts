import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { SubjectService } from "../../data/subject/subject.service";

export class SubjectController {
    public async getSubject(req: Request, res: Response) {
        try {
            const subjectRepo = SubjectService.initialize();
            const data = await subjectRepo.getSubject(req.params.id);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async getAllSubjects(req: Request, res: Response) {
        try {
            const subjectRepo = SubjectService.initialize();
            const data = await subjectRepo.findAllSubjects();

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async getAllScienceClassSubjects(req: Request, res: Response) {
        try {
            const subjectRepo = SubjectService.initialize();
            const data = await subjectRepo.getAllScienceClassSubjects();

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async getAllSocialScienceClassSubjects(req: Request, res: Response) {
        try {
            const subjectRepo = SubjectService.initialize();
            const data = await subjectRepo.getAllSocialScienceClassSubjects();

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }
}
