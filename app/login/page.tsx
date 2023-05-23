import Login from '@/app/components/Login';
import { getServerSession } from "next-auth/next";
import Logout from '../components/Logout';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Page() {
    const session = await getServerSession();

    if (session) {
        return (
            <>
                <div>
                    <div>
                        logged in as {session.user?.email}
                    </div>
                    <div>
                        <Logout />
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <Login />
        </>
    )

}