import { db } from "@/app/(lib)/db"
import { DEPARTMENTS } from "@/app/(utils)/constants";

export async function POST(req: Request) {

  // for (const department of DEPARTMENTS) {

  //   const dept = {
  //     id: department.id,
  //     name: department.name
  //   };

  //   await db.department.create({
  //     data: dept,
  //   });

  //   for (const category of department.categories) {

  //     const cat = {
  //       id: category.id,
  //       name: category.name,
  //       department: {
  //         connect: { id: dept.id }
  //       },
  //     };

  //     await db.category.create({
  //       data: cat,
  //     });

  //     for (const subcategory of category.subcategories) {

  //       const sub = {
  //         id: subcategory.id,
  //         name: subcategory.name,
  //         category: {
  //           connect: { id: cat.id }
  //         },
  //       };

  //       await db.subcategory.create({
  //         data: sub,
  //       });
  //     }
  //   }
  // }

  return new Response(JSON.stringify({ "Message": "success" }));
}