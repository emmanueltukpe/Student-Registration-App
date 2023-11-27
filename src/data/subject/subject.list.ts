import { Class } from "../student";
import { ISubject } from "./subject.model";

export const subjectList: Array<ISubject> = [
    {
        subject_name: "Mathematics",
        subject_code: "MAT",
        class: Class.COMPLUSORY
    },
    {
        subject_name: "English",
        subject_code: "ENG",
        class: Class.COMPLUSORY
    },
    {
        subject_name: "Physics",
        subject_code: "PHS",
        class: Class.PURE_SCIENCE
    },
    {
        subject_name: "Chemistry",
        subject_code: "CHM",
        class: Class.PURE_SCIENCE
    },
    {
        subject_name: "Biology",
        subject_code: "BIO",
        class: Class.PURE_SCIENCE
    },
    {
        subject_name: "Futher Mathematics",
        subject_code: "FUM",
        class: Class.PURE_SCIENCE
    },
    {
        subject_name: "Argiculture",
        subject_code: "ARG",
        class: Class.PURE_SCIENCE
    },
    {
        subject_name: "Government",
        subject_code: "GOV",
        class: Class.SOCIAL_SCIENCE
    },
    {
        subject_name: "Literature",
        subject_code: "LIT",
        class: Class.SOCIAL_SCIENCE
    },
    {
        subject_name: "Commerce",
        subject_code: "LIT",
        class: Class.SOCIAL_SCIENCE
    },
    {
        subject_name: "Accounting",
        subject_code: "LIT",
        class: Class.SOCIAL_SCIENCE
    },
    {
        subject_name: "Economics",
        subject_code: "LIT",
        class: Class.SOCIAL_SCIENCE
    },
    {
        subject_name: "Civic Education",
        subject_code: "LIT",
        class: Class.COMPLUSORY
    }
];
