import { BaseRepository } from "../base";
import { CreateOtpDTO, IOtp } from "./otp.model";
import OtpSchema from "./otp.schema";

export class OtpRepository extends BaseRepository<IOtp> {
    constructor() {
        super("otp", OtpSchema);
    }

    public async createOtp(otp: CreateOtpDTO): Promise<IOtp> {
        otp.code = this.generateOtpCode();
        return this.create(otp);
    }

    public async findOtp(code: string): Promise<IOtp> {
        return this.byQuery({ code: code });
    }

    public async verifyOtp(email: string, code: string): Promise<IOtp> {
        return this.update({ email: email, code: code }, { is_verified: true });
    }

    public async deleteVerfiedOtp(email: string) {
        return await this.destroyMany({ email: email });
    }

    private generateOtpCode(): string {
        const codeASNumber = Math.floor(100000 + Math.random() * 900000);
        return String(codeASNumber);
    }
}
