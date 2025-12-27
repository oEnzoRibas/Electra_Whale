import { AppError } from "./appErrors.js";

export class UserUpdateError extends AppError {
    constructor(message: string){
        super(
            `User Update Failed: ${message}`,
            500,
            'USER_UPDATE_FAILED'
        );
    }
}

export class UserDeletionError extends AppError {
    constructor(message: string){
        super(
            `User Deletion Failed: ${message}`, 
            500,
            'USER_DELETION_FAILED'
        );
    }
}

export class UserFetchError extends AppError {
    constructor(message: string){
        super(
            `User Fetch Failed: ${message}`,
            500,
            'USER_FETCH_FAILED'
        );
    }
}   

export class UsersFetchError extends AppError {
    constructor(message: string){
        super(
            `Users Fetch Failed: ${message}`,
            500,
            'USERS_FETCH_FAILED'
        );
    }
}