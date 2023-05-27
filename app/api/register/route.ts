import { db } from "@/app/lib/db";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {

    const { email, password } = await req.json();
    
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
        data: {
            email: email,
            password: encryptedPassword,
        },
    });

    return new Response(JSON.stringify(user));
}