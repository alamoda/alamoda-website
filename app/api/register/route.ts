import { User } from '@/app/models/User'
import { mongooseConnect } from '@/app/database/mongoose';

export async function POST(req: Request) {
    await mongooseConnect();

    const { email, password } = await req.json();
    
    const productDoc = await User.create({
        email,
        password
    });

    return new Response(productDoc);
}