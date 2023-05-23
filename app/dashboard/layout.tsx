import Dashboard from "../components/Dashboard"

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
