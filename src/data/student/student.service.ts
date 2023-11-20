import jwt from "jsonwebtoken";
import env from "../../common/config/env";
import { InvalidOtpError, UserEmailExistsError } from "../../common/errors";
import { OtpRepository } from "../otp/otp.repo";
import { CreateStudentDTO, IStudent } from "./student.model";
import { StudentRepository } from "./student.repo";

class StudentService {
    constructor(
        private readonly studentrepository: StudentRepository,
        private readonly otpRepository: OtpRepository
    ) {}

    public async studentSignUp(email: string, password: string) {
        /**
         * student enters their email and password
         * if email exists then throw an error
         * do bycrypt for password
         * an otp is created storing the email and password and generating a code
         * the code is sent to the student's email
         * the output is a message stating the code was sent to the student's email and a token is created having the email address
         */
        const emailExists = this.studentrepository.isEmailUsed(email);
        if (emailExists) throw new UserEmailExistsError();
        
    }

    public async verifyOtp(email: string, code: string): Promise<Record<string, string>> {
        /**
         * student gets the email with the code
         * we query the otp db for the email and the code
         * if the otp is found it is verified
         * we generate a registration number and create a student with the email and password
         * we delete the otp and create a new token
         * if the otp is not found, we return an error message
         */
        const otp = await this.otpRepository.findOtp(email, code);
        if (!otp) {
            throw new InvalidOtpError();
        }
        const verifyOtp = await this.otpRepository.verifyOtp(email, code);
        const registrationNumber =
            await this.studentrepository.generateRegistrationNumber();
        const studentDetails = {
            email: verifyOtp.email,
            password: verifyOtp.password,
            registration_number: registrationNumber
        };
        const student = await this.studentrepository.createStudent(studentDetails);
        await this.otpRepository.deleteVerfiedOtp(email, code);
        const token = jwt.sign({ id: student._id }, env.jwt_secret, {
            expiresIn: env.expiresIn
        });
        return {message: "Sign up completed, kindly complete your registration", token: token}
    }
}
