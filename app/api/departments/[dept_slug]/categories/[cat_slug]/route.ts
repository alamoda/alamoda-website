import { db } from "@/app/(lib)/db"

export async function GET(req: Request, { params }: { params: { dept_slug: string, cat_slug: string }; } ) {

    const category = await db.category.findFirst({
        where: {
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
        },
        include: {
            subcategories: true,
        },
    });

    return new Response(JSON.stringify(category));
}