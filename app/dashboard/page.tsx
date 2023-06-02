'use client'

import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Page() {
    const router = useRouter();
    useEffect(() => {
        router.push('/dashboard/women');
    }, [])
}