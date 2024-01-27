import { PrismaClient } from '@prisma/client'

export class StaticPrismaClient{

    static prisma: PrismaClient;

    private constructor(){}

    public static buildClient(): PrismaClient {
        if(this.prisma === null || this.prisma === undefined){
            this.prisma = new PrismaClient({
                log: ['query', 'info', 'warn', 'error'],
            });
            console.log("Create new Prisma Client")
        }
        return this.prisma;
    }
}