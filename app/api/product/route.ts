import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

export async function POST(req: Request) {
    await mongooseConnect();

    const { title, description, price, sizes, images } = await req.json();
    
    const productDoc = await Product.create({
        title, 
        description, 
        price, 
        sizes,
        images
    });

    return new Response(productDoc);
}

export async function GET(req: Request) {
    await mongooseConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    const product = await Product.findOne({_id: id});

    return new Response(JSON.stringify(product));
}

export async function PUT(req: Request) {
    await mongooseConnect();

    const {_id, title, description, price, sizes, images } = await req.json();

    console.log(_id, title, description, price, sizes, images);

    await Product.updateOne({_id}, {
        title, 
        description, 
        price, 
        sizes,
        images
    });

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
