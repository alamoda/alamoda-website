import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

// export async function POST(req: Request) {
//     await mongooseConnect();

//     const { title, description, price, sizes } = await req.json();
//     console.log(title, description, price, sizes);
    
//     const productDoc = await Product.create({
//         title, 
//         description, 
//         price, 
//         sizes
//     });

//     return new Response(productDoc);
// }

export async function GET(req: Request) {
    await mongooseConnect();

    const products = await Product.find();

    return new Response(JSON.stringify(products));
}