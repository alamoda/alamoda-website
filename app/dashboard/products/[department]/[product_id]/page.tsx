'use client'

import Breadcrumb from "@/components/layout/breadcrumb";
import { notFound } from "next/navigation";
import ProductForm from "@/components/product/product-form";
import { ProductWithRelations } from "@/lib/db";
import { getBrands, getProduct } from "@/app/actions";
import { Brand } from "@prisma/client";

export default async function Page({
    params,
}: {
    params: { product_id: string, department: string };
}) {

    const product: ProductWithRelations | null = await getProduct(params.product_id, true);

    if (!product) return notFound();

    const availableBrands: Brand[] = await getBrands();

    const department = params.department;

    const breadcrumb = [
        {
            name: 'Dashboard',
            href: '/dashboard'
        },
        {
            name: department,
            href: `/dashboard/products/${department}`
        },
        {
            name: params.product_id,
            href: `/dashboard/products/${department}/${params.product_id}`
        }
    ];

    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <Breadcrumb routes={breadcrumb} />

            <ProductForm product={product} availableBrands={availableBrands}/>
        </div>
    )
}