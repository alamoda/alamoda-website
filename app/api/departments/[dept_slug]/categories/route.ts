import { db } from "@/app/(lib)/db"

export async function GET(req: Request, { params }: { params: { dept_slug: string }; }) {

    const categories = await db.category.findMany({
        where: {
            department: {
                slug: params.dept_slug
            }
        },
        include: {
            subcategories: true,
        },
    });

    return new Response(JSON.stringify(categories));
}