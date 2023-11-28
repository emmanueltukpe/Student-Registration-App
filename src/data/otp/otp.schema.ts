import {
    trimmedRequiredLowercaseString,
    trimmedRequiredString,
    requiredBoolean,
    trimmedString
} from "./../base/utils/schema.utils";
import { SchemaFactory } from "../base";
import { IOtp } from "./otp.model";

const OtpSchema = SchemaFactory<IOtp>({
    email: { ...trimmedRequiredLowercaseString },
    password: { ...trimmedString },
    code: { ...trimmedRequiredString },
    is_verified: { ...requiredBoolean, default: false },
});

export default OtpSchema;
