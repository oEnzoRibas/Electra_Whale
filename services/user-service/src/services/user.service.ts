import { prisma } from '@ew/common';

class UserService{
    async getAllUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            },
        });
    }
    async getUserById(userId: number){
        return prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            },
        });
    }
    async deleteUser(userId: number){
        return prisma.user.delete({
            where: { id: userId },
        });
    }

    async updateUser(userId: number, data: { username?: string; email?: string; password?: string }) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                ...data,
            },
            select: { id: true, username: true, email: true, createdAt: true }
        });
        
    }


}

export const userService = new UserService();