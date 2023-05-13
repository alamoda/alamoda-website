import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

export async function POST(req: Request) {
    await mongooseConnect();

    const { title, description, price, sizes } = await req.json();
    console.log(title, description, price, sizes);
    
    const productDoc = await Product.create({
        title, 
        description, 
        price, 
        sizes
    });

    return new Response(productDoc);
}

type myParams = {
    params: {
        id: string
    }
}

export async function GET(req: Request) {
    await mongooseConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    const product = await Product.findOne({_id: id});

    return new Response(JSON.stringify(product));
}