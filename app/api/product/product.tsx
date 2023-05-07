import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    await mongooseConnect();

    if(method === 'POST') {
        const { title, description, price, sizes } = req.body;
        const productDoc = Product.create({
            title, 
            description, 
            price, 
            sizes
        });
        res.json(productDoc);
    }

    if(method === 'GET') {

    }
}