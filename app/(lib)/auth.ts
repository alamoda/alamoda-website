import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import { db } from "./db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid Email or Password");
                }

                if ((typeof credentials.email !== "string") || (typeof credentials.password !== "string")){
                    throw new Error("Invalid Email or Password");
                }

                const user = await (db as any).user.findUnique({
                    where: {
                        email: credentials.email.toLowerCase()
                    },
                });

                if (!user) {
                    throw new Error("Invalid Email or Password");
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordValid) {
                    throw new Error("Invalid Email or Password");
                }


                if (!user.approved) {
                    throw new Error("Account not authorized.");
                }

                // Any object returned will be saved in `user` property of the JWT
                // ^ This is not actually true 
                return user;
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },
    // This is a temporary fix for prisma client.
    // @see https://github.com/prisma/prisma/issues/16117
    adapter: PrismaAdapter(db as any),
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {

            if (token.email) {
                const dbUser = await (db as any).user.findUnique({
                    where: {
                        email: token.email.toLowerCase()
                    },
                });

                token.name = dbUser.firstName + ' ' + dbUser.lastName;
            }

            return token;
        },
        // async session({ session, token }) {

        //     // Send properties to the client
        //     if (token && session.user) {
        //         session.user.role = token.role;
        //         session.user.businessId = token.businessId;
        //         session.user.id = token.id;
        //         session.user.instagramAccount = token.instagramAccount;
        //     }

        //     return session;
        // }
    },
}