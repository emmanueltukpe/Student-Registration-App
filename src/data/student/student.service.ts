import env from "../../common/config/env";
import {
    InvalidOtpError,
    SuspendedError,
    UserEmailExistsError,
    UserNotExistsError,
    WrongPasswordError
} from "../../common/errors";
import { OtpRepository } from "../otp/otp.repo";
import { StudentRepository } from "./student.repo";
import PasswordHash from "../../handlers/hash.password.handler";
import EmailService, {
    EmailOptions
} from "../../server/services/email.service.handler";
import { jwtHandler } from "../../handlers/jwt.handler";
import {
    IChangePassword,
    IStudent,
    IStudentRegristration,
    IStudentResponse,
    IStudentUpdate
} from "./student.model";
import { IOtp, IResetPassword } from "../otp/otp.model";
import { PaginationQuery } from "../base";
import { SubjectRepository } from "../subject/subject.repo";

export class StudentService {
    constructor(
        private readonly studentrepository: StudentRepository,
        private readonly otpRepository: OtpRepository,
        private readonly hashPassword: PasswordHash,
        private readonly emailService: EmailService,
        private readonly subjectRepository: SubjectRepository
    ) {}

    public async studentSignUp(
        student: IStudent
    ): Promise<Record<string, string>> {
        const emailExists = await this.studentrepository.isEmailUsed(
            student.email
        );

        if (emailExists) throw new UserEmailExistsError();
        const hashedPassword = await this.hashPassword.hashPassword(
            student.password
        );
        const studentDetails = {
            email: student.email,
            password: hashedPassword
        };
        const otp = await this.otpRepository.createOtp(studentDetails);
        const emailDetails: EmailOptions = {
            to: student.email,
            from: env.email,
            subject: "OTP for registration",
            text: "The otp for registration is " + otp.code
        };
        this.emailService.sendEmail(emailDetails, otp.code);
        return { message: "OTP sent to your email" };
    }

    public async verifyOtp(verify: IOtp): Promise<Record<string, string>> {
        const otp = await this.otpRepository.findOtp(verify.code);
        if (!otp) {
            throw new InvalidOtpError();
        }
        const verifyOtp = await this.otpRepository.verifyOtp(
            otp.email,
            verify.code
        );
        const registrationNumber =
            await this.studentrepository.generateRegistrationNumber();
        const studentDetails = {
            email: verifyOtp.email,
            password: verifyOtp.password,
            registration_number: registrationNumber
        };
        const student = await this.studentrepository.createStudent(
            studentDetails
        );
        await this.otpRepository.deleteVerfiedOtp(verify.email, verify.code);
        const payload = { id: student._id };
        const token = jwtHandler.generateToken(payload, {
            expiresIn: env.expiresIn
        });
        return {
            message: "Sign up completed, kindly complete your registration",
            token: token
        };
    }

    public async completeRegistration(
        student: IStudentRegristration,
        studentId: string,
        imagePath: string
    ): Promise<IStudentResponse> {
        student.image = imagePath;
        const registration = await this.studentrepository.studentRegistration(
            student,
            studentId
        );
        return registration;
    }

    public async login(student: IStudent): Promise<Record<string, unknown>> {
        const getStudent = await this.studentrepository.byQuery({
            email: student.email
        });
        if (!getStudent) throw new UserNotExistsError();
        if (getStudent.is_suspended) throw new SuspendedError();

        const isPasswordValid = await this.hashPassword.comparePasswords(
            student.password,
            getStudent.password
        );
        if (!isPasswordValid) throw new WrongPasswordError();
        const payload = { id: getStudent._id };
        const token = jwtHandler.generateToken(payload, {
            expiresIn: env.expiresIn
        });
        return { student: getStudent, token: token };
    }

    public async forgotPassword(email: string) {
        const getStudent = await this.studentrepository.byQuery({
            email: email
        });
        if (!getStudent) throw new UserNotExistsError();
        const otp = await this.otpRepository.createOtp(getStudent);
        const emailDetails: EmailOptions = {
            to: email,
            from: env.email,
            subject: "Reset Password OTP",
            text: "Reset your password with this otp: " + otp.code
        };
        this.emailService.sendEmail(emailDetails, otp.code);
        return { message: "OTP sent to your email" };
    }

    public async resetPassword(verify: IResetPassword) {
        const otp = await this.otpRepository.findOtp(verify.code);
        if (!otp) {
            throw new InvalidOtpError();
        }
        await this.otpRepository.verifyOtp(otp.email, verify.code);
        const hashedPassword = await this.hashPassword.hashPassword(
            verify.password
        );
        await this.studentrepository.update(otp.email, {
            password: hashedPassword
        });
        await this.otpRepository.deleteVerfiedOtp(otp.email, verify.code);
        return {
            message:
                "Password updated successfully, kindly login with your new password"
        };
    }

    public async changePassword(changePassword: IChangePassword, id: string) {
        const getStudent = await this.getStudent(id);
        const isPasswordValid = await this.hashPassword.comparePasswords(
            changePassword.old_password,
            getStudent.password
        );
        if (!isPasswordValid) throw new WrongPasswordError();
        const hashedPassword = await this.hashPassword.hashPassword(
            changePassword.new_password
        );
        const updatedStudent = await this.studentrepository.update(
            { _id: id },
            { password: hashedPassword }
        );
        return updatedStudent;
    }

    public async updateStudent(
        student: IStudentUpdate,
        id: string,
        image: string
    ) {
        student.image = image;
        const updatedStudent = await this.studentrepository.update(
            { _id: id },
            student
        );
        return updatedStudent;
    }

    public async getStudent(id: string) {
        const student = await this.studentrepository.byID(id);
        if (!student) throw new UserNotExistsError();
        return student;
    }

    public async getAllScienceStudents() {
        const opts: PaginationQuery = {
            query: {
                class: "pure_science",
                is_suspended: false
            },
            per_page: 10
        };
        const student = await this.studentrepository.getPaged(opts);
        return student;
    }

    public async getAllSocialScienceStudents() {
        const opts: PaginationQuery = {
            query: {
                class: "social_science",
                is_suspended: false
            },
            per_page: 10
        };
        const student = await this.studentrepository.getPaged(opts);
        return student;
    }

    public async suspendStudent(id: string) {
        const student = await this.studentrepository.update(
            { _id: id },
            { is_suspended: true }
        );
        return student;
    }

    public async removeSuspension(id: string) {
        const student = await this.studentrepository.update(
            { _id: id },
            { is_suspended: false }
        );
        return student;
    }

    public async expelStudent(id: string) {
        const student = await this.studentrepository.destroy({ _id: id });
        return student;
    }

    public async subjectRegistration(id: string) {
        const student = await this.getStudent(id);
        const scienceSubjects =
            await this.subjectRepository.getAllScienceClassSubjects();
        const socialScienceSubjects =
            await this.subjectRepository.getAllSocialScienceClassSubjects();
        if (student.class === "pure_science") {
            return await this.studentrepository.update(
                { _id: id },
                { subjects: scienceSubjects }
            );
        } else {
            return await this.studentrepository.update(
                { _id: id },
                { subjects: socialScienceSubjects }
            );
        }
    }

    public static initialize(): StudentService {
        const studentRepository = new StudentRepository();
        const otpRepository = new OtpRepository();
        const hashPassword = new PasswordHash();
        const emailService = new EmailService();
        const subjectRepository = new SubjectRepository();

        return new StudentService(
            studentRepository,
            otpRepository,
            hashPassword,
            emailService,
            subjectRepository
        );
    }
}
