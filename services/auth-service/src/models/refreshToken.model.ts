import Redis from "ioredis";

const redis = new Redis();

export const RefreshTokenModel = {
  save: async (userId: number, token: string) => {
    await redis.set(`refresh_token:${userId}`, token, "EX", 7 * 24 * 60 * 60);
  },

  get: async (userId: number) => {
    return redis.get(`refresh_token:${userId}`);
  },

  delete: async (userId: number) => {
    await redis.del(`refresh_token:${userId}`);
  },
};
