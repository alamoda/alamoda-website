import { Suspense } from 'react';

export default function ShopLayout({ children }: { children: React.ReactNode }) {

  return (
    <Suspense>
      <div className='mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8'>
        {children}
      </div>
    </Suspense>
  );
}
