import { db } from "@/app/lib/db"

export async function GET(req: Request) {

    const products = await db.product.findMany({
        where: {
            AND: [
                {
                    department: 'MAN',
                },
                {
                    status: 2
                },
                {
                    available: true
                }
            ]
        },
        include: {
            brand: true
        },
        take: 20
    });

    return new Response(JSON.stringify(products));
}