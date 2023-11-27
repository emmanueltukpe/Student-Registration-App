import { Request, Response } from "express";
import { StudentService } from "../../data/student/student.service";
import { BaseController } from "./base.controller";

export class StudentController extends BaseController {
    public async register(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.studentSignUp(req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.login(req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async verifyEmail(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.verifyOtp(req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async completeRegistration(req: Request, res: Response) {
        try {
            const studentId = req.user.id;
            const image = req.imagePath;

            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.completeRegistration(
                req.body,
                studentId,
                image
            );

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async forgotPassword(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.forgotPassword(req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async resetPassword(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.resetPassword(req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async changePassword(req: Request, res: Response) {
        try {
            const studentId = req.user.id;
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.changePassword(req.body, studentId);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async updateStudent(req: Request, res: Response) {
        try {
            const image = req.imagePath;
            req.params.id = req.user.id;
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.updateStudent(
                req.body,
                req.params.id,
                image
            );

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async getStudent(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.getStudent(req.params.id);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }
    public async getAllScienceStudents(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.getAllScienceStudents();

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async getAllSocialScienceStudents(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.getAllSocialScienceStudents();

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async subjectRegistration(req: Request, res: Response) { 
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.subjectRegistration(req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }
}
