import {
    trimmedRequiredLowercaseString,
    trimmedRequiredString,
    requiredBoolean
} from "./../base/utils/schema.utils";
import { SchemaFactory } from "../base";
import { IOtp } from "./otp.model";

const OtpSchema = SchemaFactory<IOtp>({
    email: { ...trimmedRequiredLowercaseString },
    password: { ...trimmedRequiredString },
    code: { ...trimmedRequiredString },
    is_verified: { ...requiredBoolean, default: false },
});

export default OtpSchema;
