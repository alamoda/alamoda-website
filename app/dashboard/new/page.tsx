import { getBrands } from "@/app/actions";
import Breadcrumb from "@/components/layout/breadcrumb";
import ProductForm from "@/components/product/product-form";
import { Brand } from "@prisma/client";

export default async function Page() {

    const availableBrands: Brand[] = await getBrands();
    
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
            <ProductForm availableBrands={availableBrands} />

        </div>
    )
}