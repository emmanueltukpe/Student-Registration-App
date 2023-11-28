import { Types } from "mongoose";

export interface ISubject {
    _id?: Types.ObjectId;
    subject_name: string;
    subject_code: string;
    class: string;
}