import { db } from "@/app/lib/db"

export async function POST(req: Request) {

    const brands = await req.json();

    const db_brands = await db.brand.findMany({
        select: {
            id: true
        }
    });

    const available_ids = db_brands.map(brand => brand.id);

    let updated = 0;
    for (let brand of brands) {

        const brand_id = parseInt(brand.id, 10);
        if (isNaN(brand_id)) continue;

        if (available_ids.includes(brand_id)) continue

        // Otherwise add the brand in the db
        await db.brand.create({
            data: {
                id: brand_id,
                name: brand.name,
            }
        });
        updated++;
    }

    return new Response(JSON.stringify({"updated": updated}));
}

export async function GET(req: Request) {

    const brands = await db.brand.findMany();

    return new Response(JSON.stringify(brands));
}