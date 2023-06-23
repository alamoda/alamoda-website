'use client'

import { useState } from "react";


const newsletterDepartments = [
    { id: 'women', title: 'Women' },
    { id: 'men', title: 'Men' },
    { id: 'both', title: 'Both' },
];

export default function Newsletter() {

    const [currentDepartment, setCurrentDepartment] = useState<string>();

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:px-24 xl:py-32">
                    <h2 className="mx-auto max-w-2xl text-center text-3xl tracking-tight text-white sm:text-4xl">
                        Join our fashion family
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-center leading-8 text-gray-300">
                        Subscribe now to save up to 40% on your favorite luxury items!
                    </p>

                    <div className="flex justify-center items-center mx-auto py-8">
                        <fieldset>
                            <legend className="sr-only">Notification method</legend>
                            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                {newsletterDepartments.map((dept) => (
                                    <div key={dept.id} className="flex items-center">
                                        <input
                                            id={dept.id}
                                            name="notification-method"
                                            type="radio"
                                            defaultValue={dept.id}
                                            checked={dept.id === currentDepartment}
                                            className="h-4 w-4 border-gray-300 text-gray-200 focus:ring-gray-200"
                                            onChange={()=>setCurrentDepartment(dept.id)}
                                        />
                                        <label htmlFor={dept.id} className="ml-3 block text-sm font-medium leading-6 text-gray-200">
                                            {dept.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                    <form className="mx-auto flex max-w-md gap-x-4">
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="min-w-0 flex-auto border-0 bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                            placeholder="Enter your email"
                        />
                        <button
                            type="submit"
                            className="flex-none bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Notify me
                        </button>
                    </form>
                    <p className="mx-auto mt-6 max-w-xl text-xs text-center text-gray-600">By signing up you agree with our Terms and Conditions and Privacy Policy.</p>
                </div>
            </div>
        </div>
    )
}