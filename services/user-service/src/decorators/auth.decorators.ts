import { Request, Response, NextFunciton } from 'express';

export function OwnsResource(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const req = args[0];
        const res = args[1];
        const next = args[2];

        const requesingUser = (req as any).user;

        const targetUserId = Number(req.params.userId || req.params.Id);

        if (requesingUser.id !== targetUserId) {
            return res.status(403).json({ 
                error: 'Forbidden: You do not own this resource.' 
            });
        }

        return originalMethod.apply(this, args);

    };

    return descriptor;
}