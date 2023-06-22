import { db } from "@/app/(lib)/db";

export async function GET(req: Request) {

    const orders = await db.order.findMany({
        take: 10
    });

    return new Response(JSON.stringify(orders));
}