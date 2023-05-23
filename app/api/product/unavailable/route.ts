import { Product } from '@/app/models/Product'
import { mongooseConnect } from '@/app/database/mongoose';

export async function POST(req: Request) {
    await mongooseConnect();

    const {
        cutoff
    } = await req.json();

    try {
        const result = await Product.updateMany(
            { available: true, updated_at: { $lt: cutoff } },
            { available: false }
        );
        
        return new Response(JSON.stringify({ "status": "success", "message": result }));
    } catch (err) {
        return new Response(JSON.stringify({ "status": "error", "message": err }));
    }
}