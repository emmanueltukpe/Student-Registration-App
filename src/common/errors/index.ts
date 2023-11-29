import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "http-status-codes";

export class ControllerError extends Error {
    code: number;
    error_code: number;
    constructor(message: string, code?: number, error_code?: number) {
        super(message);
        this.code = code || 400;
        this.error_code = error_code || 0; // special error codes which clients can read and react to.
    }
}

/**
 * Generic HTTP Bad Request Error
 * Sets the HTTP status code to 400 `Bad Request` when request is not properly formatted.
 */
export class ActionNotAllowedError extends ControllerError {
    constructor(message: string) {
        super(message);
        this.code = BAD_REQUEST;
    }
}

/**
 * Generic HTTP Not Found error
 * Sets the HTTP status code to 404 `Not Found` when a queried item is not found.
 */
export class NotFoundError extends ControllerError {
    constructor(message: string) {
        super(message, NOT_FOUND);
    }
}

export class InvalidSecretKeyError extends ControllerError {
    constructor() {
        const errorMessage = `the secret key provided doesn't exist`;
        super(errorMessage);

        this.code = UNAUTHORIZED;
        this.error_code = 702;
    }
}

export class MissingAuthHeaderError extends ControllerError {
    constructor() {
        const errorMessage = `authorization header not found`;
        super(errorMessage);

        this.code = UNAUTHORIZED;
        this.error_code = 703;
    }
}

export class InvalidAuthSchemeError extends ControllerError {
    constructor() {
        const errorMessage = `invalid authentication scheme`;
        super(errorMessage);

        this.code = UNAUTHORIZED;
        this.error_code = 704;
    }
}

export class UserEmailExistsError extends ControllerError {
    constructor() {
        const errorMessage = "This email already exists";
        super(errorMessage);

        this.code = BAD_REQUEST;
        this.error_code = 301;
    }
}

export class UserNotExistsError extends ControllerError {
    constructor() {
        const errorMessage = "User does not exist";
        super(errorMessage);

        this.code = BAD_REQUEST;
        this.error_code = 302;
    }
}

export class SubjectNotExistsError extends ControllerError {
    constructor() {
        const errorMessage = "Subject does not exist";
        super(errorMessage);

        this.code = BAD_REQUEST;
        this.error_code = 401;
    }
}

export class InvalidOtpError extends ControllerError {
    constructor() {
        const errorMessage = "Invalid OTP";
        super(errorMessage);

        this.code = BAD_REQUEST;
        this.error_code = 303;
    }
}

export class WrongPasswordError extends ControllerError {
    constructor() {
        const errorMessage = "You have entered an incorrect password";
        super(errorMessage);

        this.code = BAD_REQUEST;
        this.error_code = 304;
    }
}

export class SuspendedError extends ControllerError {
    constructor() {
        const errorMessage =
            "You cannot login to your account, you have been suspended, kindly follow due protocol for your teacher to remove your suspension";
        super(errorMessage);

        this.code = UNAUTHORIZED;
        this.error_code = 305;
    }
}

export class InvalidAdminCode extends ControllerError {
    constructor() {
        const errorMessage = "You cannot create an admin withouta valid admin code";
        super(errorMessage);

        this.code = FORBIDDEN;
        this.error_code = 306;
    }
}

export class ForbiddenError extends ControllerError {
    constructor() {
        const errorMessage = "You are not allowed to perform this action, only authorized personnels can access this";
        super(errorMessage);

        this.code = FORBIDDEN;
        this.error_code = 307;
    }
}

export class EmailServiceError extends ControllerError {
    constructor(cause?: string) {
        const errorMessage = "Our email service has encountered an error";
        super(errorMessage);

        this.code = FORBIDDEN;
        this.error_code = 307;
        this.cause = cause
    }
}