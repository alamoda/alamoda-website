
import CircularButton from '@/app/components/CircularButton';
import Link from 'next/link';

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div>
            <div className='flex items-center'>
                <div className='text-sm font-medium'>
                    / dashboard / women
                </div>
                <Link href="dashboard/new" className="ml-2" >
                    <CircularButton />
                </Link>
            </div>
            {children}
        </div>
    )
}
