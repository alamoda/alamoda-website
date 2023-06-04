import Login from '@/app/(components)/Login';
import { getServerSession } from "next-auth/next";
import Logout from '../(components)/Logout';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getServerSession();
    console.log(session);
    if (session) {
        redirect('/dashboard');
    }
    return (
        <>
            <Login />
        </>
    )
}