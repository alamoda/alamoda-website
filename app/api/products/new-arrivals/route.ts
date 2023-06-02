import { db } from "@/app/lib/db"

export async function GET(req: Request) {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit");

    if (!limitParam){
        return new Response(JSON.stringify({ message: "Error" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const limit = parseInt(limitParam, 10);
    if (isNaN(limit)) return new Response(JSON.stringify({ message: "Error Format" }), {
        status: 400,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    

    const products = await db.product.findMany({
        where: {
            status: 2,
            available: true
        },
        take: limit,
        orderBy: {
            updated_at: 'desc'
        },
        include: {
            brand: true
        }
    });

    return new Response(JSON.stringify(products));
}