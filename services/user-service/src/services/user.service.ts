import { prisma } from '@ew/common';
import pino from "pino";
import { 
    UserUpdateError,
    UserDeletionError,
    UserFetchError,
    UsersFetchError,
    UserNotFoundError,
} from '@ew/common';
import { tr } from 'zod/locales';

const logger = pino({ name: "user-service", level: "info" });

type User = {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

class UserService{

    getAllUsers = async (

    ): Promise<User[]> =>
    {
        try {
            return await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        } catch (error: any) {
            logger.error(`Failed to fetch users: ${error.message}`);
            throw new UsersFetchError(error.message);
        }
    };

    getUserById = async (
        userId: number
    ): Promise<User> =>
    {
        try{
            return await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }catch (error: any) {
            logger.error(`Failed to fetch user: ${error.message}`);
            throw new UserFetchError(error.message);
        }
    };

    deleteUser = async (
        userId: number,
    ): Promise<void> => {
        try{
            await prisma.user.delete({
                where: { id: userId },
            });
        } catch (error: any) {
            logger.error(`Failed to delete user: ${error.message}`);
            if (error.code === 'P2025') {
                throw new UserNotFoundError();
            }
            throw new UserDeletionError(error.message);
        }
    }

    updateUser = async (
        userId: number,
        data: { username?: string; email?: string; password?: string }
    ): Promise<User> => {
        try{
            return await prisma.user.update({
                where: { id: userId},
                data: {
                    ...data,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        } catch (error: any) {
            logger.error(`Failed to delete user: ${error.message}`);
            if (error.code === 'P2025') {
                throw new UserNotFoundError();
            }
            throw new UserUpdateError(error.message);
        }
        }
    }

export const userService = new UserService();