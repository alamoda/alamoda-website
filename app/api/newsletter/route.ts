import { db } from "@/app/(lib)/db";

export async function POST(req: Request) {

    const {
        inputDepartment,
        inputEmail
    } = await req.json();

    const newsletter = await db.newsletter.create({
        data: {
            email: inputEmail,
            department: inputDepartment,
        }
    });

    return new Response(JSON.stringify(newsletter));
}