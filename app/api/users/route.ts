import { z } from "zod";
import { db } from "@/app/(lib)/db";
import { Validator } from "@/app/(utils)/validation";
import { RegisterFormSchemaType } from "@/app/register/page";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = await req.json();


    const validator = new Validator<RegisterFormSchemaType>(
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        },
        {
            firstName: z.string().nonempty({ message: 'First Name is required.' }).max(50),
            lastName: z.string().nonempty({ message: 'Last Name is required.' }).max(50),
            email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Please enter a valid email.' }).max(50),
            password: z.string().nonempty({ message: 'Password is required.' }).min(8, { message: 'Password should be at least 8 characters long.' }).max(50),
            confirmPassword: z.string().nonempty({ message: 'Confirm Password is required.' }).max(50),
        }
    );

    await validator.validate();

    await validator.refine(async (data: RegisterFormSchemaType) => {

        // Refine password
        if ((data.password && data.confirmPassword) && (data.password !== data.confirmPassword)) {
            validator.addIssue("confirmPassword", "Passwords do not match");
        }

        // Refine email
        if (data.email) {
            const emailExists = await db.user.findUnique({
                where: {
                    email: data.email.toLowerCase()
                }
            });

            if (emailExists) { validator.addIssue("email", "Email address exists already"); }
        }
    });

    if (!validator.isValid()) {
        return NextResponse.json({ errors: validator.errors }, { status: 400 });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: encryptedPassword,
            approved: false
        },
    });

    return NextResponse.json(user);
}