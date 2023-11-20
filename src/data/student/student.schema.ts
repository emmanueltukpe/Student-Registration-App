import {
    SchemaFactory,
    trimmedRequiredString,
    number,
    trimmedRequiredLowercaseString,
    trimmedString,
    date,
    requiredBoolean
} from "../base";
import { IStudent } from "./student.model";

const StudentSchema = SchemaFactory<IStudent>({
    full_name: { ...trimmedRequiredString },
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
    subjects: [
        {
            ...trimmedString,
            ref: "Subject"
        }
    ]
});

export default StudentSchema;
