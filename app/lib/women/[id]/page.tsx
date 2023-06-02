"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/index";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProductForm from "@/app/components/ProductForm";
import DeleteButton from "@/app/components/DeleteButtons";

export default function Page(props: any) {
    const [product, setProduct] = useState({});

    const { id } = useParams();

    const router = useRouter();

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
        <>
            <div className='flex items-center mb-4'>
                <div className='text-sm font-medium'>
                    / dashboard / women / {id}
                </div>
            </div>
            {Object.keys(product).length > 0 ?
                <>
                    <ProductForm {...product} />
                    <span className="ml-2">
                        <DeleteButton text="delete" onClick={deleteProduct} />
                    </span>
                </>
                : null}
        </>
    )
}