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
// export async function GET(req: Request) {

//   for (const department of DEPARTMENTS) {

//     const dept = {
//       name: department.name,
//       description: department.description,
//       slug: department.slug,
//       mapped_ids: department.mapped_ids,
//       order: department.order,
//       available: department.available
//     };

//     const newDepartment =await db.department.create({
//       data: dept,
//     });

//     for (const category of department.categories) {

//       const cat = {
//         name: category.name,
//         slug: category.slug,
//         mapped_ids: category.mapped_ids,
//         order: category.order,
//         available: category.available,
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
//           order: subcategory.order,
//           available: subcategory.available,
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