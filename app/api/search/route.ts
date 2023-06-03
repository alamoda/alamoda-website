import { db } from "@/app/lib/db";

export async function GET(req: Request) {

    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    if (typeof query !== "string") {
        throw new Error("Invalid request");
    }

    const skip = getIntParam(url, 'skip');

    const products = await db.product.findMany({
        where: {
            AND: [
                {
                    OR: [
                        {
                            name: {
                                contains: query,
                                mode: "insensitive",
                            }
                        },
                        {
                            brand: {
                                name: {
                                    contains: query,
                                    mode: "insensitive",
                                }
                            }
                        },
                    ]
                },
                {
                    status: 2
                }
            ]

        },
        take: 60,
        include: {
            brand: true
        }
    });

    const count = await db.product.count({
        where: {
            AND: [
                {
                    OR: [
                        {
                            name: {
                                contains: query,
                                mode: "insensitive",
                            }
                        },
                        {
                            brand: {
                                name: {
                                    contains: query,
                                    mode: "insensitive",
                                }
                            }
                        },
                    ]
                },
                {
                    status: 2
                }
            ]
        },
        skip: skip || 0,
    })

    const res = {
        products: products,
        count: count,
    }

    return new Response(JSON.stringify(res));
}

function getIntParam(url: URL, name: string) {
    const limitParam = url.searchParams.get(name);

    if (!limitParam) return null

    const limit = parseInt(limitParam, 10);
    if (isNaN(limit)) return null

    return limit
}