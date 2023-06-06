import { db } from "@/app/(lib)/db"

export async function GET(req: Request) {

  const departments = await db.department.findFirst({
    where: {
        id: 123
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