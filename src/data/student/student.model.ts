import { ISubject } from "../subject/subject.model";

export interface IStudent {
    _id?: string;
    full_name?: string;
    email: string;
    password: string;
    registration_number?: string;
    image?: string;
    age?: number;
    class?: "pure_science" | "social_science";
    subjects?: Array<ISubject>;
    address?: string;
    next_of_kin?: string;
    grade?: string;
    is_suspended?: boolean;
}
export interface IStudentRegristration {
    image: string;
    full_name: string;
    age: number;
    class: "pure_science" | "social_science";
    address: string;
    next_of_kin: string;
}

export interface IChangePassword {
    old_password: string;
    new_password: string;
}


export interface IStudentResponse
    extends Omit<IStudent, "password" | "is_suspended"> {}

export interface IStudentUpdate
    extends Omit<
        IStudentRegristration,
        "class"
    > {}


export type CreateStudentDTO = IStudent;
