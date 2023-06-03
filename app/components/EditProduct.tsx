"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/index";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProductForm from "@/app/components/ProductForm";
import DeleteButton from "@/app/components/DeleteButtons";

export default function Page() {
    const [product, setProduct] = useState({});

    const {slug} = useParams();
    const id = slug.split('/').pop();
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
            {Object.keys(product).length > 0 ?
                <>
                    <ProductForm {...product} />
                    <span className="px-16">
                        <DeleteButton text="delete" onClick={deleteProduct} />
                    </span>
                </>
                : null}
        </>
    )
}