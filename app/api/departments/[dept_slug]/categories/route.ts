import { db } from "@/app/(lib)/db"
import { getBoolParam } from "@/app/(utils)/helpers";

export async function GET(req: Request, { params }: { params: { dept_slug: string }; }) {

    const url = new URL(req.url);

    const availableParam = getBoolParam(url, 'available');
    const availableFilter = (availableParam === null) ? { OR: [{ available: true }, { available: false }] } : { available: availableParam }

    const categories = await db.category.findMany({
        where: {
            AND: [
                {
                    department: {
                        slug: params.dept_slug
                    }
                },
                availableFilter
            ]
        },
        include: {
            subcategories: {
                where: availableFilter
            }
        },
    });

    return new Response(JSON.stringify(categories));
}