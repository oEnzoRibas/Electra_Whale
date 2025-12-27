export class PasswordValidationError extends Error{
    constructor(message: string) {
        super(message);
        this.name = "PasswordValidationError";
    }
}

/**
 * Validates Password
 * @param password the password to be validated
 */

export function validatePassword(password: string): boolean{
    if (password.length < 8){
        throw new PasswordValidationError('Password must be at least 8 characters.')
    }

    if (!/[A-Z]/.test(password)) {
        throw new PasswordValidationError('Password must contain at least one uppercase letter.');
    }

    if (!/[0-9]/.test(password)) {
        throw new PasswordValidationError('Password must contain at least one number.')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new PasswordValidationError('Password must contain at least one special character.');
    }

    return true;
}
