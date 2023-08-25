"use client"

import { cn } from "@/app/(utils)/helpers";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from 'next/image'

import logoImage from '@/public/logo.webp'
import { NAVIGATION_DASHBOARD } from "@/app/(utils)/constants";

export default function DashboardSidebar() {

    const params = useParams()

    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 mt-8 overflow-y-auto bg-white px-6 pb-4">
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <div className='relative w-16 h-auto mb-8'>
                                    <Image
                                        src={logoImage}
                                        alt="Alamoda Logo"
                                    />
                                </div>
                                <ul role="list" className="space-y-4">
                                    {NAVIGATION_DASHBOARD.departments.map((department) => (
                                        <li key={department.slug}>
                                            <Link
                                                href={`/dashboard/products/${department.slug}`}
                                                className={cn(
                                                    params.department === department.slug
                                                        ? 'font-extrabold'
                                                        : 'font-medium hover:font-semibold',
                                                    'group text-xs'
                                                )}
                                            >
                                                {department.name}
                                            </Link>
                                        </li>
                                    ))}
                                    {NAVIGATION_DASHBOARD.pages.map((page) => (
                                        <li key={page.href}>
                                            <Link
                                                href={page.href}
                                                className='font-medium hover:font-semibold group text-xs'
                                            >
                                                {page.name}
                                            </Link>
                                        </li>
                                    ))}



                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}


