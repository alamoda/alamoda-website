"use client"

import React, { useEffect, useState } from "react";
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import useForm from "../(utils)/useForm";
import InputError from "../(components)/form/InputError";
import PrimaryButton from "../(components)/PrimaryButton";
import InputText from "../(components)/form/InputText";
import InputLabel from "../(components)/form/InputLabel";

export type RegisterFormSchemaType = {
    firstName: string,
    lastName: string,
    email: string
    password: string
    confirmPassword: string
}

export default function Page() {

    const form = useForm<RegisterFormSchemaType>(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    );

    const router = useRouter();
    const { data: session, status } = useSession();

    const handleNext = async () => {

        form.post('/api/users', {
            onSuccess: () => { router.push('/login'); },
            onError: (errors) => { form.setError(errors as any); }
        })
    };


    useEffect(() => {
        if (status === "authenticated" && session) {
            redirect('/dashboard');
        }
    }, [status, session]);

    return (
        <>
            <div className="w-full py-8 lg:py-16">

                <div className="mx-auto max-w-2xl p-4 lg:p-8 bg-white md:shadow-sm md:ring-1 md:ring-gray-900/5 rounded-xl md:col-span-2">

                    {/* Section Header */}
                    <div className="pt-4">
                        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                            Sign Up
                        </h2>
                    </div>

                    {/* Form */}
                    <form className="mt-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 gap-y-4" >

                            {/* First Name */}
                            <div className="col-span-full lg:col-span-1">
                                <InputLabel htmlFor="firstName" name="First name" required={true} />
                                <div className="mt-1">
                                    <InputText
                                        name="firstName"
                                        value={form.data.firstName}
                                        onChange={e => form.setData('firstName', e.target.value)}
                                        autoComplete="given-name"
                                    />
                                </div>
                                <InputError errorMessage={form.errors?.firstName} />
                            </div>

                            {/* Last Name */}
                            <div className="col-span-full lg:col-span-1">
                                <InputLabel htmlFor="lastName" name="Last name" required={true} />
                                <div className="mt-1">
                                    <InputText
                                        name="lastName"
                                        value={form.data.lastName}
                                        onChange={e => form.setData('lastName', e.target.value)}
                                        autoComplete="family-name"
                                    />
                                </div>
                                <InputError errorMessage={form.errors?.lastName} />
                            </div>

                            {/* Email */}
                            <div className="col-span-full" >
                                <InputLabel htmlFor="email" name="Email" required={true} />
                                <div className="mt-1">
                                    <InputText
                                        name="firstName"
                                        value={form.data.email}
                                        onChange={e => form.setData('email', e.target.value)}
                                    />
                                </div>
                                <InputError errorMessage={form.errors?.email} />
                            </div>

                            {/* Password */}
                            < div className="col-span-full" >
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
                            </div >

                            {/* Confirm Password */}
                            < div className="col-span-full" >
                                <InputLabel htmlFor="confirmPassword" name="Confirm Password" required={true} />
                                <div className="mt-1">
                                    <InputText
                                        type="password"
                                        name="confirmPassword"
                                        value={form.data.confirmPassword}
                                        onChange={e => form.setData('confirmPassword', e.target.value)}
                                    />
                                </div>
                                <InputError errorMessage={form.errors?.confirmPassword} />
                            </div >
                        </div >

                        {/* Footer */}
                        <div className="mt-8">

                            <div className="flex justify-end">

                                <PrimaryButton
                                    disabled={form.processing}
                                    onClick={handleNext}
                                >
                                    {(form.processing) &&
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    }
                                    Send my Request
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}















































// "use client"

// import { useRef } from "react";

// export default function Example() {
//     const emailRef = useRef<HTMLInputElement | null>(null);
//     const passwordRef = useRef<HTMLInputElement | null>(null);

//     const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
//         e.preventDefault();
//         const email = emailRef.current?.value;
//         const password = passwordRef.current?.value;
//         console.log(email, password);
//         try {

//             const response = await fetch("api/register", {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     email,
//                     password,
//                 })
//             })

//             if (!response.ok) {
//                 console.log("Error registering");
//                 return;
//             }

//             const data = await response.json();
//             console.log(data);
//         } catch (error) {
//             console.log(error);
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
//                         Register your account
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
//                                 Sign up
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

