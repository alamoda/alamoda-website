import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { User } from "@/app/models/User"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import ClientPromise from "@/app/database/mongodb"

const options = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.username;
                const password = credentials?.password;
                
                if(!email || !password) {
                    throw new Error("Invalid Email or Password");
                }

                const user = await User.findOne({email: email});
                
                if(!user) {
                    throw new Error("Invalid Email or Password");
                }
                
                const isPasswordMatched = await bcrypt.compare(password, user.password);

                if(!isPasswordMatched) {
                    throw new Error("Invalid Email or Password");
                }

                return user;
            }
        }),
    ],
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    adapter: MongoDBAdapter(ClientPromise),
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }