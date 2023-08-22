import { Prisma, PrismaClient } from "@prisma/client"

declare global {
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient()
    }
    prisma = global.cachedPrisma
}

export const db = prisma


const productWithRelations = Prisma.validator<Prisma.ProductArgs>()({
    include: {
        brand: true,
        department: true,
        category: true,
        subcategory: true,
    },
})

export type ProductWithRelations= Prisma.ProductGetPayload<typeof productWithRelations>;