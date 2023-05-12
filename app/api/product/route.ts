import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';
const mongoose = require('mongoose');

export async function POST(req: Request) {
    await mongoose.connect("mongodb+srv://simozampa:<3NcsmN6RovpaLRnKpassword>@cluster0.rdkre1n.mongodb.net/?retryWrites=true&w=majority");

    console.log("post works");
    // const { title, description, price, sizes } = await req.json();
    
    // const productDoc = Product.create({
    //     title, 
    //     description, 
    //     price, 
    //     sizes
    // });

    // return new Response(JSON.stringify(productDoc));
}

export async function GET(req: Request) {
    console.log("get works");
}