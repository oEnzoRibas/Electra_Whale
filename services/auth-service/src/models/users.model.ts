import { prisma } from "../prismaClient";
import pino from 'pino';
import { User, Prisma } from "../generated/prisma/index";

const logger = pino({ name: 'users-model', level: 'info' });

export const UserModel = {
    create: async (username: string, email: string, hashedPassword: string) => {

        return prisma.user.create({
            data: { username: username, email: email, password: hashedPassword },
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
