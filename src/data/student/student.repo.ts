import { BaseRepository } from "../base";
import { CreateStudentDTO, IStudent, IStudentRegristration } from "./student.model";
import StudentSchema from "./student.schema";

export class StudentRepository extends BaseRepository<IStudent> {
    constructor() {
        super("Student", StudentSchema);
    }

    public async createStudent(student: CreateStudentDTO): Promise<IStudent> {
        return await this.create(student);
    }

    public async isEmailUsed(email: string): Promise<boolean> {
        const student = await this.model.exists({ email: email });
        return student;
    }

    public async generateRegistrationNumber(): Promise<string> {
        const generateRandomNineDigitNumber = Math.floor(
            100000000 + Math.random() * 900000000
        );
        const regExists = await this.byQuery({
            registration_number: generateRandomNineDigitNumber
        });
        if (regExists) return this.generateRegistrationNumber();
        return String(generateRandomNineDigitNumber);
    }

    public async studentRegistration(
        student: IStudentRegristration,
        studentId: string
    ): Promise<IStudent> {
        return this.update(studentId, student);
    }
}

export const StudentRepo = new StudentRepository();
