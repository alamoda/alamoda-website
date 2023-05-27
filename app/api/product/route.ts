import { db } from "@/app/lib/db"

export async function POST(req: Request) {

    const {
        id,
        sku,
        price,
        wholesale_price,
        available,
        name,
        description,
        features,
        gender,
        category,
        images,
        sizes,
        status,
        updated_at,
        created_at
    } = await req.json();

    await db.product.create({
        data: {
            id: id,
            sku: sku,
            price: price,
            wholesale_price: wholesale_price,
            available: available,
            name: name,
            description: description,
            features: features,
            gender: gender,
            category: category,
            images: images,
            sizes: sizes,
            status: status,
            updated_at: updated_at,
            created_at: created_at
        },
    });

    return new Response();
}

export async function GET(req: Request) {

    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");

    if (idParam == null) return new Response(JSON.stringify({ message: "Error" }));

    // const id = parseInt(idParam, 10);
    // if (isNaN(id)) return new Response(JSON.stringify({ message: "Error" }));

    const product = await db.product.findUniqueOrThrow({
        where: {
            mongo_id: idParam
        }
    });

    return new Response(JSON.stringify(product));
}

export async function PUT(req: Request) {

    const { mongo_id, ...updates } = await req.json();

    await db.product.update({
        where: { mongo_id: mongo_id },
        data: updates,
    });

    return new Response();
}

export async function DELETE(req: Request) {

    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");

    if (idParam == null) return new Response(JSON.stringify({ message: "Error" }));

    const id = parseInt(idParam, 10);
    if (isNaN(id)) return new Response(JSON.stringify({ message: "Error" }));

    await db.product.delete({
        where: { id: id },
    });

    return new Response();
}
