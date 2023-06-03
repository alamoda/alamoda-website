'use client'

import Breadcrumb from "@/app/(components)/Breadcrumb";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/(types)/index";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProductForm from "@/app/(components)/ProductForm";
import DeleteButton from "@/app/(components)/DeleteButtons";

export default function Page({
    params,
}: {
    params: { product: string, department: string };
}) {
    const [product, setProduct] = useState({});

    const router = useRouter();

    const department = params.department;
    const id = params.product;

    console.log(id);

    const breadcrumbs = [
        {
            name: 'Dashboard',
            href: 'dashboard'
        },
        {
            name: 'Products',
            href: 'products'
        },
        {
            name: id,
            href: id
        }
    ];

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/product?id=' + id).then(res => {
            console.log("product is", res.data);
            setProduct(res.data);
        });
    }, [id]);

    function deleteProduct() {
        axios.delete('/api/product?id=' + id).then(res => {
            console.log("prduct deleted");
            router.push('/dashboard/products');
        });
    }

    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <Breadcrumb pages={breadcrumbs} />

            {/* EDIT PRODUCT */}
            {Object.keys(product).length > 0 ?
                <>
                    <ProductForm {...product} />
                    <span className="px-16">
                        <DeleteButton text="delete" onClick={deleteProduct} />
                    </span>
                </>
                : null}
        </div>
    )
}