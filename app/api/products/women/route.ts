import { db } from "@/app/lib/db"
import { DEPARTMENTS } from "@/app/utils/constants";

export async function GET(req: Request) {

    const products = await db.product.findMany({
        where: {
            gender: {
                equals: 'WOMEN'
            }
        }, 
        include: {
            brand: true
        }
    });

    return new Response(JSON.stringify(products));
}