"use client"

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react"
import { useSession } from 'next-auth/react'
import Link from "next/link";
import useForm from "../(utils)/useForm";
import { redirect } from "next/navigation";
import InputLabel from "./form/InputLabel";
import InputText from "./form/InputText";
import InputError from "./form/InputError";
import PrimaryButton from "./PrimaryButton";
import { cn } from "../(utils)/helpers";

export type LoginFormSchemaType = {
    email: string
    password: string
}

export default function Page() {

    const [submitError, setSubmitError] = useState<string>("");
    const form = useForm<LoginFormSchemaType>({
        email: '',
        password: '',
    })

    const { data: session, status } = useSession();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setSubmitError("");
        form.setProcessing(true);

        try {

            const result = await signIn("credentials", {
                redirect: false,
                ...form.data
            });

            if (result?.error) {
                setSubmitError(result.error);
            }

            form.setProcessing(false);

        } catch (error: any) {
            setSubmitError("Error while logging in. Please try again later.");
            form.setProcessing(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session) {
            redirect('/dashboard');
        }
    }, [status, session]);

    return (
        <div className="w-full py-8 lg:py-16">

            <form onSubmit={submit} className="mx-auto max-w-2xl p-4 lg:p-8 bg-white md:shadow-sm md:ring-1 md:ring-gray-900/5 rounded-xl md:col-span-2">

                {/* Section Header */}
                <div className="py-4">
                    <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                        Sign in
                    </h2>
                </div>


                <div className="grid grid-cols-1 gap-y-4" >
                    {/* Email */}
                    <div className="col-span-full" >
                        <InputLabel htmlFor="email" name="Email" required={true} />
                        <div className="mt-1">
                            <InputText
                                name="email"
                                value={form.data.email}
                                onChange={e => form.setData('email', e.target.value)}
                            />
                        </div>
                        <InputError errorMessage={form.errors?.email} />
                    </div>

                    {/* Password */}
                    <div className="col-span-full" >
                        <InputLabel htmlFor="password" name="Password" required={true} />
                        <div className="mt-1">
                            <InputText
                                type="password"
                                name="password"
                                value={form.data.password}
                                onChange={e => form.setData('password', e.target.value)}
                            />
                        </div>
                        <InputError errorMessage={form.errors?.password} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                            />
                            <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm leading-6">
                            <Link href="/forgot-password" className="font-semibold text-gray-900 hover:text-gray-600">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8">

                    <InputError errorMessage={submitError} className="mt-0" />

                    <div className="flex justify-end">
                        <PrimaryButton
                            type="submit"
                            className={cn("w-full", submitError ? 'mt-2' : '')}
                            disabled={form.processing}
                        >
                            {form.processing &&
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            }
                            Login
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    )
}




// "use client"

// import { signIn, signOut } from "next-auth/react"
// import { useRouter } from "next/navigation";
// import { useRef } from "react";

// export default function Login() {
//     const emailRef = useRef<HTMLInputElement | null>(null);
//     const passwordRef = useRef<HTMLInputElement | null>(null);

//     const router = useRouter();

//     const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
//         e.preventDefault();
//         const email = emailRef.current?.value;
//         const password = passwordRef.current?.value;
//         console.log(email, password);
//         try {
//             const data = await signIn("credentials", {
//                 redirect: false,
//                 email,
//                 password,
//             });
//             console.log("response from login is", data);
//             router.push('/dashboard');
//         } catch (error) {
//             console.log("error during login", error);
//         }
//     };

//     return (
//         <>
//             <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//                 <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                     <img
//                         className="mx-auto h-10 w-auto"
//                         src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=900"
//                         alt="Your Company"
//                     />
//                     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//                         Sign in to your account
//                     </h2>
//                 </div>

//                 <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                     <form className="space-y-6" action="#" method="POST">
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Email address
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     ref={emailRef}
//                                     autoComplete="email"
//                                     required
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <div className="flex items-center justify-between">
//                                 <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                                     Password
//                                 </label>
//                                 <div className="text-sm">
//                                     <a href="#" className="font-semibold text-gray-900 hover:text-gray-700">
//                                         Forgot password?
//                                     </a>
//                                 </div>
//                             </div>
//                             <div className="mt-2">
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     ref={passwordRef}
//                                     autoComplete="current-password"
//                                     required
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <button
//                                 onClick={handleSubmit}
//                                 type="submit"
//                                 className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
//                             >
//                                 Sign in
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }
