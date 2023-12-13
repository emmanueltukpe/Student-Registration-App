import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { AdminService } from "../../data/admin";

export class AdminController {
    public async signUp(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.adminSignUp(req.body);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.adminLogin(req.body);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async getAdmin(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.getAdmin(req.params.id);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async getAllAdmins(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.getAllAdmins(req.query);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async deleteAdmin(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.deleteAdmin(req.params.id);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }

    public async updateAdmin(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            req.params.id = req.user.id;
            const data = await adminRepo.updateAdmin(req.params.id, req.body);

            BaseController.handleSuccess(req, res, data);
        } catch (err) {
            BaseController.handleError(req, res, err);
        }
    }
}
