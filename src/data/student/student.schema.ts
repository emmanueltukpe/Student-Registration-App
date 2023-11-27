import {
    SchemaFactory,
    trimmedRequiredString,
    number,
    trimmedRequiredLowercaseString,
    trimmedString,
    date,
    requiredBoolean,
    array
} from "../base";
import SubjectSchema from "../subject/subject.schema";
import { IStudent } from "./student.model";

const StudentSchema = SchemaFactory<IStudent>({
    full_name: { ...trimmedString },
    email: { ...trimmedRequiredLowercaseString },
    password: { ...trimmedRequiredString },
    address: { ...trimmedString },
    registration_number: { ...trimmedRequiredString },
    next_of_kin: { ...trimmedString },
    image: { ...trimmedString },
    age: { ...number },
    class: { ...trimmedString },
    date_of_birth: { ...date },
    grade: { ...trimmedString },
    is_suspended: { ...requiredBoolean, default: false },
    subjects: [SubjectSchema]
});

export default StudentSchema;
