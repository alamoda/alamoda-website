import { db } from "@/app/lib/db"

export async function GET(req: Request) {

    const brands = await db.brand.findMany();

    return new Response(JSON.stringify(brands));
}