import { db } from "@/app/(lib)/db"

export async function GET(req: Request) {

    const { orderId } = await req.json();

    const order = await db.order.findFirst({
        where: {
            mongo_id: orderId
        }
    })

    return new Response(JSON.stringify(order));
}