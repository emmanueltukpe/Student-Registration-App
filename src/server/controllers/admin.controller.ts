import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { AdminService } from "../../data/admin";

export class AdminController extends BaseController {
    public async signUp(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.adminSignUp(req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.adminLogin(req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async getAdmin(req: Request, res: Response) {
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.getAdmin(req.params.id);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async getAllAdmins(req: Request, res: Response) { 
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.getAllAdmins();

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async deleteAdmin(req: Request, res: Response) { 
        try {
            const adminRepo = AdminService.initialise();
            const data = await adminRepo.deleteAdmin(req.params.id);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        }
    }

    public async updateAdmin(req: Request, res: Response) { 
        try {
            const adminRepo = AdminService.initialise();
            req.user.id = req.params.id
            const data = await adminRepo.updateAdmin(req.params.id, req.body);

            this.handleSuccess(req, res, data);
        } catch (err) {
            this.handleError(req, res, err);
        } 
    
    }
}
