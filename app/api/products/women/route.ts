import { db } from "@/app/(lib)/db"

export async function GET(req: Request) {

    const products = await db.product.findMany({
        where: {
            AND: [
                {
                    department: 'WOMAN',
                },
                {
                    status: {
                        not: 0
                    }
                }
            ]
        },
        take: 20
    });

    console.log(products);

    return new Response(JSON.stringify(products));
}