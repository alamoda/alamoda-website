import { db } from "@/app/lib/db"

export async function GET(req: Request) {

    const products = await db.product.findMany({
        include: {
            brand: true
        }
    });

    return new Response(JSON.stringify(products));
}