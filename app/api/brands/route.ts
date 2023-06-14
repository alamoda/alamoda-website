import { db } from "@/app/(lib)/db"

export async function POST(req: Request) {

    const brands = await req.json();

    const availableBrands = await db.brand.findMany({
        select: {
            slug: true,
            mapped_ids: true
        }
    });

    let updated: number = 0;
    for (let brand of brands) {

        let found: boolean = false;
        for (let avB of availableBrands) {
            if (avB.slug === brand.slug) {
                found = true;
                break
            }
        }

        if (found) continue

        // Otherwise add the brand in the db
        await db.brand.create({
            data: {
                name: brand.name,
                slug: brand.slug,
                mapped_ids: brand.mapped_ids.split(',').map(Number)
            }
        });
        updated++;
    }

    return new Response(JSON.stringify({ "updated": updated }));
}

export async function GET(req: Request) {

    const brands = await db.brand.findMany();

    return new Response(JSON.stringify(brands));
}

export async function PUT(req: Request) {

    const brands = await db.brand.findMany();

    return new Response(JSON.stringify(brands));
}