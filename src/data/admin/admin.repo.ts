import { BaseRepository } from "../base";
import { IAdmin } from "./admin.model";
import AdminSchema from "./admin.schema";

export class AdminRepository extends BaseRepository<IAdmin> {
    constructor() {
        super("admin", AdminSchema);
    }

    public async isEmailUsed(email: string): Promise<boolean> {
        const admin = await this.model.exists({ email: email });
        return admin;
    }
}
