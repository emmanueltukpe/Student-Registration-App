import joi from "joi";

const optionalString = joi.string().trim();
const requiredString = optionalString.required();
const requiredEmail = requiredString.email();
const optionalNumber = joi.number().min(1).integer();
const requiredNumber = optionalNumber.required();

export const signup = joi.object({
    email: requiredEmail,
    password: requiredString.min(6)
});

export const otp = joi.object({
    code: joi.string().alphanum().min(6).max(6).required()
});

export const login = joi.object({
    email: requiredEmail,
    password: requiredString
});

export const completeRrgistration = joi.object({
    full_name: requiredString,
    age: requiredNumber,
    class: joi.string().valid("pure_science", "social_science").required(),
    address: requiredString,
    next_of_kin: requiredString
});

export const forgotpassword = joi.object({
    email: requiredEmail
});

export const resetpassword = joi.object({
    password: requiredString.min(6),
    code: joi.string().alphanum().min(6).max(6).required()
});

export const changepassword = joi.object({
    old_password: requiredString,
    new_password: requiredString.min(6)
});

export const updatestudent = joi.object({
    full_name: requiredString,
    age: requiredNumber,
    class: joi.string().valid("pure_science", "social_science").required(),
    address: requiredString,
    next_of_kin: requiredString
});

export const registeradmin = joi.object({
    email: requiredEmail,
    password: requiredString.min(6),
    name: requiredString,
    admin_secret: requiredString,
})

export const loginadmin = joi.object({
    email: requiredEmail,
    password: requiredString
});

export const updateadmin = joi.object({
    name: requiredString,
}) 