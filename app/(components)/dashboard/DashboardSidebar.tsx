"use client"

import { cn } from "@/app/(utils)/helpers";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from 'next/image'

import logoImage from '@/public/logo.webp'

const navigation = [
    { name: 'Women', href: '/dashboard/products/women', current: true },
    { name: 'Men', href: '/dashboard/products/men', current: false },
    { name: 'Add Product', href: '/dashboard/new', current: false },
    { name: 'Orders', href: '/dashboard/orders', current: false },
]

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
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    params.department === item.href
                                                        ? 'font-extrabold'
                                                        : 'font-medium hover:font-semibold',
                                                    'group text-xs'
                                                )}
                                            >
                                                {item.name}
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


