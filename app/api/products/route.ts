import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

export async function GET(req: Request) {
    await mongooseConnect();

    const products = await Product.find();

    return new Response(JSON.stringify(products));
}