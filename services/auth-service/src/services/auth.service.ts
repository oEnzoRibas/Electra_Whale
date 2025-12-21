import { UserModel } from '@ew/common';
import { validatePassword, PasswordValidationError } from '../utils/passwordValidator'
import * as bcrypt from 'bcrypt';
import { User } from '../generated/prisma/index';
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import pino from 'pino';

const logger = pino({ name: 'auth-service', level: 'info' });

const JWT_SECRET = (process.env.JWT_SECRET || 'fallback_secret') as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '1h') as string;

const SALT_ROUNDS = 8;


    type LoginResponse = {
        user: User;
        token: string;
    }


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
    },

    login: async (email: string, password: string): Promise<LoginResponse> => {
        
        const user = await UserModel.findByEmail(email); 

        if (!user){
            logger.warn({ email }, "Login Failed: User not found.")
            throw new Error('Login Failed: User not found.'); 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password );

        if (!isPasswordValid) {
            logger.warn({ email }, 'Login failed: Invalid password.');
            throw new Error('Invalid credentials.');
        }

        const tokenPayload = { 
            id: user.id, 
            email: user.email 
        };

        const token = jwt.sign(
            tokenPayload,
            JWT_SECRET as jwt.Secret,
            { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
        );

        const{ password: _, ...UserWithoutPassword} = user;

        return{
            user: UserWithoutPassword as User,
            token,
        }
    }
}