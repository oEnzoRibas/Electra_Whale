import "dotenv/config";
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/client/index.js';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }

export * from '../generated/client/index.js';