import Breadcrumb from "@/app/(components)/Breadcrumb";

export default function Page() {

    const breadcrumb = [
        {
            name: 'Dashboard',
            href: 'dashboard'
        },
        {
            name: 'Orders',
            href: ''
        }]

    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <Breadcrumb routes={breadcrumb} />

        </div>
    )
}