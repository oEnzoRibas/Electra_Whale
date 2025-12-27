export class EmailValidationError extends Error{
    constructor(message: string) {
        super(message);
        this.name = "EmailValidationError";
    }
}

/**
 * Validates Email
 * @param email the email to be validated
 */

export function validateEmail(email: string): boolean{
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1){
        throw new EmailValidationError('Invalid email format.');
    }

    return true;
}
