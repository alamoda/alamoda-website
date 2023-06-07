import { db } from "@/app/(lib)/db"

export async function GET(req: Request) {

  const departments = await db.department.findMany({
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


// import { DEPARTMENTS } from "@/app/(utils)/constants";
// export async function POST(req: Request) {

//   for (const department of DEPARTMENTS) {

//     const dept = {
//       name: department.name,
//       slug: department.slug,
//       mapped_ids: department.mapped_ids,
//     };

//     const newDepartment =await db.department.create({
//       data: dept,
//     });

//     for (const category of department.categories) {

//       const cat = {
//         name: category.name,
//         slug: category.slug,
//         mapped_ids: category.mapped_ids,
//         department: {
//           connect: { mongo_id: newDepartment.mongo_id }
//         },
//       };

//       const newCategory = await db.category.create({
//         data: cat,
//       });

//       for (const subcategory of category.subcategories) {

//         const sub = {
//           name: subcategory.name,
//           slug: subcategory.slug,
//           mapped_ids: subcategory.mapped_ids,
//           category: {
//             connect: { mongo_id: newCategory.mongo_id }
//           },
//         };

//         await db.subcategory.create({
//           data: sub,
//         });
//       }
//     }
//   }

//   return new Response(JSON.stringify({ "Message": "success" }));
// }