import { db } from "@/app/(lib)/db"

export async function GET(req: Request) {

    const url = new URL(req.url);

    // We force to specify a limit and to be < 50
    const limit = getIntParam(url, 'limit');
    if (!limit || (limit && limit > 60)) {
        return new Response(JSON.stringify({ message: "Error Format" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    const skip = getIntParam(url, 'skip');
    const query = getStrParam(url, 'q');

    const department = getStrParam(url, 'department');
    const category = getStrParam(url, 'category');
    const subcategory = getStrParam(url, 'subcategory');

    const filters: any = [
        {
            status: {
                not: 0
            }
        },
        {
            available: true
        }
    ];

    if (department) {
        filters.push(
            {
                department: department
            }
        );
    }
    if (category) {
        filters.push(
            {
                category: category
            }
        );
    }
    if (subcategory) {
        filters.push(
            {
                subcategory: subcategory
            }
        );
    }
    if (query) {
        filters.push(
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
            }
        )
    }

    const products = await db.product.findMany({
        where: {
            AND: filters
        },
        take: limit,
        skip: skip || 0,
        include: {
            brand: true
        }
    });

    const count = await db.product.count({
        where: {
            AND: filters
        },
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

function getStrParam(url: URL, name: string) {
    const strParam = url.searchParams.get(name);

    if (!strParam) return null

    return strParam.toUpperCase().replace('-', ' ');
}