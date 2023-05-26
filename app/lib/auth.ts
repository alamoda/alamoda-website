import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"
import ClientPromise from "@/app/database/mongodb"
// import { NextAuthOptions } from "next-auth"

// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             // The name to display on the sign in form (e.g. 'Sign in with...')
//             name: 'Credentials',
//             // The credentials is used to generate a suitable form on the sign in page.
//             // You can specify whatever fields you are expecting to be submitted.
//             // e.g. domain, username, password, 2FA token, etc.
//             // You can pass any HTML attribute to the <input> tag through the object.
//             credentials: {
//                 email: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
//                 mongooseConnect();

//                 const email = credentials?.email;
//                 const password = credentials?.password;

//                 const user = await User.findOne({ email: email });

//                 if (!user) {
//                     throw new Error("Invalid Email or Password");
//                 }

//                 const isPasswordMatched = await bcrypt.compare(password!, user.password);

//                 if (!isPasswordMatched) {
//                     throw new Error("Invalid Email or Password");
//                 }

//                 return user;
//             }
//         }),
//     ],
//     jwt: {
//         secret: process.env.NEXTAUTH_SECRET,
//     },
//     adapter: MongoDBAdapter(ClientPromise),
//     pages: {
//         signIn: '/login',
//     },
//     // callbacks: {
//     //     
//     // },
// }