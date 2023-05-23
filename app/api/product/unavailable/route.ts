import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

export async function POST(req: Request) {
    await mongooseConnect();

    const {
        cutoff
    } = await req.json();

    const products = await Product.find({ available: true, updated_at: { $lt: cutoff } });

    console.log(products.length)

    // const productDoc = await Product.create({

    // });

    return new Response(JSON.stringify({ "message": "success" }));
}