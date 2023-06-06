import { db } from "@/app/(lib)/db"

export async function GET(req: Request) {

    const departments = [
        {
          id: 123,
          name: 'Department 1',
          categories: {
            create: [
              {
                id: 124,
                name: 'Category 1-1',
                subcategories: {
                  create: [
                    { id: 125, name: 'Subcategory 1-1-1' },
                    { id: 126, name: 'Subcategory 1-1-2' },
                  ],
                },
              },
              {
                id: 127,
                name: 'Category 1-2',
                subcategories: {
                  create: [
                    { id: 128, name: 'Subcategory 1-2-1' },
                    { id: 129, name: 'Subcategory 1-2-2' },
                  ],
                },
              },
            ],
          },
        },
      ];
    
      // for (const dept of departments) {
      //   await db.department.create({
      //     data: dept,
      //   });
      // }

    return new Response(JSON.stringify({"Message": "success"}));
}