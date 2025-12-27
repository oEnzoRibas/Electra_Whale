import { prisma } from '../utils/prismaClient.js';
import type { User } from '../generated/client/index.js';
import pino from 'pino';

const logger = pino({ name: 'common-users-model', level: 'info' });

export const UserModel = {
    create: async (username: string, email: string, hashedPassword: string) => {
        return await prisma.user.create({
            data: { 
                username: username, 
                email: email, 
                password: hashedPassword },
        });
    },

    findByEmail: async (email: string): Promise<User | null> => {
        return prisma.user.findUnique({ where: { email } });
    },

    findById: async (id: number): Promise<User | null> => {
        return prisma.user.findUnique({ where: { id } });
    },

    updatePassword: async (id: number, hashedPassword: string) => {
        return prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
    },

    delete: async (id: number) => {
        return prisma.user.delete({
            where: { id },
        });
    },

    updateUsername: async (id: number, username: string) => {
        return prisma.user.update({
            where: { id },
            data: { username },
        });
    }
};
