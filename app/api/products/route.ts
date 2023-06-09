import { db } from "@/app/(lib)/db"
import { SortOption } from "@/app/(types)";
import { PRODUCT_SORT_OPTIONS } from "@/app/(utils)/constants";

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
    const subcategories = getStrParam(url, 'subcategories');

    const order = getStrParam(url, 'order');
    const statusMin = getIntParam(url, 'status-min');
    const available = getBoolParam(url, 'available');


    const filters: object[] = [
        {
            status: {
                gte: statusMin ? statusMin : -1
            }
        },
        {
            available: available ? available : false
        }
    ];

    if (department) {
        filters.push(
            {
                department: {
                    slug: department,
                },
            }
        );
    }
    if (category) {
        filters.push(
            {
                category: {
                    slug: category,
                },
            }
        );
    }
    if (subcategories) {
        filters.push(
            {
                subcategory: {
                    slug: {
                        in: subcategories.split(',')
                    }
                }
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

    let orderFilter: SortOption = PRODUCT_SORT_OPTIONS[0];
    if (order) {
        const res = PRODUCT_SORT_OPTIONS.find((o: SortOption) => o.slug === order);
        if (res) orderFilter = res
    }

    const products = await db.product.findMany({
        where: {
            AND: filters
        },
        take: limit,
        skip: skip || 0,
        include: {
            brand: true,
            department: true,
            category: true,
            subcategory: true,
        },
        orderBy: orderFilter.filter
    });

    const count = await db.product.count({
        where: {
            AND: filters
        },
    });

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

    return strParam;
}

function getBoolParam(url: URL, name: string) {
    const strParam = url.searchParams.get(name);

    if (!strParam) return null

    if (strParam.toLowerCase() === "true") return true

    if (strParam.toLowerCase() === "false") return false

    return null;
}