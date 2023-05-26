import Login from '@/app/components/Login';
// import { getServerSession } from "next-auth/next";
import Logout from '../components/Logout';

export default async function Page() {
    // const session = await getServerSession();
    // console.log(session);
    // if (session) {
    //     return (
    //         <>
    //             <div>
    //                 <div>
    //                     logged in as {session.user?.email}
    //                 </div>
    //                 <div>
    //                     <Logout />
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }
    return (
        <>
            <Login />
        </>
    )

}