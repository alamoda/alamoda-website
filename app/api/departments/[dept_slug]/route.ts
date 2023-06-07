import { db } from "@/app/(lib)/db"

export async function GET(req: Request, { params }: { params: { dept_slug: string }; }) {

  const departments = await db.department.findFirst({
    where: {
      slug: params.dept_slug
    },
    include: {
      categories: {
        include: {
          subcategories: true,
        },
      },
    }
  });

  return new Response(JSON.stringify(departments));
}