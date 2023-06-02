import { db } from "@/app/lib/db"

export async function POST(req: Request) {

    const {
        id,
        sku,
        price,
        wholesale_price,
        available,
        brand_id,
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
            brand: {
                connect: { id: brand_id }
            },
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
    const productIdParam = url.searchParams.get("product_id");

    if (idParam) {
        const regex = /^[a-fA-F0-9]{24}$/;
        if (!regex.test(idParam)) return new Response(JSON.stringify({ message: "Error Format" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const product = await db.product.findFirst({
            where: {
                mongo_id: idParam
            },
            include: {
                brand: true
            }
        });

        return new Response(JSON.stringify(product));
    }
    else if (productIdParam) {

        const productId = parseInt(productIdParam, 10);
        if (isNaN(productId)) return new Response(JSON.stringify({ message: "Error Format" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const product = await db.product.findFirst({
            where: {
                id: productId
            },
            include: {
                brand: true
            }
        });

        return new Response(JSON.stringify(product));
    }

    return new Response(JSON.stringify({ message: "Error" }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function PUT(req: Request) {

    const { mongo_id, id, sku, brand_id, name, description, price, wholesale_price, available, category, gender, features, sizes, images, status } = await req.json();

    await db.product.update({
        where: { mongo_id: mongo_id },
        data: {
            id: id,
            sku: sku,
            price: price,
            wholesale_price: wholesale_price,
            available: available,
            name: name,
            brand: {
                connect: { id: brand_id }
            },
            description: description,
            features: features,
            gender: gender,
            category: category,
            images: images,
            sizes: sizes,
            status: status,
        },
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
