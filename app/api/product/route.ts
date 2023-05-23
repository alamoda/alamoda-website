import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

export async function POST(req: Request) {
    await mongooseConnect();

    const {
        id,
        sku,
        price,
        wholesale_price,
        available,
        name, 
        description,
        features,
        gender,
        category,
        images,
        sizes,
        status
    } =  await req.json();
    
    const productDoc = await Product.create({
        id,
        sku,
        price,
        wholesale_price,
        available,
        name, 
        description,
        features,
        gender,
        category,
        images,
        sizes,
        status
    });

    return new Response(productDoc);
}

export async function GET(req: Request) {
    await mongooseConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    const product = await Product.findOne({id: id});

    return new Response(JSON.stringify(product));
}

export async function PUT(req: Request) {
    await mongooseConnect();

    const {_id, ...updates} = await req.json();
    console.log(_id)

    await Product.updateOne({_id}, { $set: updates });

    return new Response();
}

export async function DELETE(req: Request) {
    await mongooseConnect();
    
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    await Product.deleteOne({
        _id: id
    });

    return new Response();
}
