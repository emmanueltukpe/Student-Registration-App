import {
    SchemaFactory,
    trimmedRequiredLowercaseString,
    trimmedRequiredString
} from "../base";
import { IAdmin } from "./admin.model";

const AdminSchema = SchemaFactory<IAdmin>({
    name: { ...trimmedRequiredString },
    email: { ...trimmedRequiredLowercaseString },
    password: { ...trimmedRequiredString },
    role: { ...trimmedRequiredString, default: "admin" }
});

export default AdminSchema;