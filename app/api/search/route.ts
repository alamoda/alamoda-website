import { db } from "@/app/lib/db";

export async function GET(req: Request) {

    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    if(typeof query !== "string") {
        throw new Error("Invalid request");
    }

    console.log(query);

    const products = db.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query,
                        mode: "insensitive",
                    }
                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive",
                    }
                },
            ]
        },
        include: {
            brand: true,
        }
    });

    const brands = db.brand.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive",
            }
        }
    })

    return new Response(JSON.stringify({brands, products}));
}