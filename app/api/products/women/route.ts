import { db } from "@/app/lib/db"
import { GENDERS } from "@/app/utils/constants";

export async function GET(req: Request) {

    const products = await db.product.findMany({
        where: {
            gender: {
                equals: GENDERS.WOMAN
            }
        }
    });

    return new Response(JSON.stringify(products));
}