import { Request, Response } from "express";
import { StudentService } from "../../data/student/student.service";
import { BaseController } from "./base.controller";

export class StudentController {
    public async register(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.studentSignUp(req.body);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.login(req.body);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async verifyEmail(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.verifyOtp(req.body);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
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

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async forgotPassword(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const { email } = req.body;
            const data = await subjectRepo.forgotPassword(email);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async resetPassword(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.resetPassword(req.body);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async changePassword(req: Request, res: Response) {
        try {
            const studentId = req.user.id;
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.changePassword(req.body, studentId);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
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

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async getStudent(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.getStudent(req.params.id);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }
    public async getAllScienceStudents(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.getAllScienceStudents(req.query);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async suspendStudent(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.suspendStudent(req.params.id);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async removeSuspension(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.removeSuspension(req.params.id);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async expelStudent(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.expelStudent(req.params.id);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async getAllSocialScienceStudents(req: Request, res: Response) {
        try {
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.getAllSocialScienceStudents(req.query);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async subjectRegistration(req: Request, res: Response) {
        try {
            const studentId = req.user.id;
            const subjectRepo = StudentService.initialize();
            const data = await subjectRepo.subjectRegistration(studentId);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }
}
