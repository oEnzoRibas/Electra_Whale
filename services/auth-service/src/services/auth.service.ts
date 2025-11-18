import { UserModel } from '../models/users.model';
import { validatePassword, PasswordValidationError } from '../utils/passwordValidator'
import * as bcrypt from 'bcrypt';
import { User } from '../generated/prisma/index';
import pino from 'pino';

const logger = pino({ name: 'auth-service', level: 'info' });

const SALT_ROUNDS = 8;

export const AuthService = {

    register: async (username: string, email: string, password: string): Promise<User> => {
        try {
            validatePassword(password)
        } catch (error) {
            logger.error({ err: error }, 'An unexpected error occurred during user operation.');
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await UserModel.create(username, email, hashedPassword)

        return newUser;
    }
}