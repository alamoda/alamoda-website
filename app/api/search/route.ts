import { db } from "@/app/lib/db";

export async function GET(req: Request) {

    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    if (typeof query !== "string") {
        throw new Error("Invalid request");
    }

    console.log(query);

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
        include: {
            brand: true,
        },
        take: 20
    });

    console.log("products are", products);

    return new Response(JSON.stringify(products));
}