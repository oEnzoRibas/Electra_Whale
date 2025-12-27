import { UserModel, User, Prisma } from "@ew/common";
import {  validatePassword,  PasswordValidationError,} from "../utils/passwordValidator.js";
import { validateEmail, EmailValidationError } from "../utils/emailValidator.js";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import pino from "pino";

import {
  UserNotFoundError,
  InvalidCredentialsError,
  PasswordPolicyError,
  UnauthorizedError,
  EmailAlreadyExistsError,
  InvalidTokenError,
  TokenExpiredError,
  MissingTokenError,
  UserLoginError,
  UserCreationError,
  EmailPolicyError,
  UsernameAlreadyExistsError,
} from "@ew/common";

const logger = pino({ name: "auth-service", level: "info" });

const JWT_SECRET = (process.env.AUTH_JWT_SECRET || "fallback_secret") as string;
const JWT_EXPIRES_IN = (process.env.AUTH_JWT_EXPIRES_IN || "1h") as string;

const SALT_ROUNDS = 8;

type LoginResponse = {
  user: User;
  token: string;
};

export const AuthService = {
  register: async (
    username: string,
    email: string,
    password: string
  ): Promise<User> => {
    try {
    validatePassword(password);
    validateEmail(email);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await UserModel.create(username, email, hashedPassword);

    return newUser;
  } catch (error: any) {

    if (error?.code === 'P2002') {
      const fields =
      error.meta?.target ??
      error.meta?.driverAdapterError?.cause?.constraint?.fields;

      if (fields?.includes('email')) {
        throw new EmailAlreadyExistsError();
      }

      if (fields?.includes('username')) {
        throw new UsernameAlreadyExistsError();
      }
    }

    if (error instanceof EmailValidationError) {
      throw new EmailPolicyError(error.message);
    }

    if (error instanceof PasswordValidationError) {
      throw new PasswordPolicyError(error.message);
    }

    throw new UserCreationError();
  }
},

  login: async (email: string, password: string): Promise<LoginResponse> => {
    try{
    const user = await UserModel.findByEmail(email);

    if (!user) {
      logger.warn({ email }, "Login Failed: User not found.");
      throw new UserNotFoundError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.warn({ email }, "Login failed: Invalid password.");
      throw new InvalidCredentialsError();
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET as jwt.Secret, {
      expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });

    const { password: _, ...UserWithoutPassword } = user;

    return {
      user: UserWithoutPassword as User,
      token,
    };
} catch (error: any) {
    if (error instanceof PasswordValidationError) {
      throw new PasswordPolicyError(error.message);
    }

    if (error instanceof EmailValidationError) {
      throw new EmailPolicyError(error.message);
    }

    if (error instanceof InvalidCredentialsError) {
      throw new InvalidCredentialsError(error.message);
    }

    throw new UserLoginError(error.message);

    }

    },

    
    verifyToken: (token: string): any => {  
    try {
      const decoded = jwt.verify(token, JWT_SECRET as Secret);
      return decoded;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new TokenExpiredError();
      } else if (error.name === "JsonWebTokenError") {
        throw new InvalidTokenError();
      } else {
        throw new UnauthorizedError();
      }
    }
  }

};
