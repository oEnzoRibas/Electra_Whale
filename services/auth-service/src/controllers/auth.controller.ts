import { Request, Response} from 'express';
import { AuthService } from '../services/auth.service';
import { PasswordValidationError } from '../utils/passwordValidator';

export const RegisterController = async (req: Request, res: Response) => {

    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res
        .status(400)
        .json({ message: 'Username, email, and password are required.' });
    }

    try {
        const newUser = await AuthService.register(username, email, password);
        const { password: _, ...userWithoutPassword } = newUser;
        return  res.status(201).json({
            message: 'User registered successfully',
            username: userWithoutPassword.username,
            email: userWithoutPassword.email,
            id: userWithoutPassword.id
        });
    } catch (error) {
        
        if (error instanceof PasswordValidationError) {
            return res
            .status(400)
            .json({ message: error.message });
        }
        
        if (error instanceof Error && error.message.includes('already exists')) {
             return res
             .status(409)
             .json({ message: error.message }); // 409 Conflict
        }
        
        return res.status(500).json({ message: 'Internal server error during registration.' });
    }
}

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
        .status(400)
        .json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
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
        if (error instanceof Error && (error.message.includes('Invalid credentials') || error.message.includes('User not found'))) {
            return res
            .status(401)
            .json({ message: 'Invalid credentials.' });
        }
        return res.status(500).json({ message: 'Internal server error during login.' });
    }
};