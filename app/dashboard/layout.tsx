import Provider from "../components/Provider"
import Dashboard from "../components/Dashboard"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Provider>
                <Dashboard>
                    {children}
                </Dashboard>
            </Provider>
        </>
    )
}
