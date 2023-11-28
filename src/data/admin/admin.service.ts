import env from "../../common/config/env";
import {
    InvalidAdminCode,
    UserEmailExistsError,
    UserNotExistsError,
    WrongPasswordError
} from "../../common/errors";
import PasswordHash from "../../handlers/hash.password.handler";
import { jwtHandler } from "../../handlers/jwt.handler";
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO, IAdmin } from "./admin.model";
import { AdminRepository } from "./admin.repo";

export class AdminService {
    constructor(
        private readonly passwordHash: PasswordHash,
        private readonly adminrepository: AdminRepository
    ) {}

    public async adminSignUp(admin: AdminDTO) {
        const emailExists = await this.adminrepository.isEmailUsed(admin.email);

        if (emailExists) throw new UserEmailExistsError();
        if (
            admin.admin_secret !== env.adminSecret ||
            admin.admin_secret !== env.superAdminSecret
        )
            throw new InvalidAdminCode();
        const hashedPassword = await this.passwordHash.hashPassword(
            admin.password
        );
        admin.password = hashedPassword;
        if (admin.admin_secret && admin.admin_secret === env.adminSecret) {
            admin.role = "admin";
        } else {
            admin.role = "super_admin";
        }

        const adminCreated = await this.adminrepository.create(admin);
        const payload = {
            id: admin._id,
            role: admin.role
        };
        const token = jwtHandler.generateToken(payload, {
            expiresIn: env.expiresIn
        });
        return {
            admin: adminCreated,
            token: token
        };
    }

    public async adminLogin(admin: AdminLoginDTO) {
        const getAdmin = await this.adminrepository.byQuery({
            email: admin.email
        });
        if (!getAdmin) throw new UserNotExistsError();
        const isPasswordValid = await this.passwordHash.comparePasswords(
            admin.password,
            getAdmin.password
        );
        if (!isPasswordValid) throw new WrongPasswordError();
        const payload = {
            id: getAdmin._id,
            role: getAdmin.role
        };
        const token = jwtHandler.generateToken(payload, {
            expiresIn: env.expiresIn
        });
        return { admin: getAdmin, token: token };
    }

    public async deleteAdmin(id: string) {
        const admin = await this.adminrepository.destroy(id);
        return admin;
    }

    public async getAdmin(id: string) {
        const admin = await this.adminrepository.byID(id);
        return admin;
    }

    public async getAllAdmins() {
        const admins = await this.adminrepository.getPaged();
        return admins;
    }

    public async updateAdmin(id: string, admin: AdminUpdateDTO) {
        const updatedAdmin = await this.adminrepository.update(id, admin);
        return updatedAdmin;
    }

    public static initialise() {
        return new AdminService(new PasswordHash(), new AdminRepository());
    }
}
