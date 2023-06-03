import { db } from "@/app/(lib)/db"

export async function POST(req: Request) {

    const { cutoff } = await req.json();

    try {
        const result = await db.product.updateMany({
            where: { available: true, updated_at: { lt: cutoff } },
            data: { available: false },
        });
        
        return new Response(JSON.stringify({ "status": "success", "message": result }));
    } catch (err) {
        return new Response(JSON.stringify({ "status": "error", "message": err }));
    }
}