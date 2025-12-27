import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { PasswordValidationError } from "../utils/passwordValidator";

export const RegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required.",
        error: "BAD_REQUEST",
      });
    }

    const newUser = await AuthService.register(username, email, password);

    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: "User registered successfully",
      username: userWithoutPassword.username,
      email: userWithoutPassword.email,
      id: userWithoutPassword.id,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        error: "BAD_REQUEST",
      });
    }
    const result = await AuthService.login(email, password);

    return res.status(200).json({
      user: {
        id: result.user.id,
        email: result.user.email,
        username: result.user.username,
      },
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};
