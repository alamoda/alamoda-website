import Login from '@/app/components/Login';
import { getServerSession } from "next-auth/next";

export default async function Page() {
    const session = await getServerSession();
    
    return (
        <>
        {
            session? <div> logged in as {session.user?.email} </div> : <Login/>
        }
        </>
    )
}