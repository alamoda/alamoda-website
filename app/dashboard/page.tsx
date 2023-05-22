'use client'

import Products from '@/app/components/Products';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <span className='text-xl font-semibold pb-2'>
        Welcome to the dashboard
        {session?.user?.email}
      </span>
    </>
  )
}
