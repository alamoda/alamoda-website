import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

export async function POST(req: Request) {
    const { title, description, price, sizes } = await req.json();
    
    const productDoc = Product.create({
        title, 
        description, 
        price, 
        sizes
    });

    return new Response(JSON.stringify(productDoc));
}

export async function GET(req: Request) {
    console.log("get works");
}