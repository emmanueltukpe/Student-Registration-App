import { StatusCodes } from "http-status-codes";

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
        this.code = StatusCodes.BAD_REQUEST;
    }
}

/**
 * Generic HTTP Not Found error
 * Sets the HTTP status code to 404 `Not Found` when a queried item is not found.
 */
export class NotFoundError extends ControllerError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

export class InvalidSecretKeyError extends ControllerError {
    constructor() {
        const errorMessage = `the secret key provided doesn't exist`;
        super(errorMessage);

        this.code = StatusCodes.UNAUTHORIZED;
        this.error_code = 702;
    }
}

export class MissingAuthHeaderError extends ControllerError {
    constructor() {
        const errorMessage = `authorization header not found`;
        super(errorMessage);

        this.code = StatusCodes.UNAUTHORIZED;
        this.error_code = 703;
    }
}

export class InvalidAuthSchemeError extends ControllerError {
    constructor() {
        const errorMessage = `invalid authentication scheme`;
        super(errorMessage);

        this.code = StatusCodes.UNAUTHORIZED;
        this.error_code = 704;
    }
}

export class UserEmailExistsError extends ControllerError {
    constructor() {
        const errorMessage = "This email already exists";
        super(errorMessage);

        this.code = StatusCodes.BAD_REQUEST;
        this.error_code = 301;
    }
}

export class UserNotExistsError extends ControllerError {
    constructor() {
        const errorMessage = "User does not exist";
        super(errorMessage);

        this.code = StatusCodes.BAD_REQUEST;
        this.error_code = 302;
    }
}

export class InvalidOtpError extends ControllerError {
    constructor() {
        const errorMessage = "Invalid OTP";
        super(errorMessage);

        this.code = StatusCodes.BAD_REQUEST;
        this.error_code = 303;
    }
}

// export class AccountNotExistsError extends ControllerError {
//   constructor() {
//     const errorMessage = 'Account does not exist';
//     super(errorMessage);

//     this.code = StatusCodes.BAD_REQUEST;
//     this.error_code = 302;
//   }
// }

// export class AccountExistsError extends ControllerError {
//   constructor() {
//     const errorMessage = 'User Already has an account';
//     super(errorMessage);

//     this.code = StatusCodes.BAD_REQUEST;
//     this.error_code = 301;
//   }
// }

export class WrongPasswordError extends ControllerError {
    constructor() {
        const errorMessage = "You have entered an incorrect password";
        super(errorMessage);

        this.code = StatusCodes.BAD_REQUEST;
        this.error_code = 304;
    }
}
