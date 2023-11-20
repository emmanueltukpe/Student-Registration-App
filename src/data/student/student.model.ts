export enum Class {
    PURE_SCIENCE = "pure_science",
    SOCIAL_SCIENCE = "social_science",
}

// export enum Grade { 
//     A = "A",
//     B = "B",
//     C = "C",
//     D = "D",
//     E = "E",
//     F = "F",
// }

export interface IStudent {
    _id?: string;
    full_name?: string;
    email: string;
    password: string;
    registration_number: string;
    image?: string;
    age?: number;
    date_of_birth?: Date;
    class?: Class;
    subjects?: Array<string>;
    address?: string;
    next_of_kin?: string;
    grade?: string;
    is_suspended?: boolean;
}

export type CreateStudentDTO = IStudent;
