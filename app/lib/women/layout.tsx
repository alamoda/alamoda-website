
import CircularButton from '@/app/components/CircularButton';
import Link from 'next/link';

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div>
            
            {children}
        </div>
    )
}
