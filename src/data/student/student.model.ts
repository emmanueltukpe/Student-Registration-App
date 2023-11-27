import { ISubject } from "../subject/subject.model";

export enum Class {
    PURE_SCIENCE = "pure_science",
    SOCIAL_SCIENCE = "social_science",
    COMPLUSORY = "compulsory"
}

export interface IStudent {
    _id?: string;
    full_name?: string;
    email: string;
    password: string;
    registration_number?: string;
    image?: string;
    age?: number;
    date_of_birth?: Date;
    class?: Class;
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
    date_of_birth: Date;
    class: Class;
    address: string;
    next_of_kin: string;
}

export interface IChangePassword {
    old_password: string;
    new_password: string;
    confirm_password: string;
}


export interface IStudentResponse
    extends Omit<IStudent, "password" | "is_suspended"> {}

export interface IStudentUpdate
    extends Omit<
        IStudentRegristration,
        "class"
    > {}


export type CreateStudentDTO = IStudent;
