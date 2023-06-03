import Breadcrumb from "@/app/(components)/Breadcrumb";
import ProductForm from "@/app/(components)/ProductForm";

export default function Page() {
    
    const breadcrumb = [
        {
            name: 'Dashboard',
            href: 'dashboard'
        },
        {
            name: 'New',
            href: ''
        }
    ]

    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <Breadcrumb routes={breadcrumb} />

            {/* PRODUCT FORM */}
            <ProductForm />

        </div>
    )
}