import { AppError } from "./appErrors.js";

export class UserNotFoundError extends AppError {
    constructor(){
        super(
            'User Not Found',
            404,
            'USER_NOT_FOUND'
        );
    }
}

export class InvalidCredentialsError extends AppError {
    constructor(){
        super(
            'Invalid Credentials',
            401,
            'INVALID_CREDENTIALS'
        );
    }
}

export class PasswordPolicyError extends AppError {
  constructor(message: string) {
    super(
      message || 'Password does not meet policy requirements',
      400,
      'INVALID_PASSWORD'
    );
  }
}

export class EmailPolicyError extends AppError {
    constructor(message: string) {
        super(
            message || 'Email does not meet policy requirements',
            400,
            'INVALID_EMAIL'
        );
    }
}

export class UnauthorizedError extends AppError {
    constructor(){
        super(
            'Unauthorized Access',
            401,
            'UNAUTHORIZED_ACCESS'
        );
    }
}

export class EmailAlreadyExistsError extends AppError {
    constructor(){
        super(
            'Email Already Exists',
            409,
            'EMAIL_ALREADY_EXISTS'
        );
    }
}

export class UsernameAlreadyExistsError extends AppError {
    constructor(){
        super(
            'Username Already Exists',
            409,
            'USERNAME_ALREADY_EXISTS'
        );
    }
}

export class InvalidTokenError extends AppError {
    constructor(){
        super(
            'Invalid Token',
            401,
            'INVALID_TOKEN'
        );
    }
}

export class TokenExpiredError extends AppError {
    constructor(){
        super(
            'Token Expired',
            401,
            'TOKEN_EXPIRED'
        );
    }
}

export class MissingTokenError extends AppError {
    constructor(){
        super(
            'Missing Token',
            401,
            'MISSING_TOKEN'
        );
    }
}

export class UserCreationError extends AppError {
    constructor(message?: string){
        super(message ?? 'User Creation Failed',
            500,    
            'USER_CREATION_FAILED'
        );
    }
}

export class UserLoginError extends AppError {
    constructor(message?: string){
        super(message ?? 'User Login Failed',
            500,    
            'USER_LOGIN_FAILED'
        );
    }
}

export class InvalidUserIdError extends AppError {
    constructor(){
        super(
            'Invalid User ID',
            400,
            'INVALID_USER_ID'
        );
    }
}

