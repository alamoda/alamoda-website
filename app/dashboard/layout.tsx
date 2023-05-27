import Dashboard from "../components/Dashboard"
import Provider from "../components/Provider"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <Dashboard>
                {children}
            </Dashboard>
        </>
    )
}
