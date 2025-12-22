import { Request, Response } from 'express';
import { AuthRequest } from '@ew/common';
import { userService } from '../services/user.service.js';
import { z } from 'zod';
import { OwnsResource } from '@/decorators/auth.decorators.js';


class UserController {

    private  getValidId(req: AuthRequest, res: Response): number | null {
        const rawId = req.params.userId || req.params.Id;
        const id = Number(rawId);

        if  (isNaN(id)) {  
            res.status(400).json({ error: 'Invalid user ID.'});
            return null;
        }
        return id;
    }

getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch {
        res.status(500).json({ error: ' Error while fetching users. '})
    }
};

getUserProfile = async(req: AuthRequest, res: Response) => {
    try{
        const id = this.getValidId(req, res);
        if (id === null) return;

        const user = await userService.getUserById(id);

        if (!user) return res.status(404).json({ error: 'User Not Found.'});
        res.json(user);
        
    }catch (error) {
            console.log(error);
            res.status(500).json({ error: ' Error while fetching user profile. '})
        }
};

deleteUser = async(req: AuthRequest, res: Response) => {
    try{
        const id = this.getValidId(req, res);
        if (id === null) return;

        await userService.deleteUser(id);
        
        res.status(200).json({ 
                message: "Usuário deletado com sucesso!",
                deletedId: id
            });
    } catch (error){
        console.log(error);
        res.status(500).json({ error: ' Error while deleting user. '})
    }
};

@OwnsResource
async updateUser (req: Request, res: Response) {
    try {
        const userId = Number(req.params.userId);
        
        const updateSchema = z.object({
            username: z.string().min(3).max(30).optional(),
            email: z.string().email().optional(),
        });

        const parsedData = updateSchema.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).json({ error: 'Invalid input data.', });
        }
        
        const { username, email } = parsedData.data;
        
        const updatedUser = await userService.updateUser(userId, { username, email });
        res.json(updatedUser);

    } catch (error) {
        console.error(error);
        if ((error as any).code === 'P2002') {
                return res.status(409).json({ error: 'Este email já está em uso.' });
        }
        
        res.status(500).json({ error: 'Error while updating user.' });
    }
};

@OwnsResource
async getMe(req: AuthRequest, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while fetching user profile.' });
    }   

}
export const userController = new UserController();