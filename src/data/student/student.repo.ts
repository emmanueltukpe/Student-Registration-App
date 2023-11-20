import { UserEmailExistsError } from "../../common/errors";
import { BaseRepository } from "../base";
import { CreateStudentDTO, IStudent } from "./student.model";
import StudentSchema from "./student.schema";

export class StudentRepository extends BaseRepository<IStudent> {
    constructor() {
        super("Student", StudentSchema);
    }
    
    public async createStudent(student: CreateStudentDTO): Promise<IStudent> { 
        return this.create(student);
    }


    public async isEmailUsed(email: string) {
        const student = await this.model.exists({ email: email });
        if (student) throw new UserEmailExistsError();
    }

    public async generateRegistrationNumber(): Promise<string> { 
        const generateRandomNineDigitNumber = Math.floor(
            100000000 + Math.random() * 900000000
        );
        const regExists = await this.byQuery({ registration_number: generateRandomNineDigitNumber })
        if (regExists) return this.generateRegistrationNumber();
        return String(generateRandomNineDigitNumber);
    }
}

export const StudentRepo = new StudentRepository();
