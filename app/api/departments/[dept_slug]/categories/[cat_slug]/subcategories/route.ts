import { db } from "@/app/(lib)/db"

export async function GET(req: Request, { params }: { params: { dept_slug: string, cat_slug: string }; }) {

    const subcategories = await db.subcategory.findMany({
        where: {
            AND: [
                {
                    category: {
                        AND: [
                            {
                                slug: params.cat_slug
                            },
                            {
                                department: {
                                    slug: params.dept_slug
                                }
                            }
                        ]
                    }
                }
            ]
        },
    });

    return new Response(JSON.stringify(subcategories));
}