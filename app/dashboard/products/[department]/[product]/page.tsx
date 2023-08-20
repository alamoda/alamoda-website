'use client'

import Breadcrumb from "@/app/(components)/Breadcrumb";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/app/(components)/ProductForm";
import PrimaryButton from "@/app/(components)/PrimaryButton";

export default function Page({
    params,
}: {
    params: { product: string, department: string };
}) {
    const [product, setProduct] = useState({});

    const router = useRouter();

    const department = params.department;
    const id = params.product;

    const breadcrumbs = [
        {
            name: 'Dashboard',
            href: '/dashboard'
        },
        {
            name: department,
            href: `/dashboard/products/${department}`
        },
        {
            name: id,
            href: `/dashboard/products/${department}/${id}`
        }
    ];

    useEffect(() => {

        const getProduct = async () => {

            if (!id) {
                return;
            }

            const response = await fetch(`/api/product?id=${id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                console.error("Could not get product");
                return;
            }

            const data = await response.json();
            setProduct(data);
        }

        getProduct();

    }, [id]);

    const deleteProduct = async () => {

        const response = await fetch(`/api/product?id=${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            console.error("Error deleting the product")
        }

        router.push('/dashboard');
    }

    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <Breadcrumb routes={breadcrumbs} />

            {/* EDIT PRODUCT */}
            {Object.keys(product).length > 0 ?
                <>
                    <ProductForm {...product} />
                    <span className="ml-4">
                        <PrimaryButton
                            text="delete"
                            onClick={deleteProduct}
                            className="bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-5"
                        />
                    </span>
                </>
                : null}
        </div>
    )
}