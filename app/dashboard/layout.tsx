
import DashboardNavbar from '@/components/layout/dashboard-navbar'
import DashboardSidebar from '@/components/layout/dashboard-sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="mx-auto max-w-7xl">

            <DashboardSidebar />

            <div className="lg:pl-72">

                <DashboardNavbar />

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div >
    )
}