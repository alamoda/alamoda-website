import { db } from "@/app/(lib)/db"
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const {
        vendor_id,
        sku,
        price,
        wholesale_price,
        available,
        brand_slug,
        name,
        description,
        features,
        department,
        category,
        subcategory,
        images,
        sizes,
        status,
        updated_at,
        created_at
    } = await req.json();

    const product = await db.product.create({
        data: {
            vendor_id: vendor_id,
            sku: sku,
            price: price,
            wholesale_price: wholesale_price,
            available: available,
            name: name,
            brand: {
                connect: { slug: brand_slug }
            },
            description: description,
            features: features,
            department: department,
            category: category,
            subcategory: subcategory,
            images: images,
            sizes: sizes,
            status: status,
            updated_at: updated_at,
            created_at: created_at
        }
    });

    return NextResponse.json(product);
}

export async function GET(req: Request) {

    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const vendorIdParam = url.searchParams.get("vendor_id");

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
                id: idParam
            },
            include: {
                brand: true,
            }
        });

        return new Response(JSON.stringify(product));
    }


    else if (vendorIdParam) {
        const vendorId = parseInt(vendorIdParam, 10);
        if (isNaN(vendorId)) return new Response(JSON.stringify({ message: "Error Format" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const product = await db.product.findFirst({
            where: {
                vendor_id: vendorId
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

    const {
        id, vendor_id, sku, price, wholesale_price, available, name, description, features,
        brand_id, department, category, subcategory, images, sizes, status, updated_at
    } = await req.json()


    const product = await db.product.update({
        where: { id: id },
        data: {
            vendor_id: vendor_id,
            sku: sku,
            brandId: brand_id,
            price: price,
            wholesale_price: wholesale_price,
            available: available,
            name: name,
            description: description,
            features: features,
            department: department,
            category: category,
            subcategory: subcategory,
            images: images,
            sizes: sizes,
            status: status,
            updated_at: updated_at
        },
    });

    return NextResponse.json(product);
}

export async function DELETE(req: Request) {

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id == null) return new Response(JSON.stringify({ message: "Error" }));

    await db.product.delete({
        where: { id: id },
    });

    return new Response();
}
