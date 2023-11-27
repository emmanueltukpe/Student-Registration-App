import { trimmedRequiredString } from './../base/utils/schema.utils';
import { SchemaFactory } from "../base";
import { ISubject } from "./subject.model";

const SubjectSchema = SchemaFactory<ISubject>({
    subject_name: { ...trimmedRequiredString },
    class: { ...trimmedRequiredString },
    subject_code: { ...trimmedRequiredString },
})

export default SubjectSchema;