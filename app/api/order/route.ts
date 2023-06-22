import { db } from "@/app/(lib)/db"

export async function GET(req: Request) {

    const url = new URL(req.url);
    const orderId = url.searchParams.get("id");

    if(!orderId) throw new Error('order id not found');

    const order = await db.order.findFirst({
        where: {
            mongo_id: orderId
        }
    })

    return new Response(JSON.stringify(order));
}